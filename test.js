/* water_assess.js
   Add-on for the water treatment website.
   - assessSuitability(): verdict (highly suitable / slight / major / not suitable) + per-parameter table
   - buildTreatment():    treatment steps chosen by comparing the input to the LIMIT (not the midpoint)
   - renderResults():     draws the verdict card and the step list
   It uses its own names (IDX etc.) so it will not clash with the constants already in your main file. */

const IDX = { TURB: 0, HARD: 1, TDS: 2, PH: 3, TEMP: 4, CL: 5, HM: 6, CHEM: 7, BIO: 8, ENV: 9 };

/* ---------- Settings you can tune (explain them in your report as design choices) ---------- */

// How far past a limit counts as minor / moderate / severe, as a fraction of the limit.
// e.g. limit 150, value 200 -> 50% over -> minor. Over 300% -> severe.
const SEVERITY = { minorMax: 0.5, moderateMax: 3 };

// Verdict is based on a score: minor issue = 1 point, moderate = 2, severe = 3.
// "Not suitable" = any severe issue, or a total score at or above this number.
const VERDICT_RULES = { notSuitableScore: 8 };

// The present/absent fields (chlorine, metals, ...) have no concentration, so we cannot compare them
// with a numeric limit. Assumption: if the use allows less than this, "present" counts as a problem.
const TOLERANCE_CUTOFF = 1;

// maxSeverity = how bad an issue can count, based on how treatable the parameter is:
// pH and temperature are simple adjustments (max 1), turbidity and hardness have routine
// treatments at any level (max 2), TDS removal is expensive so it can reach "severe" (3).
const PARAM_INFO = [
  { idx: IDX.TURB, name: "Turbidity",   unit: "NTU",           maxSeverity: 2 },
  { idx: IDX.HARD, name: "Hardness",    unit: "mg/L as CaCO₃", maxSeverity: 2 },
  { idx: IDX.TDS,  name: "TDS",         unit: "mg/L",          maxSeverity: 3 },
  { idx: IDX.PH,   name: "pH",          unit: "",              maxSeverity: 1 },
  { idx: IDX.TEMP, name: "Temperature", unit: "°C",            maxSeverity: 1 }
];

const CONTAMINANT_INFO = [
  { idx: IDX.CL,   name: "Chlorine" },
  { idx: IDX.HM,   name: "Heavy metals" },
  { idx: IDX.CHEM, name: "Chemical pollutants" },
  { idx: IDX.BIO,  name: "Biological contaminants" }
];

function isPresent(value) { return value === "present"; }

// True when "present" is a problem for this use
function contaminantNotAllowed(limits, idx) { return limits[idx][1] < TOLERANCE_CUTOFF; }

function withUnit(value, unit) { return unit ? value + " " + unit : String(value); }

/* ---------- 1. Suitability verdict ---------- */

function assessSuitability(inputs, limits) {
  const rows = [];
  let score = 0;
  let worst = 0;

  PARAM_INFO.forEach(function (p) {
    const value = inputs[p.idx];
    const lo = limits[p.idx][0];
    const hi = limits[p.idx][1];
    let status = "ok";
    let severity = 0;

    if (value > hi) {
      const ratio = (value - hi) / (hi > 0 ? hi : 1);
      severity = ratio <= SEVERITY.minorMax ? 1 : (ratio <= SEVERITY.moderateMax ? 2 : 3);
      status = "high";
    } else if (value < lo) {
      // The site can only remove things, so a shortfall is reported but capped at "moderate".
      const shortfall = (lo - value) / (lo > 0 ? lo : 1);
      severity = shortfall <= 0.25 ? 1 : 2;
      status = "low";
    }

    if (severity > p.maxSeverity) severity = p.maxSeverity;

    score += severity;
    if (severity > worst) worst = severity;

    rows.push({
      name: p.name,
      value: withUnit(value, p.unit),
      allowed: lo + " to " + hi + (p.unit ? " " + p.unit : ""),
      status: status,
      severity: severity
    });
  });

  CONTAMINANT_INFO.forEach(function (c) {
    const present = isPresent(inputs[c.idx]);
    const limit = limits[c.idx][1];
    let status = "ok";
    let severity = 0;
    let allowed = limit < TOLERANCE_CUTOFF ? "None allowed" : "Tolerated (limit " + limit + ")";

    if (present && contaminantNotAllowed(limits, c.idx)) {
      status = "high";
      severity = 2;
    } else if (present) {
      status = "check";   // allowed in principle, but we cannot tell the amount
    }

    score += severity;
    if (severity > worst) worst = severity;

    rows.push({
      name: c.name,
      value: present ? "Present" : "Not present",
      allowed: allowed,
      status: status,
      severity: severity
    });
  });

  let verdict;
  if (score === 0) verdict = "highly";
  else if (worst >= 3 || score >= VERDICT_RULES.notSuitableScore) verdict = "not";
  else if (worst === 2 || score >= 3) verdict = "major";
  else verdict = "slight";

  const labels = {
    highly: "Highly suitable",
    slight: "Suitable after slight treatment",
    major:  "Suitable only after major treatment",
    not:    "Not suitable"
  };

  const outside = rows.filter(function (r) { return r.severity > 0; }).length;
  const checks = rows.filter(function (r) { return r.status === "check"; }).length;
  let summary;
  if (verdict === "highly") {
    summary = "Every measured parameter is inside the allowed range for this use.";
  } else {
    summary = outside + (outside === 1 ? " parameter is" : " parameters are") + " outside the allowed range.";
  }
  const lows = rows.filter(function (r) { return r.status === "low"; }).length;
  if (lows > 0) summary += " " + lows + (lows === 1 ? " is" : " are") + " below the minimum, which needs adding or blending. This tool gives no treatment step for that.";
  if (checks > 0) summary += " " + checks + " present contaminant" + (checks === 1 ? "" : "s") + " should be measured to confirm.";

  return { verdict: verdict, label: labels[verdict], score: score, worst: worst, rows: rows, summary: summary };
}

/* ---------- 2. Treatment selection (compares the input to the limit) ---------- */

function buildTreatment(inputs, limits) {
  const steps = [];
  const costs = [];
  const reasons = [];

  function add(name, cost, reason) {
    if (steps.indexOf(name) !== -1) return;   // never list the same step twice
    steps.push(name);
    costs.push(cost);
    reasons.push(reason);
  }

  const turb = inputs[IDX.TURB], hard = inputs[IDX.HARD], tds = inputs[IDX.TDS];
  const ph = inputs[IDX.PH], temp = inputs[IDX.TEMP];
  const tMax = limits[IDX.TURB][1], hMax = limits[IDX.HARD][1], dMax = limits[IDX.TDS][1];
  const pLo = limits[IDX.PH][0], pHi = limits[IDX.PH][1];
  const tmpLo = limits[IDX.TEMP][0], tmpHi = limits[IDX.TEMP][1];

  // Equipment protection (kept from the original logic)
  if (temp < 5) {
    add("Pre-treatment Heating / Freeze Protection (Raises temperature above 5°C to prevent equipment damage)", 50,
        "Water at " + temp + "°C risks freezing and damaging equipment");
  } else if (temp > 45) {
    add("Pre-treatment Heat Exchanger / Cooling (Lowers temperature below 45°C to prevent equipment damage)", 50,
        "Water at " + temp + "°C can damage membranes and equipment");
  }

  // Turbidity
  if (turb > tMax) {
    const why = "Turbidity " + turb + " NTU is above the " + tMax + " NTU limit";
    if (turb > 50) add("Plain Sedimentation Basin", 5, why + " and very high, so let solids settle first");
    if (tMax <= 1)       add("Coagulation + Flocculation + Multimedia Filtration + Ultrafiltration", 30, why);
    else if (tMax <= 5)  add("Direct Media Filtration (Inline Coagulation + Sand Filter)", 15, why);
    else if (tMax <= 25) add("Coagulation + Flocculation + Multimedia Filtration", 20, why);
    else                 add("Plain Sedimentation Basin", 5, why);
  }

  // Hardness
  if (hard > hMax) {
    const why = "Hardness " + hard + " mg/L is above the " + hMax + " mg/L limit";
    const viaRO = hard >= 500;   // very hard water: membrane first
    if (viaRO) {
      if (hard >= 6000) add("Sea Water (RO)", 35, why + "; this level is seawater-like");
      else add("Brackish Water (RO)", 30, why + "; very hard water");
    }
    if (hMax <= 10) {
      add("Polishing Ion Exchange Softener", 30, why + "; ion exchange reaches near-zero hardness");
    } else if (!viaRO) {
      if (hMax <= 30) {
        add("pH Stabilization (Adjust pH to 6.5 - 8.5)", 15, "Prepares the water for zeolite softening");
        add("Zeolite / Permutit Treatment", 15, why);
      } else if (hMax <= 60) {
        add("Hot Lime-Soda Treatment", 60, why + "; hot lime-soda leaves low residual hardness");
      } else {
        add("Cold Lime-Soda Treatment", 15, why + "; cold lime-soda is enough for this limit");
      }
    }
  }

  // Chlorine, metals, chemicals, biological (only when the use does not allow them)
  if (isPresent(inputs[IDX.CL]) && contaminantNotAllowed(limits, IDX.CL))
    add("Activated Carbon Filtration / Sodium Bisulfite (SBS) Dosing", 10, "Chlorine is present and this use allows almost none");
  if (isPresent(inputs[IDX.HM]) && contaminantNotAllowed(limits, IDX.HM))
    add("Activated Alumina / Iron Oxide treatment", 30, "Heavy metals are present and this use allows almost none");
  if (isPresent(inputs[IDX.CHEM]) && contaminantNotAllowed(limits, IDX.CHEM))
    add("Treatment with Solid Carbon Block with Special Binding Media", 40, "Chemical pollutants are present and this use allows almost none");
  if (isPresent(inputs[IDX.BIO]) && contaminantNotAllowed(limits, IDX.BIO))
    add("Ultraviolet (UV) Disinfection", 5, "Biological contaminants are present and this use allows almost none");

  // TDS
  if (tds > dMax) {
    const why = "TDS " + tds + " mg/L is above the " + dMax + " mg/L limit";
    if (tds > 10000) add("Sea Water (RO)", 35, why + "; seawater-level salinity");
    else if (tds > 2000) add("Brackish Water (RO)", 30, why + "; brackish-level salinity");

    if (dMax <= 1) {
      add("pH Stabilization (Adjust pH to 6.5 - 8.0)", 15, "Protects membranes before ultra-pure treatment");
      add("Two-Stage Reverse Osmosis (RO) + Mixed Bed Deionization", 130, why + "; needs ultra-pure water");
    } else if (dMax <= 10) {
      add("pH Stabilization (Adjust pH to 6.5 - 7.5)", 15, "Protects membranes before RO");
      add("Two-Stage Reverse Osmosis (RO)", 55, why);
    } else if (dMax <= 100) {
      add("pH Stabilization (Adjust pH to 6.5 - 7.5)", 15, "Protects membranes before RO");
      add("Reverse Osmosis (RO)", 25, why);
    } else {
      add("pH Stabilization (Adjust pH to 6.5 - 8.0)", 15, "Protects membranes before nanofiltration");
      add("Nanofiltration (NF) System", 15, why);
    }
  }

  // Environmental finish (logic unchanged from the original)
  const envIn = inputs[IDX.ENV];
  const highDO = limits[IDX.ENV][0];
  const envWhy = "Based on the environmental finish option selected";
  if (envIn === "1" || envIn === "3") {
    add("Secondary Biological Treatment (Activated Sludge / Trickling Filters)", 30, envWhy);
    if (envIn === "3" && highDO === 1) add("Post-treatment Aeration System", 10, envWhy);
  } else if (envIn === "4") {
    if (highDO === 1) add("Mechanical Cascade Aeration (Raise DO)", 5, envWhy);
  } else if (envIn === "2") {
    if (highDO === 0) add("Thermal / Vacuum aeration + Oxygen Scavenger Dosing", 50, envWhy);
  }

  // Final adjustments only when needed
  if (ph < pLo || ph > pHi) {
    add("Final Post-Treatment pH Correction & Stabilization (Get pH within " + pLo + " - " + pHi + ")", 15,
        "pH " + ph + " is outside the allowed " + pLo + " - " + pHi + " range");
  } else if (steps.length > 0) {
    add("Final pH check (Keep pH within " + pLo + " - " + pHi + ")", 15,
        "Treatment steps can shift pH, so re-check at the end");
  }
  if (temp < tmpLo || temp > tmpHi) {
    add("Final Post-Treatment Thermal Adjustment " + tmpLo + "°C - " + tmpHi + "°C", 30,
        "Temperature " + temp + "°C is outside the allowed " + tmpLo + " - " + tmpHi + "°C range");
  }

  return { steps: steps, costs: costs, reasons: reasons };
}

/* ---------- 3. Drawing the results ---------- */

function injectAssessStyles() {
  if (document.getElementById("water_assess_css")) return;
  const css = [
    "#water_summary_card{margin:0 0 20px;font-family:inherit;color:#1c2b2a}",
    "#water_summary_card .wa-verdict{background:#f6f9f8;border:1px solid #d3dedb;border-left-width:8px;border-radius:6px;padding:14px 18px;margin-bottom:14px}",
    "#water_summary_card .wa-verdict h2{margin:0 0 4px;font-size:1.35rem;font-weight:700}",
    "#water_summary_card .wa-verdict p{margin:0;font-size:.95rem;line-height:1.45}",
    "#water_summary_card .wa-highly{border-left-color:#1f7a4d}",
    "#water_summary_card .wa-slight{border-left-color:#8a8f1c}",
    "#water_summary_card .wa-major{border-left-color:#c26a12}",
    "#water_summary_card .wa-not{border-left-color:#b3261e}",
    "#water_summary_card .wa-scroll{overflow-x:auto}",
    "#water_summary_card table{border-collapse:collapse;width:100%;font-size:.92rem;background:#fff}",
    "#water_summary_card th,#water_summary_card td{text-align:left;padding:8px 10px;border-bottom:1px solid #e1e8e6;vertical-align:top}",
    "#water_summary_card th{font-weight:600;background:#f1f5f4}",
    "#water_summary_card .wa-s-ok{color:#1f7a4d}",
    "#water_summary_card .wa-s-bad{color:#b3261e;font-weight:600}",
    "#water_summary_card .wa-s-check{color:#8a5a00;font-weight:600}",
    "#results_list_items .wa-step-name{display:block;font-weight:600}",
    "#results_list_items .wa-step-why{display:block;font-size:.88rem;color:#4a5b59;margin-top:2px}",
    "#results_list_items li{margin-bottom:10px}"
  ].join("\n");
  const style = document.createElement("style");
  style.id = "water_assess_css";
  style.textContent = css;
  document.head.appendChild(style);
}

function waEl(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderResults(assessment, plan) {
  injectAssessStyles();
  const box = document.getElementById("results_display_box");

  let card = document.getElementById("water_summary_card");
  if (!card) {
    card = document.createElement("div");
    card.id = "water_summary_card";
    box.insertBefore(card, box.firstChild);
  }
  card.textContent = "";

  // Verdict
  const verdictBox = waEl("div", "wa-verdict wa-" + assessment.verdict);
  verdictBox.appendChild(waEl("h2", "", assessment.label));
  verdictBox.appendChild(waEl("p", "", assessment.summary));
  card.appendChild(verdictBox);

  // Parameter table
  const wrap = waEl("div", "wa-scroll");
  const table = document.createElement("table");
  const head = document.createElement("tr");
  ["Parameter", "Your water", "Allowed for this use", "Status"].forEach(function (h) {
    head.appendChild(waEl("th", "", h));
  });
  table.appendChild(head);

  assessment.rows.forEach(function (r) {
    const tr = document.createElement("tr");
    tr.appendChild(waEl("td", "", r.name));
    tr.appendChild(waEl("td", "", r.value));
    tr.appendChild(waEl("td", "", r.allowed));
    let text = "Within range", cls = "wa-s-ok";
    if (r.status === "high") { text = "Too high"; cls = "wa-s-bad"; }
    else if (r.status === "low") { text = "Too low"; cls = "wa-s-bad"; }
    else if (r.status === "check") { text = "Present, measure to confirm"; cls = "wa-s-check"; }
    if (r.name.indexOf("Chlorine") === 0 || r.name === "Heavy metals" || r.name === "Chemical pollutants" || r.name === "Biological contaminants") {
      if (r.status === "high") text = "Present, not allowed";
      if (r.status === "ok") text = "Fine";
    }
    tr.appendChild(waEl("td", cls, text));
    table.appendChild(tr);
  });
  wrap.appendChild(table);
  card.appendChild(wrap);

  // Step list (keeps the same element your cost table already uses)
  const list = document.getElementById("results_list_items");
  list.textContent = "";
  if (plan.steps.length === 0) {
    list.appendChild(waEl("li", "", "No treatment needed. The water already fits this use."));
  } else {
    plan.steps.forEach(function (step, i) {
      const li = document.createElement("li");
      li.appendChild(waEl("span", "wa-step-name", step));
      li.appendChild(waEl("span", "wa-step-why", plan.reasons[i]));
      list.appendChild(li);
    });
  }

  box.style.display = "block";
  box.scrollIntoView({ behavior: "smooth" });
}

// Lets the file also be tested with Node (ignored in the browser)
if (typeof module !== "undefined") {
  module.exports = { assessSuitability: assessSuitability, buildTreatment: buildTreatment, IDX: IDX };
}
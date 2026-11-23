//Hardness calculator
document.getElementById("hardness_calc_no_salts").addEventListener("change", function() {
    clearMessage();
    try {
        var no_salts = readNumber("hardness_calc_no_salts", "number of salts", {min: 1, max: 30});
        if (!Number.isInteger(no_salts)) throw new Error("Number of salts must be a whole number.");
        var container = document.getElementById("div_hardness_calculator_multiple_salt_input");
        container.innerHTML = "";
        for (var counter = 0; counter < no_salts; counter++) {
            var sr_no = counter + 1;
            var title = document.createElement("h5");
            title.textContent = "Salt " + sr_no;
            container.appendChild(title);
            var label_conc = document.createElement("label");
            label_conc.textContent = "Concentration (mg/L)";
            var input_conc = document.createElement("input");
            input_conc.type = "number"; input_conc.min = "0"; input_conc.step = "any";
            input_conc.id = "hardness_calc_salt_conc#" + counter + "#";
            input_conc.placeholder = "Enter concentration in mg/L";
            input_conc.required = true;
            container.append(label_conc, input_conc);
            var label_eqw = document.createElement("label");
            label_eqw.textContent = "Equivalent weight (g/equivalent)";
            var input_eqw = document.createElement("input");
            input_eqw.type = "number"; input_eqw.min = "0"; input_eqw.step = "any";
            input_eqw.id = "hardness_calc_salt_eqw#" + counter + "#";
            input_eqw.placeholder = "Enter equivalent weight";
            input_eqw.required = true;
            container.append(label_eqw, input_eqw);
        }
        var button = document.createElement("button");
        button.type = "button"; button.id = "hardness_calc_submit";
        button.className = "treat_water_button"; button.textContent = "Calculate hardness";
        button.addEventListener("click", function() {
            clearMessage();
            try {
                var total = 0;
                var output = document.getElementById("hardness_calc_results");
                if (output) output.remove();
                for (var i = 0; i < no_salts; i++) {
                    var conc = readNumber("hardness_calc_salt_conc#" + i + "#", "salt " + (i + 1) + " concentration", {min: 0});
                    var eqw = readNumber("hardness_calc_salt_eqw#" + i + "#", "salt " + (i + 1) + " equivalent weight", {min: 0});
                    if (eqw === 0) throw new Error("Equivalent weight must be greater than zero.");
                    total += conc * 50 / eqw;
                }
                output = document.createElement("p");
                output.id = "hardness_calc_results";
                output.setAttribute("aria-live", "polite");
                output.textContent = "Estimated total hardness = " + total.toFixed(2) + " mg/L as CaCO₃";
                container.appendChild(output);
            } catch (error) { showMessage(error.message); }
        });
        container.appendChild(button);
    } catch (error) {
        document.getElementById("div_hardness_calculator_multiple_salt_input").innerHTML = "";
        showMessage(error.message);
    }
});

//TDS calculator
document.getElementById("tds_calc_custom_factor_type").addEventListener("change", function(event){
    var conversion_factor_type = document.getElementById("tds_calc_custom_factor_type").value;
    //Find the conversion factor
    if (conversion_factor_type == "approximate") {
        document.getElementById("tds_calculator_display").innerHTML = "";
        var label = document.createElement("label");
        label.innerHTML = "Enter approximate conversion factor";
        document.getElementById("tds_calculator_display").appendChild(label);
        var input_conversion_factor = document.createElement("input");
        input_conversion_factor.placeholder = "Approximate conversion factor";
        input_conversion_factor.id = "tds_calc_conversion_factor";
        document.getElementById("tds_calculator_display").appendChild(input_conversion_factor);
        document.getElementById("tds_calc_conversion_factor").addEventListener("change", function(event){
            try {
                var total_conversion_factor = readNumber("tds_calc_conversion_factor", "conversion factor", {min: 0});
                var conductivity = readNumber("tds_calc_conductivity", "conductivity (µS/cm)", {min: 0});
                var final_tds = total_conversion_factor * conductivity;
                var oldResult = document.getElementById("tds_approx_result");
                if (oldResult) oldResult.remove();
            var br0 = document.createElement("br");
            document.getElementById("tds_calculator_display").appendChild(br0);
            var display_tds = document.createElement("label");
            display_tds.id = "tds_approx_result";
            display_tds.textContent = "Estimated TDS = " + final_tds.toFixed(2) + " mg/L";
            document.getElementById("tds_calculator_display").appendChild(display_tds);
            } catch (error) { showMessage(error.message); }
        });
    }
    else if (conversion_factor_type == "calculate") {
        document.getElementById("tds_calculator_display").innerHTML = "";
        var label = document.createElement("label");
        label.innerHTML = "Enter number of salts";
        document.getElementById("tds_calculator_display").appendChild(label);
        var input_no_salts = document.createElement("input");
        input_no_salts.id = "tds_calc_no_of_salts";
        input_no_salts.type = "number";
        document.getElementById("tds_calculator_display").appendChild(input_no_salts);
        var no_of_salts_div = document.createElement("div");
        no_of_salts_div.id = "tds_calculator_display_no_salts";
        document.getElementById("tds_calculator_display").appendChild(no_of_salts_div);
        document.getElementById("tds_calc_no_of_salts").addEventListener("change", function(event){
            document.getElementById("tds_calculator_display_no_salts").innerHTML = "";
            var no_of_salts;
            try {
                no_of_salts = readNumber("tds_calc_no_of_salts", "number of salts", {min: 1, max: 30});
                if (!Number.isInteger(no_of_salts)) throw new Error("Number of salts must be a whole number.");
            } catch (error) { showMessage(error.message); return; }
            for (var counter = 0; counter < no_of_salts; counter++) {
                var br0 = document.createElement("br");
                document.getElementById("tds_calculator_display_no_salts").appendChild(br0);
                var sr_no = counter + 1;
                var salt_no = document.createElement("label");
                salt_no.innerHTML = "Salt " + sr_no;
                document.getElementById("tds_calculator_display_no_salts").appendChild(salt_no);
                var salt_percentage_label = document.createElement("label");
                salt_percentage_label.innerHTML = "Enter salt " + sr_no + " percentage";
                document.getElementById("tds_calculator_display_no_salts").appendChild(salt_percentage_label);
                var input_salt_percentage = document.createElement("input"); 
                input_salt_percentage.id = "tds_input_salt_percentage#"+counter+"#";
                input_salt_percentage.placeholder = "Enter percentage";
                document.getElementById("tds_calculator_display_no_salts").appendChild(input_salt_percentage);
                var br2 = document.createElement("br");
                document.getElementById("tds_calculator_display_no_salts").appendChild(br2);
                var salt_cf_label = document.createElement("label");
                salt_cf_label.innerHTML = "Enter salt " + sr_no + " conversion factor";
                document.getElementById("tds_calculator_display_no_salts").appendChild(salt_cf_label);
                var input_salt_cf = document.createElement("input"); 
                input_salt_cf.id = "tds_input_salt_cf#"+counter+"#";
                input_salt_cf.placeholder = "Enter conversion factor";
                document.getElementById("tds_calculator_display_no_salts").appendChild(input_salt_cf);
            }
            var br3 = document.createElement("br");
            document.getElementById("tds_calculator_display_no_salts").appendChild(br3);
            var calculate_net_cf = document.createElement("input");
            calculate_net_cf.type = "submit";
            calculate_net_cf.value = "Calculate Conversion factor and TDS";
            calculate_net_cf.id = "tds_calc_calculate";
            calculate_net_cf.addEventListener("click", function() {
                try {
                var total_conversion_factor = 0;
                for (var counter = 0; counter < no_of_salts; counter++) {
                   var percentage = readNumber("tds_input_salt_percentage#" + counter + "#", "salt " + (counter + 1) + " percentage", {min: 0, max: 100});
                   var factor = readNumber("tds_input_salt_cf#" + counter + "#", "salt " + (counter + 1) + " conversion factor", {min: 0});
                   total_conversion_factor += (percentage / 100) * factor;
                }
                var conductivity = readNumber("tds_calc_conductivity", "conductivity (µS/cm)", {min: 0});
                var final_tds = total_conversion_factor * conductivity;
                var oldResult = document.getElementById("tds_salt_result");
                if (oldResult) oldResult.remove();
                var display_tds = document.createElement("label");
                display_tds.id = "tds_salt_result";
                display_tds.textContent = "Estimated TDS = " + final_tds.toFixed(2) + " mg/L";
                document.getElementById("tds_calculator_display_no_salts").appendChild(display_tds);
                } catch (error) { showMessage(error.message); }
            });
            document.getElementById("tds_calculator_display_no_salts").appendChild(calculate_net_cf);
            var br4 = document.createElement("br");
            document.getElementById("tds_calculator_display_no_salts").appendChild(br4);
        });
    }
});

//Turbidity Calculator
document.getElementById("calculate_turbidity").onclick = function(){
    clearMessage();
    try {
        var constant = readNumber("turbidity_calc_constant", "calibration constant", {min: 0});
        var incident = readNumber("turbidity_calc_intensity", "incident light intensity", {min: 0});
        var scattered = readNumber("turbidity_calc_scattered", "scattered light intensity", {min: 0});
        if (incident === 0) throw new Error("Incident light intensity must be greater than zero.");
        var turbidity = constant * scattered / incident;
        if (!Number.isFinite(turbidity)) throw new Error("The turbidity result is outside the supported numeric range.");
        document.getElementById("turbidity_calc_output").textContent = "Calculated turbidity = " + turbidity.toFixed(2) + " NTU";
    } catch (error) { showMessage(error.message); }
};

//pH Calculator
document.getElementById("calculate_ph").onclick = function(){
    clearMessage();
    try {
        var conc = readNumber("ph_calc_conc", "hydrogen / hydronium ion concentration (mol/L)", {min: 0});
        if (conc === 0) throw new Error("Concentration must be greater than zero.");
        var ph = -Math.log10(conc);
        if (!Number.isFinite(ph)) throw new Error("Unable to calculate pH from this concentration.");
        document.getElementById("ph_calc_output").textContent = "Calculated pH = " + ph.toFixed(2) + " (unitless)";
    } catch (error) { showMessage(error.message); }
}

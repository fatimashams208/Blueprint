//Constants for convinience
/*const TURBIDITY = 0;
const HARDNESS = 1;
const TDS = 2;
const pH = 3;
const TEMPERATURE = 4;
const CHLORINE = 5;
const HEAVY_METALS = 6;
const CHEMICAL_POLLUTANT = 7;
const BIOLOGICAL_CONTAMINANTS = 8;
const ENVIRONMENTAL_FINISH = 9;

//Sets the input application in 2d array, with min and max
function getWaterParameterLimits(waterApplication) {
    const set_array = [];
    switch (waterApplication) {
        case "Overhead Sprinkler":
            set_array[TURBIDITY] = [0, 5];
            set_array[HARDNESS] = [0, 150];
            set_array[TDS] = [0, 650];
            set_array[pH] = [6.5, 8.4];
            set_array[TEMPERATURE] = [20, 25];
            set_array[CHLORINE] = [0, 140];
            set_array[HEAVY_METALS] = [0, 1];
            set_array[CHEMICAL_POLLUTANT] = [0, 0];
            set_array[BIOLOGICAL_CONTAMINANTS] = [0, 1000];
            set_array[ENVIRONMENTAL_FINISH] = [1, 0];
            break;
        case "Drip / Micro-Irrigation":
            set_array[TURBIDITY] = [0, 2];
            set_array[HARDNESS] = [0, 150];
            set_array[TDS] = [0, 450];
            set_array[pH] = [6.5, 8.0];
            set_array[TEMPERATURE] = [20, 25];
            set_array[CHLORINE] = [0, 0];
            set_array[HEAVY_METALS] = [0, 1];
            set_array[CHEMICAL_POLLUTANT] = [0, 0.2];
            set_array[BIOLOGICAL_CONTAMINANTS] = [0, 1000];
            set_array[ENVIRONMENTAL_FINISH] = [1, 0];
            break;
        case "Hydroponics (Greens)":
            set_array[TURBIDITY] = [0, 5];
            set_array[HARDNESS] = [0, 50];
            set_array[TDS] = [800, 1500];
            set_array[pH] = [5.5, 6.0];
            set_array[TEMPERATURE] = [18, 22];
            set_array[CHLORINE] = [0, 0];
            set_array[HEAVY_METALS] = [0, 1];
            set_array[CHEMICAL_POLLUTANT] = [0, 0];
            set_array[BIOLOGICAL_CONTAMINANTS] = [0, 0];
            set_array[ENVIRONMENTAL_FINISH] = [1, 0];
            break;
        case "Flood / Furrow":
            set_array[TURBIDITY] = [0, 50];
            set_array[HARDNESS] = [0, 300];
            set_array[TDS] = [0, 1300];
            set_array[pH] = [6.5, 8.5];
            set_array[TEMPERATURE] = [20, 25];
            set_array[CHLORINE] = [0, 350];
            set_array[HEAVY_METALS] = [0, 2];
            set_array[CHEMICAL_POLLUTANT] = [0, 0];
            set_array[BIOLOGICAL_CONTAMINANTS] = [0, 5000];
            set_array[ENVIRONMENTAL_FINISH] = [1, 0];
            break;
        case "Greenhouse Floriculture":
            set_array[TURBIDITY] = [0, 2];
            set_array[HARDNESS] = [0, 100];
            set_array[TDS] = [0, 300];
            set_array[pH] = [5.8, 6.5];
            set_array[TEMPERATURE] = [15, 25];
            set_array[CHLORINE] = [0, 50];
            set_array[HEAVY_METALS] = [0, 0];
            set_array[CHEMICAL_POLLUTANT] = [0, 0];
            set_array[BIOLOGICAL_CONTAMINANTS] = [0, 100];
            set_array[ENVIRONMENTAL_FINISH] = [1, 0];
            break;
        case "Low Pressure Boiler (< 150 psi)":
            set_array[TURBIDITY] = [0, 5];
            set_array[HARDNESS] = [0, 30];
            set_array[TDS] = [0, 700];
            set_array[pH] = [8.0, 10.0];
            set_array[TEMPERATURE] = [60, 100];
            set_array[CHLORINE] = [0, 30];
            set_array[HEAVY_METALS] = [0, 1];
            set_array[CHEMICAL_POLLUTANT] = [0, 0];
            set_array[BIOLOGICAL_CONTAMINANTS] = [0, 0];
            set_array[ENVIRONMENTAL_FINISH] = [0, 0];
            break;
        case "Medium Pressure Boiler (150-600 psi)":
            set_array[TURBIDITY] = [0, 1];
            set_array[HARDNESS] = [0, 1];
            set_array[TDS] = [0, 5];
            set_array[pH] = [8.5, 9.5];
            set_array[TEMPERATURE] = [50, 90];
            set_array[CHLORINE] = [0, 1];
            set_array[HEAVY_METALS] = [0, 1];
            set_array[CHEMICAL_POLLUTANT] = [0, 0];
            set_array[BIOLOGICAL_CONTAMINANTS] = [0, 0];
            set_array[ENVIRONMENTAL_FINISH] = [0, 0];
            break;
        case "High Pressure/Utility Boiler (> 600 psi)":
            set_array[TURBIDITY] = [0, 0.1];
            set_array[HARDNESS] = [0, 0];
            set_array[TDS] = [0, 0.05];
            set_array[pH] = [8.8, 9.4];
            set_array[TEMPERATURE] = [50, 90];
            set_array[CHLORINE] = [0, 0.01];
            set_array[HEAVY_METALS] = [0, 0];
            set_array[CHEMICAL_POLLUTANT] = [0, 0];
            set_array[BIOLOGICAL_CONTAMINANTS] = [0, 0];
            set_array[ENVIRONMENTAL_FINISH] = [0, 0];
            break;
        case "Once-Through Boiler Systems":
            set_array[TURBIDITY] = [0, 0];
            set_array[HARDNESS] = [0, 0];
            set_array[TDS] = [0, 0.01];
            set_array[pH] = [9.2, 9.6];
            set_array[TEMPERATURE] = [20, 25];
            set_array[CHLORINE] = [0, 0.005];
            set_array[HEAVY_METALS] = [0, 0];
            set_array[CHEMICAL_POLLUTANT] = [0, 0];
            set_array[BIOLOGICAL_CONTAMINANTS] = [0, 0];
            set_array[ENVIRONMENTAL_FINISH] = [0, 0];
            break;
        case "Once-Through Cooling":
            set_array[TURBIDITY] = [0, 25];
            set_array[HARDNESS] = [0, 300];
            set_array[TDS] = [0, 1000];
            set_array[pH] = [6.5, 8.5];
            set_array[TEMPERATURE] = [15, 30];
            set_array[CHLORINE] = [0, 0];
            set_array[HEAVY_METALS] = [0, 1];
            set_array[CHEMICAL_POLLUTANT] = [0, 0];
            set_array[BIOLOGICAL_CONTAMINANTS] = [0, 0];
            set_array[ENVIRONMENTAL_FINISH] = [0, 0];
            break;
        case "Open Cooling Towers":
            set_array[TURBIDITY] = [0, 5];
            set_array[HARDNESS] = [0, 150];
            set_array[TDS] = [0, 1000];
            set_array[pH] = [7.5, 9.0];
            set_array[TEMPERATURE] = [20, 35];
            set_array[CHLORINE] = [0, 250];
            set_array[HEAVY_METALS] = [0, 1];
            set_array[CHEMICAL_POLLUTANT] = [0, 0];
            set_array[BIOLOGICAL_CONTAMINANTS] = [0, 0];
            set_array[ENVIRONMENTAL_FINISH] = [0, 0];
            break;
        case "Closed Loop Chilled Cooling":
            set_array[TURBIDITY] = [0, 1];
            set_array[HARDNESS] = [0, 50];
            set_array[TDS] = [0, 300];
            set_array[pH] = [8.0, 9.5];
            set_array[TEMPERATURE] = [4, 12];
            set_array[CHLORINE] = [0, 0];
            set_array[HEAVY_METALS] = [0, 1];
            set_array[CHEMICAL_POLLUTANT] = [0, 0];
            set_array[BIOLOGICAL_CONTAMINANTS] = [0, 0];
            set_array[ENVIRONMENTAL_FINISH] = [0, 0];
            break;
        case "Data Center Evaporative Cooling":
            set_array[TURBIDITY] = [0, 1];
            set_array[HARDNESS] = [0, 50];
            set_array[TDS] = [0, 200];
            set_array[pH] = [7.0, 8.0];
            set_array[TEMPERATURE] = [20, 25];
            set_array[CHLORINE] = [0, 0];
            set_array[HEAVY_METALS] = [0, 0];
            set_array[CHEMICAL_POLLUTANT] = [0, 0];
            set_array[BIOLOGICAL_CONTAMINANTS] = [0, 0];
            set_array[ENVIRONMENTAL_FINISH] = [0, 0];
            break;
        case "Cold Freshwater Aquaculture":
            set_array[TURBIDITY] = [0, 10];
            set_array[HARDNESS] = [60, 120];
            set_array[TDS] = [0, 300];
            set_array[pH] = [6.5, 7.8];
            set_array[TEMPERATURE] = [12, 16];
            set_array[CHLORINE] = [0, 0.01];
            set_array[HEAVY_METALS] = [0, 0];
            set_array[CHEMICAL_POLLUTANT] = [0, 0];
            set_array[BIOLOGICAL_CONTAMINANTS] = [0, 0];
            set_array[ENVIRONMENTAL_FINISH] = [1, 0];
            break;
        case "Warm Freshwater Aquaculture":
            set_array[TURBIDITY] = [0, 30];
            set_array[HARDNESS] = [50, 200];
            set_array[TDS] = [0, 1000];
            set_array[pH] = [6.5, 8.5];
            set_array[TEMPERATURE] = [24, 30];
            set_array[CHLORINE] = [0, 0.05];
            set_array[HEAVY_METALS] = [0, 1];
            set_array[CHEMICAL_POLLUTANT] = [0, 0];
            set_array[BIOLOGICAL_CONTAMINANTS] = [0, 0];
            set_array[ENVIRONMENTAL_FINISH] = [1, 0];
            break;
        case "Marine Shrimp Aquaculture":
            set_array[TURBIDITY] = [0, 25];
            set_array[HARDNESS] = [200, 500];
            set_array[TDS] = [30000, 35000];
            set_array[pH] = [7.8, 8.4];
            set_array[TEMPERATURE] = [28, 32];
            set_array[CHLORINE] = [0, 0.05];
            set_array[HEAVY_METALS] = [0, 0];
            set_array[CHEMICAL_POLLUTANT] = [0, 0];
            set_array[BIOLOGICAL_CONTAMINANTS] = [0, 0];
            set_array[ENVIRONMENTAL_FINISH] = [1, 0];
            break;
        case "Coral Reef Systems":
            set_array[TURBIDITY] = [0, 1];
            set_array[HARDNESS] = [400, 600];
            set_array[TDS] = [32000, 36000];
            set_array[pH] = [8.1, 8.4];
            set_array[TEMPERATURE] = [24, 26];
            set_array[CHLORINE] = [0, 0];
            set_array[HEAVY_METALS] = [0, 0];
            set_array[CHEMICAL_POLLUTANT] = [0, 0];
            set_array[BIOLOGICAL_CONTAMINANTS] = [0, 0];
            set_array[ENVIRONMENTAL_FINISH] = [1, 0];
            break;
        case "Custom":
            set_array[TURBIDITY] = [Number(document.getElementById("water_turbidity_output_l").value), Number(document.getElementById("water_turbidity_output_h").value)];
            set_array[HARDNESS] = [Number(document.getElementById("water_hardness_output_l").value), Number(document.getElementById("water_hardness_output_h").value)];
            set_array[TDS] = [Number(document.getElementById("water_tds_output_l").value), Number(document.getElementById("water_tds_output_h").value)];
            set_array[pH] = [Number(document.getElementById("water_ph_output_l").value), Number(document.getElementById("water_ph_output_h").value)];
            set_array[TEMPERATURE] = [Number(document.getElementById("water_temperature_output_l").value), Number(document.getElementById("water_temperature_output_h").value)];
            set_array[CHLORINE] = [0, 0];
            set_array[HEAVY_METALS] = [0, 0];
            set_array[CHEMICAL_POLLUTANT] = [0, 0];
            set_array[BIOLOGICAL_CONTAMINANTS] = [0, 0];

            let envVal = document.getElementById("water_envirnmental_finish_output").value;
            if (envVal == "1") set_array[ENVIRONMENTAL_FINISH] = [1, 1];
            else if (envVal == "2") set_array[ENVIRONMENTAL_FINISH] = [1, 0];
            else if (envVal == "3") set_array[ENVIRONMENTAL_FINISH] = [0, 1];
            else if (envVal == "4") set_array[ENVIRONMENTAL_FINISH] = [0, 0];
            break;
    }
    return set_array;
}

//When the water treatment is started
document.getElementById("submit_input_output_parameters_form").onclick = function() {
    clearMessage();
    document.getElementById("inputVolForAmount").style.display = "none";
    document.getElementById("inputVolForAmounttable").innerHTML = "";
    //Do the process, or tell the error.
    try {
        
        //Take all inputs from the user, and even give the errors
        var water_turbidity_input = readNumber("water_turbidity_input", "turbidity (NTU)", {min: 0});
        var water_hardness_input = readNumber("water_hardness_input", "hardness (mg/L as CaCO₃)", {min: 0});
        var water_tds_input = readNumber("water_tds_input", "TDS (mg/L)", {min: 0});
        var water_ph_input = readNumber("water_ph_input", "pH", {min: 0, max: 14});
        var water_temperature_input = readNumber("water_temperature_input", "Temperature (Degree Celcius)", {min: -273});
        var water_chlorine_input = document.getElementById("water_chlorine_input").value;
        var water_heavyMetals_input = document.getElementById("water_heavyMetals_input").value;
        var water_chemicalPolutant_input = document.getElementById("water_chemicalPolutant_input").value;
        var water_biologicalContaminents_input = document.getElementById("water_biologicalContaminents_input").value;
        var water_envirnmental_finish_input = document.getElementById("water_envirnmental_finish_input").value;
        var water_application_input = document.getElementById("water_application_input").value;
        
        //Set the input in input water parameter 1d array
        var water_input_parameters = [];
        water_input_parameters[TURBIDITY] = water_turbidity_input;
        water_input_parameters[HARDNESS] = water_hardness_input;
        water_input_parameters[TDS] = water_tds_input;
        water_input_parameters[pH] = water_ph_input;
        water_input_parameters[TEMPERATURE] = water_temperature_input;
        water_input_parameters[CHLORINE] = water_chlorine_input;
        water_input_parameters[HEAVY_METALS] = water_heavyMetals_input;
        water_input_parameters[CHEMICAL_POLLUTANT] = water_chemicalPolutant_input;
        water_input_parameters[BIOLOGICAL_CONTAMINANTS] = water_biologicalContaminents_input;
        water_input_parameters[ENVIRONMENTAL_FINISH] = water_envirnmental_finish_input;
        
        //Validates the parameter if the custom input is selected
        if (water_application_input === "Custom") {
            [
                ["water_turbidity_output_l", "water_turbidity_output_h", "Turbidity"],
                ["water_hardness_output_l", "water_hardness_output_h", "Hardness"],
                ["water_tds_output_l", "water_tds_output_h", "TDS"],
                ["water_ph_output_l", "water_ph_output_h", "pH"],
                ["water_temperature_output_l", "water_temperature_output_h", "Temperature"]
            ].forEach(function(item) {
                if (item[0] == "water_ph_output_l") {
                    validateRange(readNumber(item[0], item[2] + " minimum", {min: 0, max: 14}),
                        readNumber(item[1], item[2] + " maximum", {min: 0, max: 14}),
                        item[2] + " target range");
                }
                else {
                    validateRange(readNumber(item[0], item[2] + " minimum", {min: 0}),
                        readNumber(item[1], item[2] + " maximum", {min: 0}),
                        item[2] + " target range");
                }
            });
        }
        
        //Store the water target/output parameters in 2d array
        var water_target_parameter = getWaterParameterLimits(water_application_input);
        if (!water_target_parameter || water_target_parameter.length < 10 ||
            water_target_parameter.slice(0, 5).some(function(range) {
                return !Array.isArray(range) || range.length !== 2 || !range.every(Number.isFinite);
            })) {
            throw new Error("A valid target profile could not be loaded. Please select the target application again.");
        }
        
        //Store the water target/output parameters in 1d array
        var water_target_parameter_average = []; 
        for (var parameter = 0; parameter < 5; parameter++) {
            water_target_parameter_average[parameter] = 0.5 * (water_target_parameter[parameter][0] +  water_target_parameter[parameter][1]);
        }
        
        //Start the treating process
        var treatment_steps = []; //Store the process in an array
        var treatment_steps_cost = []; //Store the process in an array
        
        
        //Initial ph treatment and temperature
        if (water_input_parameters[TEMPERATURE] < 5) {
            treatment_steps.push("Pre-treatment Heating / Freeze Protection (Raises temperature above 5°C to prevent equipment damage)");
            treatment_steps_cost.push(50);
        } else if (water_input_parameters[TEMPERATURE] > 45) {
            treatment_steps.push("Pre-treatment Heat Exchanger / Cooling (Lowers temperature below 45°C to prevent equipment damage)");
            treatment_steps_cost.push(50);
        }
        
        if (water_input_parameters[pH] > 8.5) {
            treatment_steps.push("Pre-treatment Acid");
            treatment_steps_cost.push(30);
        }
        else if (water_input_parameters[pH] < 6.0) {
            treatment_steps.push("Pre-treatment Base Dosing");
            treatment_steps_cost.push(30);
        }
        
        // --- TURBIDITY PROCESSING ---
        if (water_input_parameters[TURBIDITY] > 0 && water_input_parameters[TURBIDITY] <= 50) {
            if (water_target_parameter_average[TURBIDITY] >= 0 && water_target_parameter_average[TURBIDITY] <= 1 && water_input_parameters[TURBIDITY] > 1) {
                treatment_steps.push("Coagulation + Flocculation + Multimedia Filtration + Ultrafiltration");
                treatment_steps_cost.push(30);
            } 
            else if (water_target_parameter_average[TURBIDITY] > 1 && water_target_parameter_average[TURBIDITY] <= 5 && water_input_parameters[TURBIDITY] > 5) {
                treatment_steps.push("Direct Media Filtration (Inline Coagulation + Sand Filter)");
                treatment_steps_cost.push(15);
            }
            else if (water_target_parameter_average[TURBIDITY] > 5 && water_target_parameter_average[TURBIDITY] <= 25 && water_input_parameters[TURBIDITY] > 25) {
                treatment_steps.push("Coagulation + Flocculation + Multimedia Filtration");
                treatment_steps_cost.push(20);
            }
        } 
        else if (water_input_parameters[TURBIDITY] > 50) {
            treatment_steps.push("Plain Sedimentation Basin");
            treatment_steps_cost.push(5);
            if (water_target_parameter_average[TURBIDITY] >= 0 && water_target_parameter_average[TURBIDITY] <= 1) {
                treatment_steps.push("Coagulation + Flocculation + Multimedia Filtration + Ultrafiltration");
                treatment_steps_cost.push(30);
            } 
            else if (water_target_parameter_average[TURBIDITY] > 1 && water_target_parameter_average[TURBIDITY] <= 5) {
                treatment_steps.push("Direct Media Filtration (Inline Coagulation + Sand Filter)");
                treatment_steps_cost.push(15);
            }
            else if (water_target_parameter_average[TURBIDITY] > 5 && water_target_parameter_average[TURBIDITY] <= 25) {
                treatment_steps.push("Coagulation + Flocculation + Multimedia Filtration");
                treatment_steps_cost.push(20);
            }
        }

        // --- HARDNESS PROCESSING ---
        if (water_input_parameters[HARDNESS] < 500) {
            if (water_target_parameter_average[HARDNESS] >= 0 && water_target_parameter_average[HARDNESS] <= 10 && water_input_parameters[HARDNESS] > 10) {
                treatment_steps.push("Polishing Ion Exchange Softener");
                treatment_steps_cost.push(30);
            }
            else if (water_target_parameter_average[HARDNESS] >= 10 && water_target_parameter_average[HARDNESS] <= 20 && water_input_parameters[HARDNESS] > 20) {
                treatment_steps.push("pH Stabilization (Adjust ph to 6.5 - 8.5)");
                treatment_steps_cost.push(15);
                treatment_steps.push("Zeolite / Permutit Treatment");
                treatment_steps_cost.push(15);
            }
            else if (water_target_parameter_average[HARDNESS] >= 20 && water_target_parameter_average[HARDNESS] <= 30 && water_input_parameters[HARDNESS] > 30) {
                treatment_steps.push("Hot Lime-Soda Treatment");
                treatment_steps_cost.push(60);
            }
            else if (water_target_parameter_average[HARDNESS] >= 30 && water_target_parameter_average[HARDNESS] <= 60 && water_input_parameters[HARDNESS] > 60) {
                treatment_steps.push("Cold Lime-Soda Treatment");
                treatment_steps_cost.push(15);
            }
        }
        else if (water_input_parameters[HARDNESS] >= 500 && water_input_parameters[HARDNESS] < 10000) {
            treatment_steps.push("Brackish Water (RO)");
            treatment_steps_cost.push(30);
            water_input_parameters[TDS] = 1000;
            if (water_target_parameter_average[HARDNESS] >= 0 && water_target_parameter_average[HARDNESS] <= 10 && water_input_parameters[HARDNESS] > 10) {
                treatment_steps.push("Polishing Ion Exchange Softener");
                treatment_steps_cost.push(30);
            }
            else if (water_target_parameter_average[HARDNESS] >= 10 && water_target_parameter_average[HARDNESS] <= 20 && water_input_parameters[HARDNESS] > 20) {
                treatment_steps.push("pH Stabilization (Adjust ph to 6.5 - 8.5)");
                treatment_steps_cost.push(15);
                treatment_steps.push("Zeolite / Permutit Treatment");
                treatment_steps_cost.push(15);
            }
            else if (water_target_parameter_average[HARDNESS] >= 20 && water_target_parameter_average[HARDNESS] <= 30 && water_input_parameters[HARDNESS] > 30) {
                treatment_steps.push("Hot Lime-Soda Treatment");
                treatment_steps_cost.push(60);
            }
            else if (water_target_parameter_average[HARDNESS] >= 30 && water_target_parameter_average[HARDNESS] <= 60 && water_input_parameters[HARDNESS] > 60) {
                treatment_steps.push("Cold Lime-Soda Treatment");
                treatment_steps_cost.push(15);
            }
        }
        else if (water_input_parameters[HARDNESS] >= 10000) {
            treatment_steps.push("Sea Water (RO)");
            treatment_steps_cost.push(35);
            water_input_parameters[TDS] = 1000;
            if (water_target_parameter_average[HARDNESS] >= 0 && water_target_parameter_average[HARDNESS] <= 10 && water_input_parameters[HARDNESS] > 10) {
                treatment_steps.push("Polishing Ion Exchange Softener");
                treatment_steps_cost.push(30);
            }
            else if (water_target_parameter_average[HARDNESS] >= 10 && water_target_parameter_average[HARDNESS] <= 20 && water_input_parameters[HARDNESS] > 20) {
                treatment_steps.push("pH Stabilization (Adjust ph to 6.5 - 8.5)");
                treatment_steps_cost.push(15);
                treatment_steps.push("Zeolite / Permutit Treatment");
                treatment_steps_cost.push(15);
            }
            else if (water_target_parameter_average[HARDNESS] >= 20 && water_target_parameter_average[HARDNESS] <= 30 && water_input_parameters[HARDNESS] > 30) {
                treatment_steps.push("Hot Lime-Soda Treatment");
                treatment_steps_cost.push(60);
            }
            else if (water_target_parameter_average[HARDNESS] >= 30 && water_target_parameter_average[HARDNESS] <= 60 && water_input_parameters[HARDNESS] > 60) {
                treatment_steps.push("Cold Lime-Soda Treatment");
                treatment_steps_cost.push(15);
            }
        }
            

        // --- CHLORINE PROCESSING ---
        if (water_chlorine_input == "present") {
            treatment_steps.push("Activated Carbon Filtration / Sodium Bisulfite (SBS) Dosing");
            treatment_steps_cost.push(10);
        }
        // --- CONTAMINANT PROCESSING ---
        if (water_heavyMetals_input == "present") {
            treatment_steps.push("Activated Alumina / Iron Oxide treatment");
            treatment_steps_cost.push(30);
        }

        if (water_chemicalPolutant_input == "present") {
            treatment_steps.push("Treatment with Solid Carbon Block with Special Binding Media");
            treatment_steps_cost.push(40);
        }

        if (water_biologicalContaminents_input == "present") {
            treatment_steps.push("Ultraviolet (UV) Disinfection");
            treatment_steps_cost.push(5);
        }

        // --- TDS PROCESSING ---
        if (water_input_parameters[TDS] >= 0 && water_input_parameters[TDS] <= 2000) {
            if (water_target_parameter_average[TDS] >= 0 && water_target_parameter_average[TDS] <= 1 && water_input_parameters[TDS] > 1) {
                treatment_steps.push("pH Stabilization (Adjust ph to 6.5 - 8.0)");
                treatment_steps_cost.push(15);
                treatment_steps.push("Two-Stage Reverse Osmosis (RO) + Mixed Bed Deionization");
                treatment_steps_cost.push(130);
            }
            else if (water_target_parameter_average[TDS] >= 1 && water_target_parameter_average[TDS] <= 10 && water_input_parameters[TDS] > 10) { 
                treatment_steps.push("pH Stabilization (Adjust ph to 6.5 - 7.5)");
                treatment_steps_cost.push(15);
                treatment_steps.push("Two-Stage Reverse Osmosis (RO)");
                treatment_steps_cost.push(55);
            }
            else if (water_target_parameter_average[TDS] >= 10 && water_target_parameter_average[TDS] <= 100 && water_input_parameters[TDS] > 100) { 
                treatment_steps.push("pH Stabilization (Adjust ph to 6.5 - 7.5)");
                treatment_steps_cost.push(15);
                treatment_steps.push("Reverse Osmosis (RO)");
                treatment_steps_cost.push(25);
            }
            else if (water_target_parameter_average[TDS] >= 100 && water_target_parameter_average[TDS] <= 2000 && water_input_parameters[TDS] > 200) { 
                treatment_steps.push("pH Stabilization (Adjust ph to 6.5 - 8.0)");
                treatment_steps_cost.push(15);
                treatment_steps.push("Nanofiltration (NF) System");
                treatment_steps_cost.push(15);
            }
        } 
        else if (water_input_parameters[TDS] > 2000 && water_input_parameters[TDS] <= 10000) {
            treatment_steps.push("Brackish Water (RO)");
            treatment_steps_cost.push(30);
            if (water_target_parameter_average[TDS] >= 0 && water_target_parameter_average[TDS] <= 10) {
                treatment_steps.push("pH Stabilization (Adjust ph to 6.5 - 8.0)");
                treatment_steps_cost.push(15);
                treatment_steps.push("Two-Stage Reverse Osmosis (RO) + Mixed Bed Deionization");
                treatment_steps_cost.push(130);
            }
            else if (water_target_parameter_average[TDS] >= 1 && water_target_parameter_average[TDS] <= 10) { 
                treatment_steps.push("pH Stabilization (Adjust ph to 6.5 - 7.5)");
                treatment_steps_cost.push(15);
                treatment_steps.push("Two-Stage Reverse Osmosis (RO)");
                treatment_steps_cost.push(55);
            }
            else if (water_target_parameter_average[TDS] >= 10 && water_target_parameter_average[TDS] <= 100) { 
                treatment_steps.push("pH Stabilization (Adjust ph to 6.5 - 7.5)");
                treatment_steps_cost.push(15);
                treatment_steps.push("Reverse Osmosis (RO)");
                treatment_steps_cost.push(25);
            }
            else if (water_target_parameter_average[TDS] >= 100 && water_target_parameter_average[TDS] <= 2000) { 
                treatment_steps.push("pH Stabilization (Adjust ph to 6.5 - 8.0)");
                treatment_steps_cost.push(15);
                treatment_steps.push("Nanofiltration (NF) System");
                treatment_steps_cost.push(15);
            }
        } 
        else if (water_input_parameters[TDS] > 10000) {
            treatment_steps.push("Sea Water (RO)");
            treatment_steps_cost.push(35);
            if (water_target_parameter_average[TDS] >= 0 && water_target_parameter_average[TDS] <= 10) {
                treatment_steps.push("pH Stabilization (Adjust ph to 6.5 - 8.0)");
                treatment_steps_cost.push(15);
                treatment_steps.push("Two-Stage Reverse Osmosis (RO) + Mixed Bed Deionization");
                treatment_steps_cost.push(130);
            }
            else if (water_target_parameter_average[TDS] >= 1 && water_target_parameter_average[TDS] <= 10) { 
                treatment_steps.push("pH Stabilization (Adjust ph to 6.5 - 7.5)");
                treatment_steps_cost.push(15);
                treatment_steps.push("Two-Stage Reverse Osmosis (RO)");
                treatment_steps_cost.push(55);
            }
            else if (water_target_parameter_average[TDS] >= 10 && water_target_parameter_average[TDS] <= 100) { 
                treatment_steps.push("pH Stabilization (Adjust ph to 6.5 - 7.5)");
                treatment_steps_cost.push(15);
                treatment_steps.push("Reverse Osmosis (RO)");
                treatment_steps_cost.push(25);
            }
            else if (water_target_parameter_average[TDS] >= 100 && water_target_parameter_average[TDS] <= 2000) { 
                treatment_steps.push("pH Stabilization (Adjust ph to 6.5 - 8.0)");
                treatment_steps_cost.push(15);
                treatment_steps.push("Nanofiltration (NF) System");
                treatment_steps_cost.push(15);
            }
        }

        // --- ROBUST ENVIRONMENTAL / BIOLOGICAL TREATMENT ---
        var target_expects_high_do = water_target_parameter[ENVIRONMENTAL_FINISH][0];
        var target_expects_high_bod = water_target_parameter[ENVIRONMENTAL_FINISH][1];

        if (water_envirnmental_finish_input === "1" || water_envirnmental_finish_input === "3") {
            treatment_steps.push("Secondary Biological Treatment (Activated Sludge / Trickling Filters)");
            treatment_steps_cost.push(30);
            if (water_envirnmental_finish_input === "3" && target_expects_high_do === 1) {
                treatment_steps.push("Post-treatment Aeration System");
                treatment_steps_cost.push(10);
            }
        } 
        else if (water_envirnmental_finish_input === "4") {
            if (target_expects_high_do === 1) {
                treatment_steps.push("Mechanical Cascade Aeration (Raise DO)");
                treatment_steps_cost.push(5);
            }
        } 
        else if (water_envirnmental_finish_input === "2") {
            if (target_expects_high_do === 0) {
                treatment_steps.push("Thermal / Vacuum aeration + Oxygen Scavenger Dosing");
                treatment_steps_cost.push(50);
            }
        }
        
        //Adjust the final ph and temperature once once
        treatment_steps.push("Final Post-Treatment pH Correction & Stabilization (Get pH within "+water_target_parameter[pH][0]+" - "+water_target_parameter[pH][1]+")");
        treatment_steps_cost.push(15);
        treatment_steps.push("Final Post-Treatment Thermal Adjustment "+water_target_parameter[TEMPERATURE][0]+"°C - "+water_target_parameter[TEMPERATURE][1]+"°C ");
        treatment_steps_cost.push(30);
        
        //Display results in result box
        var resultsListBox = document.getElementById("results_list_items");
        resultsListBox.innerHTML = ""; 
        if (treatment_steps.length === 0) {
            var li = document.createElement("li");
            li.textContent = "Water parameters completely match target application profile. No raw structural processing adjustments needed.";
            resultsListBox.appendChild(li);
        } else {
            treatment_steps.forEach(function(step) {
                var li = document.createElement("li");
                li.textContent = step;
                resultsListBox.appendChild(li);
            });
        }

        document.getElementById("results_display_box").style.display = "block";
        document.getElementById("results_display_box").scrollIntoView({ behavior: 'smooth' });
        
        
        //----When asked to display cost----
        document.getElementById("show_approxiate_cost").onclick = function() {
            clearMessage();
            try {
                document.getElementById("inputVolForAmount").style.display = "block";
                document.getElementById("calc_approxiate_cost").onclick = function() {
                    clearMessage();
                    try {
                        var input_volume = readNumber("volume_for_cost", "Volume", {min:1000, max:500000});
                        resultsListBox.innerHTML = ""; 
                        if (treatment_steps.length === 0) {
                            var li = document.createElement("li");
                            li.textContent = "Water parameters completely match target application profile. No raw structural processing adjustments needed.";
                            resultsListBox.appendChild(li);
                        } else {
                            var table = document.createElement("table");
                            table.id = "display_cost_table";
                            document.getElementById("inputVolForAmounttable").innerHTML = "";
                            document.getElementById("inputVolForAmounttable").appendChild(table);
                            var row = document.createElement("tr");
                            row.id = "amount_heading_row";
                            document.getElementById("display_cost_table").appendChild(row);
                            var col_sr_no = document.createElement("th");
                            var cell_sr_no = document.createTextNode("Sr. No");
                            col_sr_no.appendChild(cell_sr_no);
                            document.getElementById("amount_heading_row").appendChild(col_sr_no);
                            var col_treatment_method = document.createElement("th");
                            var cell_treatment_method = document.createTextNode("Treatment");
                            col_treatment_method.appendChild(cell_treatment_method);
                            document.getElementById("amount_heading_row").appendChild(col_treatment_method);
                            var col_cost_1kL = document.createElement("th");
                            var cell_cost_1kL = document.createTextNode("Cost per 1000 L (₹)");
                            col_cost_1kL.appendChild(cell_cost_1kL);
                            document.getElementById("amount_heading_row").appendChild(col_cost_1kL);
                            var col_total_treatment_cost = document.createElement("th");
                            var cell_total_treatment_cost = document.createTextNode("Cost per "+ input_volume + " L (₹)");
                            col_total_treatment_cost.appendChild(cell_total_treatment_cost);
                            document.getElementById("amount_heading_row").appendChild(col_total_treatment_cost);
                            var total_app_cost = 0;
                            treatment_steps.forEach(function(step, index) {
                                var row_in = document.createElement("tr");
                                row_in.id = index+"cost_calc";
                                document.getElementById("display_cost_table").appendChild(row_in);
                                var col_sr_no_in = document.createElement("td");
                                var cell_sr_no_in = document.createTextNode(index+1);
                                col_sr_no_in.appendChild(cell_sr_no_in);
                                document.getElementById(index+"cost_calc").appendChild(col_sr_no_in);
                                var col_treatment_method_in = document.createElement("td");
                                var cell_treatment_method_in = document.createTextNode(treatment_steps[index]);
                                col_treatment_method_in.appendChild(cell_treatment_method_in);
                                document.getElementById(index+"cost_calc").appendChild(col_treatment_method_in);
                                var col_cost_1kL_in = document.createElement("td");
                                var cell_cost_1kL_in = document.createElement("input");
                                cell_cost_1kL_in.id = "cost_treatment_adjust"+ index;
                                cell_cost_1kL_in.value = treatment_steps_cost[index];
                                col_cost_1kL_in.appendChild(cell_cost_1kL_in);
                                document.getElementById(index+"cost_calc").appendChild(col_cost_1kL_in);
                                var col_total_treatment_cost_in = document.createElement("td");
                                var cell_total_treatment_cost_in = document.createTextNode(input_volume * treatment_steps_cost[index] / 1000);
                                col_total_treatment_cost_in.appendChild(cell_total_treatment_cost_in);
                                document.getElementById(index+"cost_calc").appendChild(col_total_treatment_cost_in);
                                total_app_cost += input_volume * treatment_steps_cost[index] / 1000;
                            });
                            var row_out = document.createElement("tr");
                            row_out.id = "display_calc_cost_approx";
                            document.getElementById("display_cost_table").appendChild(row_out);
                            var total_display_label = document.createElement("td");
                            var total_display_label_text = document.createTextNode("Total Approximate Cost (₹)");
                            total_display_label.appendChild(total_display_label_text);
                            document.getElementById("display_cost_table").appendChild(total_display_label);
                            var total_display_cost_approx = document.createElement("td");
                            var total_display_label_text = document.createTextNode(total_app_cost);
                            total_display_cost_approx.appendChild(total_display_label_text);
                            document.getElementById("display_cost_table").appendChild(total_display_cost_approx);
                            var reload_cost_option_col = document.createElement("td");
                            var reload_cost_option = document.createElement("input");
                            reload_cost_option.type = "submit";
                            reload_cost_option.value = "⟲";
                            reload_cost_option.id = "reload_cost";
                            reload_cost_option.addEventListener("click", function() {
                                for (var counter = 0; counter < treatment_steps.length; counter++) {
                                    var treatment_cost_sr_no = counter + 1;
                                    try {
                                        var new_cost = readNumber("cost_treatment_adjust"+ counter, "Treatment Sr. No. "+ treatment_cost_sr_no, {min:0});
                                        treatment_steps_cost[counter] = new_cost;
                                        if (counter == treatment_steps.length - 1) {
                                            document.getElementById("calc_approxiate_cost").click();
                                        }
                                    }
                                    catch (error) {
                                        showMessage(error.message || "Unable to process the treatment recommendation. Please check your inputs.");
                                        break;
                                    }   
                                } 
                            });
                            reload_cost_option_col.appendChild(reload_cost_option);
                            document.getElementById("display_cost_table").appendChild(reload_cost_option_col);
                        }
                    } 
                    catch (error) {
                        showMessage(error.message || "Unable to process the treatment recommendation. Please check your inputs.");
                    }
                }
            }
            catch (error) {
                showMessage(error.message || "Unable to process the treatment recommendation. Please check your inputs.");
            }
        }
                
    } 
    //Show error if found
    catch (error) {
        showMessage(error.message || "Unable to process the treatment recommendation. Please check your inputs.");
    }
}

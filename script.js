// Initial start
document.body.style.display = "none";
window.addEventListener('DOMContentLoaded', () => {
    const loaderContainer = document.createElement('div');
    loaderContainer.classList.add("start");
    const gif = document.createElement('img');
    gif.src = 'start.gif'; 
    gif.alt = 'Loading...';
    const baseStyles = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '999999',
      display: 'flex',
      justifyContent: 'center',
      alignitems: 'center',
      transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
      opacity: '1',
      visibility: 'visible'
    };
    Object.assign(loaderContainer.style, baseStyles);
    loaderContainer.appendChild(gif);
    document.documentElement.appendChild(loaderContainer);
    setTimeout(() => {
        loaderContainer.remove(); 
        document.body.style.display = "block";
    }, 3500);
});


//Hide the input parameters initially
document.getElementById("input_parameter_list_and_use").style.display = "none";
document.getElementById("output_parameter_list_and_use").style.display = "none";
document.getElementById("submit_input_output_parameters").style.display = "none";

//When menubar buttons are clicked
document.getElementById("menubar_treatWater").onclick = function() {
    document.getElementById("div_treatWater").style.display = "block";
    document.getElementById("div_calculateParameters").style.display = "none";
    document.getElementById("div_learnmore").style.display = "none";
    clearMessage();
}
document.getElementById("menubar_calculateParameters").onclick = function() {
    document.getElementById("div_treatWater").style.display = "none";
    document.getElementById("div_calculateParameters").style.display = "block";
    document.getElementById("div_learnmore").style.display = "none";
    clearMessage();
}
document.getElementById("menubar_learnmore").onclick = function() {
    document.getElementById("div_treatWater").style.display = "none";
    document.getElementById("div_calculateParameters").style.display = "none";
    document.getElementById("div_learnmore").style.display = "block";
    clearMessage();
}

//Show the options when treat button is clicked
document.getElementById("treat_water_button").onclick = function() {
    document.getElementById("input_parameter_list_and_use").style.display = "block";
    document.getElementById("output_parameter_list_and_use").style.display = "block";
    document.getElementById("submit_input_output_parameters").style.display = "block";
    document.getElementById("custom_output_parameter_list_and_use").style.display = "none";
}

//Show the adjustable output options
document.getElementById("water_application_input").addEventListener("change", function(event) {
   if (document.getElementById("water_application_input").value == "Custom") {
       document.getElementById("custom_output_parameter_list_and_use").style.display = "block";
   } else {
       document.getElementById("custom_output_parameter_list_and_use").style.display = "none";
   }
});

//Switch between the calculators
document.getElementById("div_turbidity_calculator").style.display = "block";
document.getElementById("div_hardness_calculator").style.display = "none";
document.getElementById("div_tds_calculator").style.display = "none";
document.getElementById("div_ph_calculator").style.display = "none";
document.getElementById("turbidity_calculator").onclick = function() {
    document.getElementById("div_hardness_calculator").style.display = "none";
    document.getElementById("div_tds_calculator").style.display = "none";
    document.getElementById("div_turbidity_calculator").style.display = "block";
    document.getElementById("div_ph_calculator").style.display = "none";
    clearMessage();
}
document.getElementById("tds_calculator").onclick = function() {
    document.getElementById("div_hardness_calculator").style.display = "none";
    document.getElementById("div_tds_calculator").style.display = "block";
    document.getElementById("div_turbidity_calculator").style.display = "none";
    document.getElementById("div_ph_calculator").style.display = "none";
    clearMessage();
}
document.getElementById("hardness_calculator").onclick = function() {
    document.getElementById("div_hardness_calculator").style.display = "block";
    document.getElementById("div_tds_calculator").style.display = "none";
    document.getElementById("div_turbidity_calculator").style.display = "none";
    document.getElementById("div_ph_calculator").style.display = "none";
    clearMessage();
}
document.getElementById("ph_calculator").onclick = function() {
    document.getElementById("div_hardness_calculator").style.display = "none";
    document.getElementById("div_tds_calculator").style.display = "none";
    document.getElementById("div_turbidity_calculator").style.display = "none";
    document.getElementById("div_ph_calculator").style.display = "block";
    clearMessage();
}


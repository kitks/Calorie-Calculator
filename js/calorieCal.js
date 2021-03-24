//===================== Set up variables
let ageInputEl = document.getElementById("ageInputEl")

let genderInputMaleEl = document.getElementById("genderInputMaleEl")
let genderInputFemaleEl = document.getElementById("genderInputFemaleEl")

let metricBtnEl = document.getElementById("metricBtnEl")
let usBtnEl = document.getElementById("usBtnEl")

let heightInputEl = document.getElementById("heightInputEl")
let weightInputEl = document.getElementById("weightInputEl")
let heightInputUsEl = document.getElementById("heightInputUsEl")
let height2InputUsEl = document.getElementById("height2InputUsEl")

let weightInputUsEl = document.getElementById("weightInputUsEl")

let actSelectorEl = document.getElementById("actSelectorEl")
let calorieCalBtnEl = document.getElementById("calorieCalBtnEl")
let calorieResultEl = document.getElementById("calorieResultEl")

let displayCalorie = document.getElementById("displayCalorieEl")

//===================== Metric unit switcher
function unitMetricSwitch() {
    console.log(`test unit switch button`)
    metricBtnEl.focus()
    // usBtnEl.style.backgroundColor = "transparent"

    heightInputUsEl.style.display = "none"
    height2InputUsEl.style.display = "none"
    weightInputUsEl.style.display = "none"
    heightInputEl.style.display = "inline-block"
    weightInputEl.style.display = "inline-block"

    // if (ageInputEl.value || weightInputEl.value || heightInputEl.value === "" ) {
    //     return alert("Please fill the information")
    // }
}

//===================== US unit switcher
function unitUsSwitch() {
    console.log(`test unit switch button`)
    usBtnEl.focus()
    // metricBtnEl.style.backgroundColor = "transparent"

    heightInputUsEl.style.display = "inline-block"
    height2InputUsEl.style.display = "inline-block"
    weightInputUsEl.style.display = "inline-block"
    heightInputEl.style.display = "none"
    weightInputEl.style.display = "none"

    // if (ageInputEl.value || weightInputUsEl.value || heightInputUsEl.value || height2InputUsEl.value === "" ) {
    //     return alert("Please fill the information")
    // }
}


//===================== Calculate the calories by equation in two options Metric or US Unit
function calorieFormula() {

    let resultTemp



    if (heightInputUsEl.style.display === "none" && ageInputEl.value && weightInputEl.value && heightInputEl.value !== "") {
        console.log(`metric true`)

        resultTemp = (weightInputEl.value * 10) + (heightInputEl.value * 6.25) - (ageInputEl.value * 5)

        return calorieCal(resultTemp)

    } else if (heightInputEl.style.display === "none" &&
        ageInputEl.value && weightInputUsEl.value && heightInputUsEl.value && height2InputUsEl.value !== "") {
        console.log(`us true`)

        resultTemp = ((weightInputUsEl.value / 2.2) * 10) +
            ((heightInputUsEl.value * 30.48 + height2InputUsEl.value * 2.54) * 6.25) - (ageInputEl.value * 5)

        return calorieCal(resultTemp)

    } else {
        // return if any blank input
        return alert(`Please fill the information`)

    }

    

 
}

//===================== Define the gender then calculate the Basic calories
//===================== and pass to / Low active / Medium active / High active function
function calorieCal(resultTemp) {


    if(isNaN(resultTemp)){
        return alert (`Vaild Input. Please input number.`)
    }

    if (genderInputMaleEl.checked === true) {
        let resultBMR = resultTemp + 5
        if (actSelectorEl.value === "actBasicInputEl") {
            return displayBMR(resultBMR)
        }
        else if (actSelectorEl.value === "actLowInputEl") {
            console.log("test low act")
            return calorieActLow(resultBMR)
        }
        else if (actSelectorEl.value === "actMedInputEl") {
            console.log("test med act")
            return calorieActMed(resultBMR)
        }
        else if (actSelectorEl.value === "actHighInputEl") {
            console.log("test high act")
            return calorieActHigh(resultBMR)
        }
    }

    if (genderInputFemaleEl.checked === true) {
        let resultBMR = resultTemp - 161
        if (actSelectorEl.value === "actBasicInputEl") {
            return displayBMR(resultBMR)
        }
        else if (actSelectorEl.value === "actLowInputEl") {
            console.log("test low act")
            return calorieActLow(resultBMR)
        }
        else if (actSelectorEl.value === "actMedInputEl") {
            console.log("test med act")
            return calorieActMed(resultBMR)
        }
        else if (actSelectorEl.value === "actHighInputEl") {
            console.log("test high act")
            return calorieActHigh(resultBMR)
        }
    }

}


//===================== Forumla for low activity
function calorieActLow(resultBMR) {
    // console.log(`test calorie act cal funciton ${resultBMR}`)
    let resultActLow = resultBMR * 1.375
    return displayWeightTarget(resultActLow)
}

//===================== Forumla for med activity
function calorieActMed(resultBMR) {
    // console.log(`test calorie act cal funciton ${resultBMR}`)
    let resultActMed = resultBMR * 1.55
    return displayWeightTarget(resultActMed)
}

//===================== Forumla for high activity
function calorieActHigh(resultBMR) {
    // console.log(`test calorie act cal funciton ${resultBMR}`)
    let resultActHigh = resultBMR * 1.725
    return displayWeightTarget(resultActHigh)
}


//===================== Display the basic calorie result
function displayBMR(resultBMR) {
    return displayCalorie.innerHTML = (`<br>Basic Metabolic Rate (BMR): <b>${resultBMR}</b> Calories/day`)
}

//===================== Display the 4 weight target results 
function displayWeightTarget(resultBMR) {

    let displaymain = Math.floor(resultBMR)
    let displayLowLoss = Math.floor(resultBMR * 0.87)
    let displayMedLoss = Math.floor(resultBMR * 0.73)
    let displayHighLoss = Math.floor(resultBMR * 0.46)

    return displayCalorie.innerHTML = (`
    <br>
    Daily Calories Needed:
    <br>
    Maintain weight: <b>${displaymain}</b> Calories/day
    <br>
    Mild weight loss:
    <br>
    0.25 kg/week <b>${displayLowLoss}</b> Calories/day
    <br>
    Weight loss:
    <br>
    0.5 kg/week <b>${displayMedLoss}</b> Calories/day
    <br>
    Extreme weight loss:
    <br>
    1 kg/week <b>${displayHighLoss}</b> Calories/day
    `)

}

//===================== Calculate Btn 
calorieCalBtnEl.addEventListener("click", calorieFormula)

//===================== Default Metric switch
window.addEventListener("load", unitMetricSwitch)

//===================== Metric and US switch
metricBtnEl.addEventListener("click", unitMetricSwitch)
usBtnEl.addEventListener("click", unitUsSwitch)






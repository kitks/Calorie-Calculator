//===================== Set up variables
let calorieCalWrap = document.getElementsByClassName("calorieCal-wrap")[0]

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

let resultBox = document.getElementById("resultBox")
let displayCalorie = document.getElementById("displayCalorieEl")

//===================== Metric unit switcher
function unitMetricSwitch() {
    console.log(`test unit switch button`)
    // metricBtnEl.focus()

    metricBtnEl.style.backgroundColor = "grey"
    usBtnEl.style.backgroundColor = "white"
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
    // usBtnEl.focus()

    usBtnEl.style.backgroundColor = "grey"
    metricBtnEl.style.backgroundColor = "white"
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

    if (ageInputEl.value < 15 || ageInputEl.value > 80) {
        return alert(`Please input age between 15 - 80`)
    }

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


    if (isNaN(resultTemp)) {
        return alert(`Vaild Input. Please input number.`)
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
    resultBox.style.height = "80px"
    calorieCalWrap.style.height = "390px"

    return displayCalorie.innerHTML = (`<h3>Basic Metabolic Rate (BMR):</h3><p><b>${resultBMR}</b> <i>Calories/day</i><p>`)
}

//===================== Display the 4 weight target results 
function displayWeightTarget(resultBMR) {

    resultBox.style.height = "240px"
    calorieCalWrap.style.height = "540px"

    let displaymain = Math.floor(resultBMR)
    let displayLowLoss = Math.floor(resultBMR * 0.87)
    let displayMedLoss = Math.floor(resultBMR * 0.73)
    let displayHighLoss = Math.floor(resultBMR * 0.46)

    return displayCalorie.innerHTML = (`
    
    <h3>Daily Calories Needed</h3>
    
    <h4>Maintain weight</h4>
    <p><b>${displaymain}</b> <i>Calories/day</i> </p>
    
    <h4>Mild weight loss</h4>
    <p><b>0.25</b> <i>kg/week</i> <b>${displayLowLoss}</b> <i>Calories/day</i></p>
    
    <h4>Weight loss</h4>
    <p><b>0.5</b> <i>ikg/week</i> <b>${displayMedLoss}</b> <i>Calories/day</i></p>
    
    <h4>Extreme weight loss</h4>
    <p><b>1</b> <i>kg/week</i> <b>${displayHighLoss}</b> <i>Calories/day</i></p>

    `)

}

//===================== Calculate Btn 
calorieCalBtnEl.addEventListener("click", calorieFormula)

//===================== Default Metric switch
window.addEventListener("load", unitMetricSwitch)

//===================== Metric and US switch
metricBtnEl.addEventListener("click", unitMetricSwitch)
usBtnEl.addEventListener("click", unitUsSwitch)






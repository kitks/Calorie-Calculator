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


// function testBtn() {
//     console.log(`test Btn`)
// }

function calorieBMRCal() {
    // Mifflin-St Jeor Equation
    // Male = (10 × W) ＋ (6.25 × H) - (5 × A) ＋ 5
    // Feamle = (10 × W) ＋ (6.25 × H) - (5 × A) - 161

    let resultBMRTemp = (weightInputEl.value * 10) + (heightInputEl.value * 6.25) - (ageInputEl.value * 5)

    if (ageInputEl.value === "" && weightInputEl.value === "" && heightInputEl.value === "") {
        return alert("Please fill the information")
    }

    if (genderInputMaleEl.checked === true) {
        let resultBMR = resultBMRTemp + 5
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
        let resultBMR = resultBMRTemp - 161
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

// 1.375=轻度活跃（少量锻炼或运动，每周1-3天）
// 1.55=中等活跃（适量锻炼或运动，每周3-5天）
// 1.725=很活跃（大量锻炼或运动，每周6-7天）

// Forumla for low activity
function calorieActLow(resultBMR) {
    // console.log(`test calorie act cal funciton ${resultBMR}`)
    let resultActLow = resultBMR * 1.375
    return displayWeightTarget(resultActLow)
}

// Forumla for med activity
function calorieActMed(resultBMR) {
    // console.log(`test calorie act cal funciton ${resultBMR}`)
    let resultActMed = resultBMR * 1.55
    return displayWeightTarget(resultActMed)
}

// Forumla for high activity
function calorieActHigh(resultBMR) {
    // console.log(`test calorie act cal funciton ${resultBMR}`)
    let resultActHigh = resultBMR * 1.725
    return displayWeightTarget(resultActHigh)
}

// let displayCalorie = document.getElementById("displayCalorieEl")
let displayCalorie = document.getElementById("displayCalorieEl")

function displayBMR(resultBMR) {
    return displayCalorie.innerHTML = (`<br>Basic Metabolic Rate (BMR): <b>${resultBMR}</b> Calories/day`)
}

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

function unitUsSwitch() {
    console.log(`test unit switch button`)
    heightInputUsEl.style.display = "inline-block"
    height2InputUsEl.style.display = "inline-block"
    weightInputUsEl.style.display = "inline-block"
    heightInputEl.style.display = "none"
    weightInputEl.style.display = "none"
}

function unitMetricSwitch() {
    console.log(`test unit switch button`)
    heightInputUsEl.style.display = "none"
    height2InputUsEl.style.display = "none"
    weightInputUsEl.style.display = "none"
    heightInputEl.style.display = "inline-block"
    weightInputEl.style.display = "inline-block"
}

function calorieFormula() {
    if (heightInputEl.style.display === "none") {
        return console.log(`us true`)

    } else if (heightInputUsEl.style.display === "none") {
        return console.log(`metric true`)
    }
}


calorieCalBtnEl.addEventListener("click", calorieFormula)
usBtnEl.addEventListener("click", unitUsSwitch)
metricBtnEl.addEventListener("click", unitMetricSwitch)
// document.body.innerHTML = (`
// Target for loss weight ${resultBMR}
// `)





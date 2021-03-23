let ageInputEl = document.getElementById("ageInputEl")

let genderInputMaleEl = document.getElementById("genderInputMaleEl")
let genderInputFemaleEl = document.getElementById("genderInputFemaleEl")
let heightInputEl = document.getElementById("heightInputEl")
let weightInputEl = document.getElementById("weightInputEl")

let actSelectorEl = document.getElementById("actSelectorEl")
let calorieCalBtnEl = document.getElementById("calorieCalBtnEl")
let calorieResultEl = document.getElementById("calorieResultEl")

calorieCalBtnEl.addEventListener("click", calorieBMRCal)

function testBtn() {
    console.log(`test Btn`)
}

function calorieBMRCal() {
    // Mifflin-St Jeor Equation
    // Male = (10 × W) ＋ (6.25 × H) - (5 × A) ＋ 5
    // Feamle = (10 × W) ＋ (6.25 × H) - (5 × A) - 161

    let resultBMRTemp = (weightInputEl.value * 10) + (heightInputEl.value * 6.25) - (ageInputEl.value * 5)

    if(ageInputEl.value === 0 && weightInputEl.value === 0 && heightInputEl.value===0){
        return alert("Please fill in every information")
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

function displayBMR(resultBMR){
    return displayCalorie.innerHTML = (`<br>Basic Metabolic Rate (BMR): <b>${resultBMR}</b> Calories/day`)
}

function displayWeightTarget(resultBMR){
    
    let displaymain = Math.floor(resultBMR)
    let displayLowLoss = Math.floor(resultBMR * 0.87)
    let displayMedLoss = Math.floor(resultBMR * 0.73)
    let displayHighLoss = Math.floor(resultBMR * 0.46)

    return displayCalorie.innerHTML = (`
    <br>
    Daily Calories Needed:
    <br>
    Target for maintain weight: <b>${displaymain}</b> Calories/day
    <br>
    Target for mild loss weight: <b>${displayLowLoss}</b> Calories/day
    <br>
    Target for mild loss weight: <b>${displayMedLoss}</b> Calories/day
    <br>
    Target for mild loss weight: <b>${displayHighLoss}</b> Calories/day
    `)
    
}

// document.body.innerHTML = (`
// Target for loss weight ${resultBMR}
// `)

// Maintain weight
// 1,779 100%    137.5 %
// Calories/day

// Mild weight loss
// 0.25 kg/week
// 1,529 86%     118.2 %
// Calories/day

// Weight loss
// 0.5 kg/week   98.8 %
// 1,279 72%
// Calories/day

// Extreme weight loss  
// 1 kg/week      60 %
// 779 44%
// Calories/day



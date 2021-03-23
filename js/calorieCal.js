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

    if (genderInputMaleEl.checked === true && actSelectorEl.value==="actBasicInputEl") {
        let resultBMR = resultBMRTemp + 5
        // basicFormula = calorieResultEl.value
       return  calorieResultEl.value = resultBMR
    }else{
        let resultBMR = resultBMRTemp + 5
         calorieActCal(resultBMR)
    }

    if (genderInputFemaleEl.checked === true) {
        let resultBMR = resultBMRTemp - 161
        // basicFormula = calorieResultEl.value
       return  calorieResultEl.value = resultBMR
    }else{
         calorieActCal()
    }

  
}

function calorieActCal(resultBMR){
    console.log(`test calorie act cal funciton ${resultBMR}`)
}

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



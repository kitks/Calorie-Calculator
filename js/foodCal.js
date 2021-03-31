// if(document.readyState=='loading'){
//     document.addEventListener('DOMContentLoaded', ready)
// }else{
//     ready()
// }


let searchBarEl = document.getElementById("searchBarEl")
let searchBtnEl = document.getElementById("searchBtnEl")

let displaySearchBox = document.getElementById("displaySearchBox")
let displayAddFood = document.getElementById("displayAddFood")


let addBox = document.getElementsByClassName('addBox')[0]
let boxes = addBox.getElementsByClassName('box')

let calBtnEl = document.getElementById("calBtnEl")
let calResultEl = document.getElementById("calResultEl")


const api = {
    // url: `https://api.edamam.com/api/food-database/v2/parser?`,

    url: `https://api.edamam.com/api/food-database/v2/parser?`,
    id: `4e0384a9`,
    key: `02c8a3848129216d4f78dd7c57954047`

}
// ingr=red%20apple&app_id={your app_id}&app_key={your app_key}

function searchFood() {
    let ingr = searchBarEl.value
    return getData(ingr)
}

// ================= Fetch api return json
function getData(ingr) {

    fetch(`${api.url}ingr=${ingr}&app_id=${api.id}&app_key=${api.key}`)

        .then(function (response) {

            if (!response.ok) {
                console.log(`Connect error`)
            } else {
                return response.json()
            }
        })

        .then(function (data) {
            searchresult = data
            console.log(searchresult);
            displaySearch(searchresult)
        })
    // return console.log(searchresult);
}


// ================= search item function
function displaySearch(searchresult) {

    // ================= Display searching item title
    displaySearchBox.innerHTML = (`
    <p><i>Result of</i> <b>${searchresult.text}<b>....</p>
    `)

    // ================= Loop and print the search result
    for (i = 0; i < searchresult.hints.length; i++) {

        // console.log(searchresult.hints[i])
        // ================= If no source image from api, replace by internal image
        if (!("image" in searchresult.hints[i].food)) {
            let kcal = Math.round(`${searchresult.hints[i].food.nutrients.ENERC_KCAL}`)
            // Math.round(`${searchresult.hints[i].food.nutrients.ENERC_KCAL}`)
            displaySearchBox.innerHTML += (`
          <div class="searchResultUnit">
          <img class="searchImg" src="./img/noimg.jpg" alt="${searchresult.hints[i].food.foodId}">
        <p class="searchTitle">${searchresult.hints[i].food.label}<p>
        <br>
        <p class="searchCal">Energy: Kcal${kcal}</p>
      
        <div class="addBtnWrap">
        
        <input class="addBtn"${[i]}" type="button" value="Add">
 
        </div>  
        </div>
        `)
        } else {
            let kcal = Math.round(`${searchresult.hints[i].food.nutrients.ENERC_KCAL}`)
            displaySearchBox.innerHTML += (`
            <div class="searchResultUnit">
            <img class="searchImg" src="${searchresult.hints[i].food.image}" alt="${searchresult.hints[i].food.foodId}">
            <p class="searchTitle">${searchresult.hints[i].food.label}<p>
            <br>
            <p class="searchCal">Energy: Kcal${kcal}</p>

    <div class="addBtnWrap">
    
    <input class="addBtn"${[i]}" type="button" value="Add">
    </div>  
    </div>
    `)
        }
    }

    let addBtn = document.getElementsByClassName('addBtn')

    for (let i = 0; i < addBtn.length; i++) {
        let add = addBtn[i]
        add.addEventListener('click', addBtnClick)
    }

    function addBtnClick(event) {
        let add = event.target
        let addUnit = add.parentElement.parentElement
        let title = addUnit.getElementsByClassName('searchTitle')[0].innerText
        let cal = Math.round(addUnit.getElementsByClassName('searchCal')[0].innerText.replace('Energy: Kcal', ''))
        let imgSrc = addUnit.getElementsByClassName('searchImg')[0].src
        let id = addUnit.getElementsByClassName('searchImg')[0].alt
        console.log(title, cal, imgSrc,id)
        addFood(title, cal, imgSrc,id)
        updateCalorie()
    }
}

function addFood(title, cal, imgSrc,id) {
    console.log(id)
    //==============  create div when added item
    let addFoodUnit = document.createElement('div')
    //==============  set div class as 'box'
    addFoodUnit.classList.add('box')

    //==============  Image 
    let fId = addBox.getElementsByClassName('image')


//==============  Check if the food id exist in added food. If it is , return alert
    for (let i = 0; i < fId.length; i++) {
        if (fId[i].alt == id) {
            alert('This food already added.')
            return
        }
        
    }


//==============  Print added item to HTML
    addFoodUnit.innerHTML = (`
    
    <img class="image" src="${imgSrc}" alt="${id}">
    <br>
    <p class="title">${title}</p>
    <br>
    <p class="kcal">Kcal ${cal}</p>
    <br>
    <input class="qtyEl" type="number" value="1">
    <input class="removeBtnEl" type="button" value="remove">
    
    `)


//==============  print all in 'addBox'
    addBox.append(addFoodUnit)

//==============  Activate remove and quantity function
    addFoodUnit.getElementsByClassName('removeBtnEl')[0].addEventListener('click',removeFood )
    addFoodUnit.getElementsByClassName('qtyEl')[0].addEventListener('change',qtychange )
}

// ================= Remove Btn function 'Loop all remove btn'
let removeBtnEl = document.getElementsByClassName('removeBtnEl')

for (let i = 0; i < removeBtnEl.length; i++) {
    let removeBtn = removeBtnEl[i]
    removeBtn.addEventListener('click', removeFood)
}

function removeFood(event) {
    let btnClick = event.target
    btnClick.parentElement.remove()
    updateCalorie()
}


// =================  Quantity function 'Loop all Quantity btn'
let qtyEl = document.getElementsByClassName('qtyEl')

for (let i = 0; i < qtyEl.length; i++) {
    let qtyinput = qtyEl[i]
    qtyinput.addEventListener('change', qtychange)
}

function qtychange(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCalorie()
}



// =================  update calorie result and display
function updateCalorie() {
    let totalCal = 0
    for (let i = 0; i < boxes.length; i++) {
        let box = boxes[i]
        let calorieEl = box.getElementsByClassName('kcal')[0]
        let qtyEl = box.getElementsByClassName('qtyEl')[0]
        console.log(calorieEl, qtyEl)

        let calorie = parseFloat(calorieEl.innerText.replace('Kcal ', ''))
        let qty = qtyEl.value

        totalCal += calorie * qty
    }
    document.getElementById('totalCalEl').innerText = 'Total Kcal: ' + totalCal
}


// function addBr(foodNum) {

//     console.log(foodNum)
//     addBrEl.innerHTML += (`
//         <div class="box">
//         <img src="${searchresult.hints[foodNum].food.image}">
//         <br>
//         ${searchresult.hints[foodNum].food.label}
//         <br>
//         Kcal ${searchresult.hints[foodNum].food.nutrients.ENERC_KCAL}
//         <br>
//         <input type="number" value="0">
//         <input class="removeBtnEl" type="button" value="remove">
//       </div>
//     `)


// }



// calBtnEl.addEventListener("click", calCar)
// addBtn.addEventListener("click", testBtn)

// =================  search button
searchBtnEl.addEventListener("click", searchFood)
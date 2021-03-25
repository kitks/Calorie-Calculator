let searchBarEl = document.getElementById("searchBarEl")
let searchBtnEl = document.getElementById("searchBtnEl")

let displaySearchBox = document.getElementById("displaySearchBox")
let displayAddFood = document.getElementById("displayAddFood")
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
    <p><i>Searh result of</i> <b>${searchresult.text}<b>....</p>
    `)

    // ================= Loop and print the search result
    for (i = 0; i < searchresult.hints.length; i++) {

        console.log(searchresult.hints[i])
        // ================= If no source image from api, replace by internal image
        if (!("image" in searchresult.hints[i].food)) {

            displaySearchBox.innerHTML += (`
          <div class="searchResultUnit"><img src="./img/noimg.jpg" alt="${searchresult.hints[i].food.label}">
        ${searchresult.hints[i].food.label} Energy Kcal${searchresult.hints[i].food.nutrients.ENERC_KCAL}
        <input class="addBtn" type="button" value="Add">
        <div class="addBtnWrap">
        
        <input id="addBr${[i]}" type="button" value="Add to breakfast" onclick="displayAdd(${[i]})">
        <input id="addLu${[i]}" type="button" value="Add to lunch"> 
        <input id="addDi${[i]}" type="button" value="Add to dinner">
        <input id="addSn${[i]}" type="button" value="Add to snack">  
        </div>  
        </div>
        `)
        } else {

            displaySearchBox.innerHTML += (`
            <div class="searchResultUnit"><img src="${searchresult.hints[i].food.image}" alt="${searchresult.hints[i].food.label}">
    ${searchresult.hints[i].food.label} Energy Kcal${searchresult.hints[i].food.nutrients.ENERC_KCAL}
    <input class="addBtn" type="button" value="Add">
    <div class="addBtnWrap">
    
    <input id="addBr${[i]}" type="button" value="Add to breakfast" onclick="displayAdd(${[i]})">
    <input id="addLu${[i]}" type="button" value="Add to lunch"> 
    <input id="addDi${[i]}" type="button" value="Add to dinner">
    <input id="addSn${[i]}" type="button" value="Add to snack">  
    </div>  
    </div>
    `)
        }
    }
    console.log(searchresult.text)
}

function displayAdd(foodNum){ 
    
    console.log(foodNum)
   return displayAddFood.innerHTML += (`<img src="${searchresult.hints[foodNum].food.image}">`)
   
}


// addBtn.addEventListener("click", testBtn)
searchBtnEl.addEventListener("click", searchFood)
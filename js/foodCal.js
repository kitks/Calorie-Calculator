let searchBarEl = document.getElementById("searchBarEl")
let searchBtnEl = document.getElementById("searchBtnEl")

let displaySearchBox = document.getElementById("displaySearchBox")

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

let searchresult;
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
            displaySearch (searchresult)
        })
    // return console.log(searchresult);
}

function displaySearch (searchresult){



    displaySearchBox.innerHTML=(`
    <p><i>Searh result of</i> <b>${searchresult.text}<b>....</p>
    <br>
    <li><img src="${searchresult.hints[0].food.image}" alt="${searchresult.hints[0].food.label}">
    Title ${searchresult.hints[0].food.label} Energy Kcal${searchresult.hints[0].food.nutrients.ENERC_KCAL}</li>
    `)
    // for(i=0;i<)
    console.log(searchresult.text)
}




searchBtnEl.addEventListener("click", searchFood)
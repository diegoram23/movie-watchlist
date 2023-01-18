const userSearch = document.getElementById('user-search')
const searchBtn = document.getElementById('search-btn')
let resultsArray = []

function handleClick() {
    fetch(`https://www.omdbapi.com/?apikey=9f67eb4&s=${userSearch.value}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        resultsArray = data.Search
        renderResults()
    })
}

searchBtn.addEventListener('click',handleClick)

function renderResults(){
let html = ''
for (let result of resultsArray) {
    console.log(result)
    html += `
    <div class='results-container'>
    <img class='img' src='${result.Poster}' />
   <div class='results-text'>
    <p class='result-title'>${result.Title}</p>
    <p class='result-type'>Type: ${result.Type}</p>
    <p class='result-year'>Release date: ${result.Year}<span class='add-movie'>Add to watchlist</span></p>
    </div>
    </div>
    `
}
document.getElementById('start-display').innerHTML = html
}
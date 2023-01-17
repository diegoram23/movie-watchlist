const userSearch = document.getElementById('user-search')
const searchBtn = document.getElementById('search-btn')
let resultsArray = []

function handleClick() {
    fetch(`http://www.omdbapi.com/?apikey=9f67eb4&s=${userSearch.value}`)
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
    <div class='result'>
    <img class='img' src='${result.Poster}' />
    <p>${result.Title}</p>
    <div/>
    `
}
document.getElementById('start-display').innerHTML = html
}
const userSearch = document.getElementById('user-search')
const searchBtn = document.getElementById('search-btn')
let resultsArray = []
let watchlistArray = []

document.addEventListener('click', function (e) {
    let selectedItem = e.target.dataset.movieId

    if (selectedItem) {
        e.target.textContent = 'Added'
        e.target.style.background = '#ffffff'
        e.target.style.color = '#6c63cf'
        if (!watchlistArray.includes(selectedItem)) {
            watchlistArray.push(selectedItem)
            // console.log(watchlistArray)
        }
        addMovie()
    }
})


searchBtn.addEventListener('click', handleClick)

function handleClick() {
    fetch(`https://www.omdbapi.com/?apikey=9f67eb4&s=${userSearch.value}&i=`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            resultsArray = data.Search
            renderResults()
        })
}

function renderResults() {
    let html = ''
    for (let result of resultsArray) {
        // console.log(result)
        html += `
    <div class='results-container'>
    <img class='img' src='${result.Poster}' />
   <div class='results-text'>
    <p class='result-title'>${result.Title}</p>
    <p class='result-type'>Type: ${result.Type}</p>
    <p class='result-year'>Release: ${result.Year}<span class='add-movie' id='add-movie' data-movie-id='${result.imdbID}'>Add to watchlist</span></p>
    </div>
    </div>
    `
    }
    document.getElementById('start-display').innerHTML = html
}

function addMovie(selectedItem){
    console.log(watchlistArray)
}
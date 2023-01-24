// const userSearch = document.getElementById('user-search')
// const searchBtn = document.getElementById('search-btn')
// let resultsArray = []
// let watchlistArray = []
// let watchlistFromLocalStorage = JSON.parse(localStorage.getItem('watchlist'))
// console.log(`getting ${watchlistFromLocalStorage}`)


// //Listens for clicks on individual movies rendered
// document.addEventListener('click', function (e) {
//     let selectedMovie = e.target.dataset.movieId

//     if (selectedMovie && !watchlistArray.includes(selectedMovie)) {
//         e.target.textContent = 'Added'
//         e.target.classList.add('watchlist-added')
//         if (!watchlistArray.includes(selectedMovie)) {
//             addMovie(selectedMovie)
//         }
//     }
// })

// //Gets movies from API based on users search
// searchBtn.addEventListener('click', function () {
//     if (userSearch.value.length >= 1) {
//         fetch(`https://www.omdbapi.com/?apikey=9f67eb4&s=${userSearch.value}&i=`)
//             .then(res => res.json())
//             .then(data => {
//                 // console.log(data)
//                 resultsArray = data.Search
//                 renderResults()
//             })
//     }
// })

// Renders search results based off users choice
// function renderResults() {
//     let html = ''
//     for (let result of resultsArray) {
//         // console.log(result)
//         html += `
//     <div class='results-container'>
//     <img class='img' src='${result.Poster}' />
//    <div class='results-text'>
//     <p class='result-title'>${result.Title}</p>
//     <p class='result-type'>Type: ${result.Type}</p>
//     <p class='result-year'>Release: ${result.Year}
//     <span class='add-movie' data-movie-id='${result.imdbID}'>Add to watchlist</span>
//     </p>
//     </div>
//     </div>
//     `
//     }
//     document.getElementById('start-display').innerHTML = html   
// }

// // Saves users selected movies into watchlist array in localStorage
// function addMovie(selectedMovie) {
//     watchlistArray.push(selectedMovie)
//     localStorage.setItem('watchlist', JSON.stringify(watchlistArray))
//     console.log(`setting ${localStorage.getItem('watchlist')}`)
// }


const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('user-search')
let moviesArray = []

document.addEventListener('click', (e) => {
    let selectedMovie = e.target.dataset.movieId
if (selectedMovie && !moviesArray.includes(selectedMovie)) {
    e.target.textContent = 'Added'
    e.target.classList.add('watchlist-added')
    console.log(selectedMovie)
    addMovie(selectedMovie)
}
})

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length >= 3) {
    fetch(`https://www.omdbapi.com/?apikey=9f67eb4&s=${searchInput.value}&type=movie`)
    .then(res => res.json())
    .then(data => {
        //calls to get html based off movie search result
        getMovieHtml(data.Search)
    })
    }
})
//Receives the data from search result
function getMovieHtml(movieResults){
    let moviesHtml = ''
    for (let movie of movieResults) {
        fetch(`https://www.omdbapi.com/?apikey=9f67eb4&i=${movie.imdbID}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            moviesHtml += `
            <div class='results-container'>
            <img class='img' src='${data.Poster}' />
           <div class='results-text'>
            <p class='result-title'>${data.Title}</p>
            <p class='result-genre'>${data.Plot}</p>
            <p class='result-year'>${data.Runtime}
            <span class='add-movie' data-movie-id='${data.imdbID}'>Add to watchlist</span>
            </p>
            </div>
            </div>
            `
            document.getElementById('start-display').innerHTML = moviesHtml 

        })

    }
}

function addMovie(selectedMovie){
moviesArray.push(selectedMovie)
console.log('this is added', moviesArray)
}
//DOM elements
const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('user-search')
const watchlistEl = document.querySelector('#watchlist-movies')
//Where selected movie data is stored
let watchlistArray = JSON.parse(localStorage.getItem('watchlistArray'))
if(!watchlistArray) {
    watchlistArray = []
}

//Listens for clicks on document, specifically which movie user adds to watchlist
document.addEventListener('click', (e) => {

    //selectedMovie is the movie user selects
    let selectedMovie = e.target.dataset.movieId
    //checks to make sure movie has not already been added
if (selectedMovie && !watchlistArray.includes(selectedMovie)) {
    //Changes html of add to watchlist button when clicked
    e.target.textContent = 'Added'
    e.target.classList.add('watchlist-added')
    addMovie(selectedMovie)
}
})

//Listens for click on search box and takes in input value to fetch from API
if (searchBtn){
searchBtn.addEventListener('click', () => {
    if(searchInput.value.length >= 3) {
    fetch(`https://www.omdbapi.com/?apikey=9f67eb4&s=${searchInput.value}&type=movie`)
    .then(res => res.json())
    .then(data => {
        //calls to get html based off movie search result
        renderMovieHtml(data.Search)
    })
    }
})
}
//Receives the data from search result
function renderMovieHtml(movieResults){
    let moviesHtml = ''
    for (let movie of movieResults) {
        //fetches the full data
        fetch(`https://www.omdbapi.com/?apikey=9f67eb4&i=${movie.imdbID}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
           moviesHtml += `
            <div class='results-container'>
            <img class='img' src='${data.Poster}' />
           <div class='results-text'>
            <p class='result-title'>${data.Title}</p>
            <p class='result-plot'>${data.Plot}</p>
            <p class='result-runtime'>${data.Runtime}
            <span class='add-movie' data-movie-id='${data.imdbID}'>Add to watchlist</span>
            </p>
            </div>
            </div>
            `
            document.getElementById('start-display').innerHTML = moviesHtml 
        })
    }
}


// Here i am trying to render to the watchlist html. I kept the html short just to test if it works.
// I have tried this method and also with the fetch method
// and many variations of it in between
function renderWatchlist(){
    if(!watchlistEl) return

    let watchlistHtml = ''
    for(let watch of watchlistArray){
        fetch(`https://www.omdbapi.com/?apikey=9f67eb4&i=${watch}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            watchlistHtml += `
            <div class='results-container'>
                <img class='img' src='${data.Poster}' />
           <div class='results-text'>
                <p class='result-title'>${data.Title}</p>
                <p class='result-plot'>${data.Plot}</p>
                <p class='result-runtime'>${data.Runtime}
                <span class='add-movie' data-movie-id='${data.imdbID}'>Remove</span>
                </p>
            </div>
            </div>
            `
            watchlistEl.innerHTML = watchlistHtml
        })
    };
}

//Adds movie selected to watchlistArray and localStorage
function addMovie(selectedMovie){
    if(!watchlistArray.includes(selectedMovie)){
        console.log('yep')
        watchlistArray.push(selectedMovie)
        localStorage.setItem('watchlistArray', JSON.stringify(watchlistArray))
    }
}
renderWatchlist()

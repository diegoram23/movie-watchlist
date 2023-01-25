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

    //movieAdded is the movie user selects
    let movieAdded = e.target.dataset.movieIdAdd
    //checks to make sure movie has not already been added

if (movieAdded) {
    //Changes html of add to watchlist button when clicked
    e.target.textContent = 'Added'
    e.target.classList.add('watchlist-added')
    addMovie(movieAdded)
}
    let movieRemoved = e.target.dataset.movieIdRemove
if (movieRemoved) {
    removeMovie(movieRemoved)
    console.log('remove', movieRemoved)
}
})

//Listens for click on search box and takes in input value to fetch from API
if (searchBtn){
    searchBtn.addEventListener('click', async () => {
        if(searchInput.value.length >= 3) {
        const res = await fetch(`https://www.omdbapi.com/?apikey=9f67eb4&s=${searchInput.value}&type=movie`)
        const data = await res.json()
            //calls to get html based off movie search result
            renderMovieHtml(data.Search)
        }
    })
}

//Receives the data from search result
async function renderMovieHtml(movieResults){
    let moviesHtml = ''
    for (let movie of movieResults) {
        //fetches the full data
        const res = await fetch(`https://www.omdbapi.com/?apikey=9f67eb4&i=${movie.imdbID}`)
        const data = await res.json()
           moviesHtml += `
            <div class='results-container'>
            <img class='img' src='${data.Poster}' />
           <div class='results-text'>
            <p class='result-title'>${data.Title}</p>
            <p class='result-plot'>${data.Plot}</p>
            <p class='result-runtime'>${data.Runtime}
            <span class='add-movie' data-movie-id-add='${data.imdbID}'>Add to watchlist</span>
            </p>
            </div>
            </div>
            `
            document.getElementById('start-display').innerHTML = moviesHtml
        }
    }

// Render movies added to watchlist
async function renderWatchlist(){
    if(!watchlistEl) return

    let watchlistHtml = ''
    for(let movie of watchlistArray){
        //Fetches the movies information based off movieId
        const res = await fetch(`https://www.omdbapi.com/?apikey=9f67eb4&i=${movie}`)
        const data = await res.json()
            //console.log(data)
            watchlistHtml += `
            <div class='results-container'>
                <img class='img' src='${data.Poster}' />
           <div class='results-text'>
                <p class='result-title'>${data.Title}</p>
                <p class='result-plot'>${data.Plot}</p>
                <p class='result-runtime'>${data.Runtime}
                <span class='add-movie' data-movie-id-remove='${data.imdbID}'>Remove</span>
                </p>
            </div>
            </div>
            `
            watchlistEl.innerHTML = watchlistHtml
        }
        if(watchlistArray.length === 0) {
            watchlistEl.innerHTML = `<p class='empty-display'>So empty...</p>`
        }
    } 

//Adds movie selected to watchlistArray and localStorage
function addMovie(movieAdded){
    if(!watchlistArray.includes(movieAdded)){
        watchlistArray.push(movieAdded)
        localStorage.setItem('watchlistArray', JSON.stringify(watchlistArray))
        
    }
}
renderWatchlist()

//Try if length is 0 call base display
function removeMovie(movieRemoved){

    for(film of watchlistArray){
        if(movieRemoved === film){
            console.log('this is', film)
            let movieIndex = watchlistArray.indexOf(film)
            watchlistArray.splice(movieIndex, 1)
            localStorage.removeItem('watchlistArray')
        }
    }
    renderWatchlist()
}
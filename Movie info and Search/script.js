const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=14b28b0090597dee3874c470d0da6787&page=1';
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=14b28b0090597dee3874c470d0da6787&query="'

const form = document.querySelector('#form')
const search = document.querySelector('#search')
const main = document.querySelector('#main')


getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        
        
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        const voteTwoDecimals = vote_average.toFixed(2)

        movieEl.innerHTML = `
        <img src="${IMAGE_PATH + poster_path}"
            alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${classRating(vote_average)}">${voteTwoDecimals}</span>
        </div>

        <div class="overview">
            <h3>Overview</h3>
           ${overview}
        </div>`

    main.appendChild(movieEl)
    })
}

function classRating(vote){
    if(vote >= 8){
        return 'green'
    }else if(vote >= 5){
        return 'orange'
    }else{
        return 'red'
    }
}


form.addEventListener("submit", (e) => {
    e.preventDefault()
    getMovies(API_URL)

    const searchTerm = search.value

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }

})
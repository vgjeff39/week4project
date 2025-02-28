const navInput = document.querySelector(".nav__input");
const searchIcon = document.querySelector(".nav__search");
const movieInput = document.querySelector(".movie__input");
const movieSearchIcon = document.querySelector(".movie__search");
const spinner = document.querySelector(".movies-list-spinner");

searchIcon.addEventListener("click", (event) => {
  const moviesList = document.querySelector(".movies__list");
  const movieTitle = document.querySelector(".movies__search--result");

  movieTitle.innerHTML = `"${searchIcon.value}"`;
  moviesList.innerHTML = `<i class="fa-solid fa-spinner movies-list-spinner spinner-visible"></i>`;
  

  renderMovies(navInput.value);
  movieSearchInput();

  
});

navInput.addEventListener("keypress", (event) => {
  
  if (event.key == "Enter") {
    const moviesList = document.querySelector(".movies__list");
    const movieTitle = document.querySelector(".movies__search--result");

    movieTitle.innerHTML = `"${navInput.value}"`;
    moviesList.innerHTML = `<i class="fa-solid fa-spinner movies-list-spinner spinner-visible"></i>`;
    

    renderMovies(navInput.value);
    movieSearchInput();
  }
});

movieInput.addEventListener("keypress", (event) => {
 

  if (event.key == "Enter") {
    const moviesList = document.querySelector(".movies__list");
    const movieTitle = document.querySelector(".movies__search--result");

    movieTitle.innerHTML = `"${movieInput.value}"`;
    moviesList.innerHTML = `<i class="fa-solid fa-spinner movies-list-spinner spinner-visible"></i>`;
    

    renderMovies(movieInput.value);
    movieSearchInput();
  }
});

movieSearchIcon.addEventListener("click", (event) => {
  console.log("event ran");

  const moviesList = document.querySelector(".movies__list");
  const movieTitle = document.querySelector(".movies__search--result");

  moviesList.innerHTML = `<i class="fa-solid fa-spinner movies-list-spinner spinner-visible"></i>`
  movieTitle.innerHTML = `"${searchInput.value}"`;

  renderMovies(movieInput.value);
  movieSearchInput();
});

async function fetchMovies(value) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=c7df9f44&s=${value}`
  );
  const data = await response.json();
  const movies = data.Search;

  return movies;
}

async function renderMovies(value) {
  const movies = await fetchMovies(value);
  const sixMovies = movies.slice(0, 6);
  const moviesList = sixMovies
    .map((movie) => {
      return `  <div class="movie">
                            <figure class="movie__img--wrapper">
                                <img src="${movie.Poster}" alt="" class="movie__img">
                                <h3 class="movie__info--title">${movie.Title}</h3>
                                <div class="movie__info--list">
                                    <div class="movie__info movie__info1">
                                        <i class="fa-solid fa-clock movie__info--icon"></i>
                                        <p class="movie__info--text">136m</p>
                                    </div>
                                    <div class="movie__info movie__info2">
                                        <i class="fa-solid fa-star"></i>
                                        <p class="movie__info--text">4.5</p>
                                    </div>
                                    <div class="movie__info movie__info3">
                                        <i class="fa-solid fa-earth-americas"></i>
                                        <p class="movie__info--text">English</p>
                                    </div>
                                </div>
                            </figure>
                            <h4 class="movie__title">${movie.Title}</h4>
                        </div> `;
    })
    .join("");

  

  document.querySelector(".movies__list").innerHTML = moviesList;
}

function movieSearchInput() {
  document
    .querySelector(".movies__search--result")
    .classList.add("movie__search--result--visible");
}
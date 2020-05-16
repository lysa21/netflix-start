import { fetchMovie, fetchSearch } from "./apiService.js";
import Header from "./components/Header.mjs";
import SearchMovie from "./components/SearchMovie.mjs";

// (() => {
//   //Callback.
//   const getResponse = (data) => {
//     return data;
//   };
//   try {
//     let movie = fetchMovie(157336, getResponse);
//     console.log(movie);
//     document.getElementById("header").innerHTML = Header(movie);
//     document.getElementById("header").style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
//   }
//   catch(e){
//     console.log(e)
//   }

// })();

//2
// (() => {
//     let movie = fetchMovie(157336).then(movie => {
//         console.log(movie)
//         document.getElementById("header").innerHTML = Header(movie);
//         document.getElementById("header").style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
//     })

// })();

//3
(async () => {
  let movie = await fetchMovie(157336);
  console.log(movie);
  document.getElementById("header").innerHTML = Header(movie);
  document.getElementById("header").style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;

  let input = document.querySelector(".navigation__container--left__input");
  let searchContainer = document.querySelector(".search-container");

  input.addEventListener("input", async (e) => {
    searchContainer.innerHTML = "";
    if (!e.target.value) {
      document.querySelector(".container").style.display = "block";
      document.querySelector(".search-container").style.display = "none";
      return;
    }
    let searchMovies = await fetchSearch(e.target.value);

    console.log(searchMovies);
    if (!searchMovies.results) return;

    searchMovies.results.forEach((element) => {
      document.querySelector(".container").style.display = "none";
      searchContainer.innerHTML += SearchMovie(element);
    });
  });
})();

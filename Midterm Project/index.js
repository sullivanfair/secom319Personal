import {fetchMovieData} from "./getMovie.js";

fetchMovieData("comedy")
    .then(movies => {
        console.log('List of movies:', movies);
        for(let i = 1; i <= 3; i++){
            const movieDiv = document.querySelector("#comedy #movie" + i);
            const image = movieDiv.querySelector("img");
            const description = movieDiv.querySelector("p");
            description.textContent = movies[i - 1].description;
            image.src = "./images/" + movies[i - 1].imageName;
        }
    });

fetchMovieData("action")
.then(movies => {
    console.log('List of movies:', movies);
    for(let i = 1; i <= 3; i++){
        const movieDiv = document.querySelector("#action #movie" + i);
        const image = movieDiv.querySelector("img");
        const description = movieDiv.querySelector("p");
        description.textContent = movies[i - 1].description;
        image.src = "./images/" + movies[i - 1].imageName;
    }
});

fetchMovieData("horror")
.then(movies => {
    console.log('List of movies:', movies);
    for(let i = 1; i <= 3; i++){
        const movieDiv = document.querySelector("#horror #movie" + i);
        const image = movieDiv.querySelector("img");
        const description = movieDiv.querySelector("p");
        description.textContent = movies[i - 1].description;
        image.src = "./images/" + movies[i - 1].imageName;
    }
});
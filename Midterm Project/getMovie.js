function fetchMovieData(genre) {
    return fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            return data.movies.filter(movie => movie.genre === genre);
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
            return []
        });
}

export {fetchMovieData}

/**
 * @author Sullivan Fair
 * email: sffair@iastate.edu
 * Date: Friday, October 6, 2023
 */

fetch('./sffair_Activity09_movies.json')
    .then(response => response.json())
    .then(data => {
        const div = document.querySelector('div');
        var img = new Image();

        data.movies.forEach(movie => {
            div.insertAdjacentHTML('beforeend', "<h3>" + movie.title + "</h3>");
            div.insertAdjacentHTML('beforeend', "<p>" + movie.year + "</p>");
            div.insertAdjacentHTML('beforeend', '<img src="' + movie.url + '" alt="">');
        });
    });
    

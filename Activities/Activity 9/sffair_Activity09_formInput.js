/**
 * @author Sullivan Fair
 * email: sffair@iastate.edu
 * Date: Friday, October 6, 2023
 */

function getInputValue()
{
    var movieName = document.forms["my_form"]["inputMovieName"];
    var inputMovieName = movieName.value;
    console.log(inputMovieName);
    
    fetch("sffair_Activity09_movies.json")
        .then(response => response.json())
        .then(myMovies => loadMovies(myMovies));

    function loadMovies(myMovies)
    {
        var mainContainer = document.getElementById("goodmovies");
        mainContainer.innerHTML = "";
        
        for(var i = 0; i < myMovies.movies.length; i++)
        {
            if(myMovies.movies[i].title === inputMovieName)
            {
                var movie = myMovies.movies[i];
                mainContainer.insertAdjacentHTML('beforeend', "<h3>" + movie.title + "</h3>");
                mainContainer.insertAdjacentHTML('beforeend', "<p>" + movie.year + "</p>");
                mainContainer.insertAdjacentHTML('beforeend', '<img src="' + movie.url + '" alt="">');
                return;
            }
        }
    }
}


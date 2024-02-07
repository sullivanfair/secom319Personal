import Card from 'react-bootstrap/Card';

const MovieCard = ({movie, setCurrentView, setSelectedMovie}) => {
    
    function showMovieView(movie){
        setSelectedMovie(movie)
        setCurrentView('movieview')
    }

    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={movie.image} onClick={() => showMovieView(movie)}/>
                <Card.Body>
                    <Card.Title onClick={() => showMovieView}>{movie.name}</Card.Title>
                    <Card.Text>
                    {movie.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
        );

};

export default MovieCard;
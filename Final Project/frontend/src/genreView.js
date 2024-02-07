import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MovieCard from './movieCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const GenreView = ({genre, movies, setSelectedMovie, setCurrentView}) => {
    const genreFilteredMovies = movies.filter(movie=> movie.genre === genre);

    function capitalizeFirstLetter(string) {
        if (!string) return string;
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            <h1>{capitalizeFirstLetter(genre)}</h1>
            <Container>
                <Row>
                {genreFilteredMovies.map((movie) => (
                <Col className="d-flex justify-content-center" style={{paddingBottom: '20px'}}>
                    <MovieCard 
                        movie={movie}
                        setSelectedMovie={setSelectedMovie}
                        setCurrentView={setCurrentView}
                    />
                </Col>
                ))}
                </Row>
          </Container>
        </>
        );
};

export default GenreView;
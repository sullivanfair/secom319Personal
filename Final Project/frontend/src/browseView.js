import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MovieCard from './movieCard';

const BrowseView = ({setCurrentView, setGenre, movies, setSelectedMovie}) => {
    const actionMovies = movies.filter(movie=> movie.genre === 'action');
    const comedyMovies = movies.filter(movie=> movie.genre === 'comedy');
    const horrorMovies = movies.filter(movie=> movie.genre === 'horror');



    function titleClicked(genreToSet){
        setGenre(genreToSet)
        setCurrentView('genre')
    }
    
    return (
    <>
        <h1 onClick={() => titleClicked('action')}>Action</h1>
        <Container>
            <Row>
            
            {actionMovies.slice(0, 3).map((movie) => (
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
        <h1 onClick={() => titleClicked('comedy')}>Comedy</h1>
        <Container>
            <Row>
            {comedyMovies.slice(0, 3).map((movie) => (
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
        <h1 onClick={() => titleClicked('horror')}>Horror</h1>
        <Container>
            <Row>
            {horrorMovies.slice(0, 3).map((movie) => (
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

}

export default BrowseView;
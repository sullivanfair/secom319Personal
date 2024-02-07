import './App.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

import BrowseView from './browseView';
import GenreView from './genreView';
import AboutUsView from './aboutUsView';
import MovieView from './movieView';
import MovieCard from './movieCard';
import CreateMovieView from './createMovieView';
import React, { useState, useEffect } from 'react';

const App = () => {

  const [currentView, setCurrentView] = useState('browse');
  let [movies, setMovies] = useState([]);
  let [displayedItems, setDisplayedItems] = useState([]);
  let [genre, setGenre] = useState([]);
  let [selectedMovie, setSelectedMovie] = useState([]);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const response = await fetch('http://127.0.0.1:4000/getAllMovies');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch movies');
        }
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error.message);
      }
    }
    
    fetchAllMovies();
  });

  function updateAllMovies() {
    fetch("http://127.0.0.1:4000/getAllMovies")
    .then((response) => response.json())
    .then((data) => {
    console.log("Show Catalog of Products :");
    console.log(data);
    setMovies(data);
    });
  }

  
  function fetchMovieByGenre(genre) {
    const response = fetch('http://127.0.0.1:4000/getByGenre/' + genre);
    const data = response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch movies');
    }

    return response;
  }

  function updateRating(rating) {
    fetch("http://127.0.0.1:4000/updateMovieRating/" + selectedMovie.id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({"rating":rating}),
    })
    .then((response) => response.json())
    .then((data) => {
    console.log("Movie rating update completed: ", selectedMovie.name);
    console.log(data);
    if (data) {
    const key = Object.keys(data);
    const value = Object.values(data);
    alert(key+value);
    }
    });
    updateAllMovies()
  }

  function searchChange(e) {
    let search = e.target.value.toLowerCase();
    if (e.target.value.trim() === '') {
      setDisplayedItems([]);
    }
    else{
      let matchedItems = movies.map((item) => {if (item.name.toLowerCase().includes(search)){
        return item
      }})
    matchedItems = matchedItems.filter(item => item !== undefined)
    setDisplayedItems(matchedItems);
    }
    
}
  
  return (
    <>
        <Navbar className="bg-body-tertiary" data-bs-theme="dark">
            <Container>
            <Navbar.Brand onClick = {() => setCurrentView('browse')}>Movie Monkey</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link onClick = {() => setCurrentView('create')}>Create Movie</Nav.Link>
                <Nav.Link onClick = {() => setCurrentView('aboutus')}>About Us</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        <Form>
        <Form.Group className="mb-3" controlId="formsearch">
            <Form.Control name="search" type="search" placeholder="Search Items" onChange={searchChange}/>
        </Form.Group>
        </Form>
        <Row>
        {displayedItems.map((movie) => (
            <Col className="d-flex justify-content-center" style={{paddingBottom: '20px'}}>
                <MovieCard 
                    movie={movie}
                />
            </Col>
        ))}
        </Row>
        <div>
            {currentView == 'browse' && <BrowseView 
                    setCurrentView={setCurrentView} 
                    fetchMovieByGenre={fetchMovieByGenre}
                    setGenre={setGenre}
                    movies={movies}
                    searchChange={searchChange}
                    setSelectedMovie={setSelectedMovie}
                    /> }
            {currentView == 'genre' && <GenreView 
                    genre={genre}
                    setCurrentView={setCurrentView} 
                    fetchMovieByGenre={fetchMovieByGenre}
                    movies={movies}
                    setSelectedMovie={setSelectedMovie}
                    searchChange={searchChange}
                    /> }
            {currentView === 'aboutus' && <AboutUsView /> }
            {currentView === 'movieview' && <MovieView
                    setCurrentView={setCurrentView}
                    selectedMovie={selectedMovie}
                    updateRating={updateRating}
                    updateAllMovies={updateAllMovies}
                    /> }
            {currentView === 'create' && <CreateMovieView /> }
        </div>
    </> 
);

}

export default App;

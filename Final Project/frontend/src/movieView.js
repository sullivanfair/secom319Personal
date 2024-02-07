import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import StarRating from './StarRating';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import ReviewForm from './ReviewForm';
import ReviewsDisplay from './ReviewsDisplay';

const MovieView = ({setCurrentView, selectedMovie, searchChange, updateRating, updateAllMovies}) => {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(null);

    const handleReviewSubmit = (newReview) => {
    setReviews([...reviews, newReview]);
    updateReview(newReview)
    updateAllMovies()
    }

    function handleSetRating(rating){
        updateRating(rating)
    }
    function updateReview(review) {
        fetch("http://127.0.0.1:4000/updateMovieReview/" + selectedMovie.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"review":review}),
        })
        .then((response) => response.json())
        .then((data) => {
        console.log("Movie review update completed: ", selectedMovie.name);
        console.log(data);
        if (data) {
        const key = Object.keys(data);
        const value = Object.values(data);
        alert(key+value);
        }
        });
      }

    function deleteMovie() {
        fetch("http://localhost:4000/deleteMovie/" + selectedMovie.id, {
        method: "DELETE",
        })
        .then((response) => response.json())
        .then((data) => {
        console.log("Delete a movie completed : ", selectedMovie.name);
        console.log(data);
        if (data) {
        const key = Object.keys(data);
        const value = Object.values(data);
        alert(key+value);
        }
        });
    }

    return (
    <>
        <Col className="text-center">
        <h1>{selectedMovie.name}</h1>
        <Image src={selectedMovie.image} width="25%" />
        <p3>{selectedMovie.desc}</p3>
        <div>
            <StarRating rating = {selectedMovie.rating} handleSetRating={handleSetRating} />
            <Button onClick={() => deleteMovie()}>Delete</Button>
        </div>
        </Col>
        <ReviewForm onReviewSubmit={handleReviewSubmit} />
        <h2 className="mt-3">Reviews</h2>
        <ReviewsDisplay review={selectedMovie.review} />
    </>
    );

}


export default MovieView;
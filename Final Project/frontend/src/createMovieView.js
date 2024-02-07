import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

const CreateMovieView = ({}) => {
    const [addNewMovie, setAddNewMovie] = useState(
    {
        name: "",
        description: "",
        rating: "",
        genre: "",
        imageName: "",
        review: "",
    });

    function handleChange(evt) {
           const value = evt.target.value;
        if (evt.target.name === "name") {
        setAddNewMovie({ ...addNewMovie, name: value });
        } else if (evt.target.name === "description") {
        setAddNewMovie({ ...addNewMovie, description: value });
        } else if (evt.target.name === "rating") {
        setAddNewMovie({ ...addNewMovie, rating: value });
        } else if (evt.target.name === "genre") {
        setAddNewMovie({ ...addNewMovie, genre: value });
        } else if (evt.target.name === "imageName") {
        setAddNewMovie({ ...addNewMovie, imageName: value });
        } else if (evt.target.name === "review") {
        setAddNewMovie({ ...addNewMovie, review: value });
        }
    }
    
    function handleOnSubmit(e) {
        e.preventDefault();
        console.log(e.target.value);
        fetch("http://127.0.0.1:4000/addMovie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addNewMovie),
        })
        .then((response) => response.json())
        .then((data) => {
        console.log("Post a new movie completed");
        console.log(data);
        if (data) {
        //const keys = Object.keys(data);
        const value = Object.values(data);
        alert(value);
        }
        });
    }

    return (
        <>
            <h3>Add a new Movie :</h3>
            <InputGroup className="mb-3">
            <InputGroup.Text>Movie Information</InputGroup.Text>
                <Form.Control type="text" name = 'name' placeholder="Movie Name"  onChange={handleChange}/>
                <Form.Control type="text" name = 'description' placeholder="Description" onChange={handleChange}/>
                <Form.Control type="text" name = 'rating' placeholder="Rating" onChange={handleChange}/>
                <Form.Control type="text" name = 'genre' placeholder="Genre" onChange={handleChange}/>
                <Form.Control type="text" name = 'imageName' placeholder="Image Path" onChange={handleChange}/>
                <Form.Control type="text" name = 'review' placeholder="Review" onChange={handleChange}/>
            </InputGroup>
            <Button onClick={handleOnSubmit}>Submit</Button>
            
        </>
        );
};

export default CreateMovieView;
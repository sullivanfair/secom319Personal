import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

const CreateProductView = ({}) => {
    const [addNewProduct, setAddNewProduct] = useState(
    {
        id: 0,
        title: "",
        price: 0.0,
        description: "",
        category: "",
        image: "http://localhost:8081/images/",
        rating: 0.0,
        count: 0,
    });

    function handleChange(evt) {
           const value = evt.target.value;
        if (evt.target.name === "id") {
        setAddNewProduct({ ...addNewProduct, id: value });
        } else if (evt.target.name === "title") {
        setAddNewProduct({ ...addNewProduct, title: value });
        } else if (evt.target.name === "price") {
        setAddNewProduct({ ...addNewProduct, price: value });
        } else if (evt.target.name === "description") {
        setAddNewProduct({ ...addNewProduct, description: value });
        } else if (evt.target.name === "category") {
        setAddNewProduct({ ...addNewProduct, category: value });
        } else if (evt.target.name === "image") {
        setAddNewProduct({ ...addNewProduct, image: value });
        } else if (evt.target.name === "rating") {
        setAddNewProduct({ ...addNewProduct, rating: value });
        } else if (evt.target.name === "count") {
        setAddNewProduct({ ...addNewProduct, count: value });
        }
    }
    
    function handleOnSubmit(e) {
        e.preventDefault();
        console.log(e.target.value);
        fetch("http://localhost:8081/addProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addNewProduct),
        })
        .then((response) => response.json())
        .then((data) => {
        console.log("Post a new product completed");
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
            <h3>Add a new product :</h3>
            <InputGroup className="mb-3">
            <InputGroup.Text>Product Information</InputGroup.Text>
                <Form.Control type="number" name = 'id' placeholder="Product Id" onChange={handleChange}/>
                <Form.Control type="text" name = 'title' placeholder="Title"  onChange={handleChange}/>
                <Form.Control type="number" name = 'price' placeholder="Price" onChange={handleChange}/>
                <Form.Control type="text" name = 'description' placeholder="Description" onChange={handleChange}/>
                <Form.Control type="text" name = 'category' placeholder="Category" onChange={handleChange}/>
                <Form.Control type="text" name = 'image' placeholder="Image" onChange={handleChange}/>
                <Form.Control type="number" name = 'rating' placeholder="Rating" onChange={handleChange}/>
                <Form.Control type="number" name = 'count' placeholder="Count" onChange={handleChange}/>
            </InputGroup>
            <Button onClick={handleOnSubmit}>Submit</Button>
            
        </>
        );
};

export default CreateProductView;
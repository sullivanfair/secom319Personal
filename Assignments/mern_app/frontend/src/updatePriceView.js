import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const UpdatePriceView = ({product, oneProduct, setOneProduct, getAllProducts}) => {
    const [itemPrice, setPrice] = useState("")
    const [productID, setID] = useState('')
    
    const showOneItem =  
        <div key= {oneProduct.id}>
        <img src= {oneProduct.image} width={30} alt="images" /> <br />
        Title: {oneProduct.title} <br />
        Category: {oneProduct.category} <br />
        Price: {oneProduct.price} <br />
        {/* Rating: {oneProduct.rating.rate}, {oneProduct.rating.count} <br /> */}
        </div>;

    function getOneProduct(id) {
        console.log(id);
        if (id >= 1 && id <= 20) {
            fetch("http://localhost:8081/getProductById/" + id)
            .then((response) => response.json())
            .then((data) => {
                console.log("Show one product :", id);
                console.log(data);
                setOneProduct(data);
            });
        } else {
        console.log("Wrong number of Product id.");
        }
    }

    function handleIDChange(e) {
        getOneProduct(e.target.value)
    }

    function handlePriceChange(e) {
        setPrice({price: e.target.value})
    }

    function changePriceProduct() {
        fetch("http://localhost:8081/updatePrice/" + oneProduct.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemPrice),
        })
        .then((response) => response.json())
        .then((data) => {
        console.log("Price updated!");
        console.log(data);
        getAllProducts();
        });
        
    }

    return (
        <>
            <Form.Label htmlFor="findByID">Find By ID</Form.Label>
            <Form.Control
                type="id"
                id="findByID"
                onChange = {handleIDChange}
            />
            {showOneItem}
            <Form.Label htmlFor="updatePrice">Update Price:</Form.Label>
            <Form.Control
                type="price"
                id="updatePrice"
                onChange = {handlePriceChange}
            />
            <Button variant = 'primary' onClick = {() => changePriceProduct()}>Change Price</Button>
        </>
        );
};

export default UpdatePriceView;
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const ShowProductsView = ({product, oneProduct, getAllProducts, setOneProduct}) => {
    const [productID, setProductID] = useState('')
    
    const showAllItems = product.map((el) => (
        <div key={el.id}>
            <img src={el.image} width={30} alt="images" /> <br />
            Title: {el.title} <br />
            Category: {el.category} <br />
            Price: {el.price} <br />
            Rating :{el.rating.rate}, {el.rating.count} <br />
        </div>
    ));

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

    return (
        <>
            <h1>Catalog of Products</h1>
            <div>
            <Form.Label htmlFor="findByID">Find By ID</Form.Label>
            <Form.Control
                type="id"
                id="findByID"
                onChange = {handleIDChange}
            />
            {showOneItem}
            <h2>All Products Below</h2>
            {showAllItems}
            </div>
        </>
        );
};

export default ShowProductsView;
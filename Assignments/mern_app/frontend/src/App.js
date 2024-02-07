import logo from './logo.svg';
import './App.css';
import CreateProductView from './createProductView';
import ShowProductsView from './showProductsView';
import UpdatePriceView from './updatePriceView';
import DeleteOneProductView from './deleteOneProductView';
import AboutUsView from './aboutUsView';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import React, { useState, useEffect } from 'react';



const App = () => {
  const [currentView, setCurrentView] = useState('show');
  const [product, setProduct] = useState([]);
  const [oneProduct, setOneProduct] = useState([]);
    
    useEffect(() => {
        getAllProducts();
        }, []);
    function getAllProducts() {
        fetch("http://localhost:8081/getAllProducts")
        .then((response) => response.json())
        .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
        });
    }
  
  return (
    <>
        <Navbar className="bg-body-tertiary" data-bs-theme="dark">
            <Container>
            <Navbar.Brand onClick = {() => setCurrentView('show')}>Assignment 03: MERN Application Development</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link onClick = {() => setCurrentView('show')}>Show Products</Nav.Link>
                <Nav.Link onClick = {() => setCurrentView('create')}>Create Products</Nav.Link>
                <Nav.Link onClick = {() => setCurrentView('update')}>Update Price</Nav.Link>
                <Nav.Link onClick = {() => setCurrentView('delete')}>Delete Products</Nav.Link>
                <Nav.Link onClick = {() => setCurrentView('about')}>About Us</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        <div>
            {currentView == 'show' && <ShowProductsView 
                    product={product}
                    oneProduct={oneProduct}
                    setOneProduct={setOneProduct}
                    getAllProducts={getAllProducts}
                    setCurrentView = {setCurrentView}
                    /> }
            {currentView == 'create' && <CreateProductView 
                    setCurrentView = {setCurrentView}
                    /> }
            {currentView == 'update' && <UpdatePriceView 
                product={product}
                oneProduct={oneProduct}
                setOneProduct={setOneProduct}
                getAllProducts={getAllProducts}
                setCurrentView = {setCurrentView}
                /> }    
            {currentView == 'delete' && <DeleteOneProductView 
                product={product}
                getAllProducts={getAllProducts}
                setCurrentView = {setCurrentView}
                /> }    
            {currentView === 'about' && <AboutUsView /> }
        </div>
    </> 
  );
}

export default App;

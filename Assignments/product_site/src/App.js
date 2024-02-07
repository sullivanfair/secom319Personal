import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';


const App = () => {
    
    const [currentView, setCurrentView] = useState('browse');
    let [displayedItems, setDisplayedItems] = useState([]);

    const showBrowse = () => setCurrentView('browse');


    let [cart, setCart] = useState([]);
    function cartCheck() {
        if (cart.length){
            setCurrentView('cart')
        }
    }

    let [baseCatalog, setBaseCatalog] = useState([]);
    let [catalog, setCatalog] = useState([]);
    
    let [customerInfo, setCustomerInfo] = useState({});

    function updateCatalog(id, valueIncDec) {
        let newProduct = catalog.map((product) => {
            if (product.id === id) {
                const quantity = product.quantity+valueIncDec
                const updatedProduct = { ...product, quantity }
                return updatedProduct;
            }
            return product;
        })
        setCatalog(newProduct);
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('./catalog.json'); // Adjust the path accordingly
              const data = await response.json();
              setCatalog(data);
              setBaseCatalog(data);
              setDisplayedItems(data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          fetchData();
        }, []);

    function resetCatalog(){
        setCatalog(baseCatalog);
        setDisplayedItems(baseCatalog);
    }

      

    return (
        <>
            <Navbar className="bg-body-tertiary" data-bs-theme="dark">
                <Container>
                <Navbar.Brand onClick = {showBrowse}>Product Catalog</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Button variant="outline-light" onClick = {cartCheck}>Checkout</Button>
                </Navbar.Collapse>
                </Container>
            </Navbar>
            <div>
                {currentView === 'browse' && <BrowseView 
                        cart={cart} 
                        setCart={setCart} 
                        setCurrentView={setCurrentView} 
                        catalog={catalog}
                        updateCatalog={updateCatalog}
                        displayedItems={displayedItems}
                        setDisplayedItems={setDisplayedItems}/> }
                {currentView === 'cart' && <CartView 
                        cart={cart} 
                        setCart={setCart} 
                        catalog={catalog}
                        setCurrentView={setCurrentView} 
                        customerInfo={customerInfo}
                        setCustomerInfo={setCustomerInfo} /> }

                {currentView === 'confirmation' && <ConfirmationView 
                        cart={cart}
                        setCart={setCart}
                        catalog={catalog}
                        setCurrentView={setCurrentView}
                        customerInfo={customerInfo}
                        resetCatalog={resetCatalog} /> }
            </div>
        </>
    );
}


const BrowseView = ({ cart, setCart, setCurrentView, catalog, updateCatalog, displayedItems, setDisplayedItems }) => {


    function handleAddToCart(product) {
      let catalogItem = catalog.find((item) => item.id === product);
      if (catalogItem.quantity > 0){
        let itemInCart = cart.find((item) => item.id === product);
        let updatedCart;
        if (itemInCart){
          updatedCart = cart.map((item) => {
            if (item.id === product){
              let newQuantity = item.quantity + 1
              return {...item, quantity: newQuantity, price: newQuantity*catalogItem.price};
            }
            return item;
          })
        } else { 
          updatedCart = [...cart , {id : catalogItem.id, title : catalogItem.title, quantity: 1, price: catalogItem.price, image: catalogItem.image}];
        }
        setCart(updatedCart)
        updateCatalog(product, -1)
      }
    };
  
    function handleRemoveFromCart(product) {
      let catalogItem = catalog.find((item) => item.id === product);
      const existingItem = cart.find((item) => item.id === product);
      if (existingItem && existingItem.quantity > 1) {
        const updatedCart = cart.map((item) =>
          item.id === product ? { ...item, quantity: item.quantity - 1,  price: (item.quantity-1)*catalogItem.price} : item
        );
        setCart(updatedCart);
        updateCatalog(product, 1)
      } else if (existingItem && existingItem.quantity === 1) {
        setCart(cart => cart.filter((item) => item.id !== product));
        updateCatalog(product, 1)
      }
    };

    function searchChange(e) {
        let search = e.target.value.toLowerCase();
        let matchedItems = catalog.map((item) => {if (item.title.toLowerCase().includes(search)){
            return item
        }})
        matchedItems = matchedItems.filter(item => item !== undefined)
        setDisplayedItems(matchedItems);
    }
  
    return (
        <>
          <br></br>
          <div className = "d-flex justify-content-center align-items-center" >
          <Form>
            <Form.Group className="mb-3" controlId="formsearch">
                <Form.Control name="search" type="search" placeholder="Search Items" onChange={searchChange}/>
            </Form.Group>
            </Form>
            </div>
          <Container>
            <Row>
            {displayedItems.map((product) => (
              <Col className="d-flex justify-content-center" style={{paddingBottom: '20px'}}>
                <ProductCard 
                    product={catalog.find(item => item.id === product.id)}
                    handleAddToCart={handleAddToCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                />
              </Col>
            ))}
            </Row>
          </Container>
        </>
    );
  };

  const CartView = ({cart, setCurrentView, catalog, customerInfo, setCustomerInfo, setCart}) => {

    const [validated, setValidated] = useState(false);
    

    function inputChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setCustomerInfo({...customerInfo, [key]: value})
    }


    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      setValidated(true);
      if (form.checkValidity() === true) {
        event.preventDefault();
        setCurrentView('confirmation')
      }
    };


    function calcTotal(){
        let totalPrice = 0;
        for (let i = 0; i < cart.length; i++){
            totalPrice = totalPrice + cart[i].price;
        }
        return totalPrice.toFixed(2);
    }

    return (
    <>
    <div className = "d-flex justify-content-center">
        <h1>Shopping Cart</h1>
    </div>
    <div className = "d-flex justify-content-center">
        <Table striped bordered hover className='w-50'>
        <thead>
            <tr>
            <th>#</th>
            <th>Product</th>
            <th>Price</th>
            </tr>
        </thead>
        <tbody>
        {cart.map((item) => (
            <tr>
            <td>{item.quantity}</td>
            <td>{item.title}</td>
            <td>${item.price}</td>
            </tr>
            ))}
        
            <tr>
            <td></td>
            <td></td>
            <td><h6>SubTotal: ${calcTotal()}</h6></td>
            </tr>
        </tbody>
        </Table>
    </div>
    <div className = "d-flex justify-content-center">
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="w-50">
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    onChange = {inputChange}
                    pattern =".*"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    onChange = {inputChange}
                    pattern =".*"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3"><Form.Group as={Col} md="5" controlId="validationCustom03">
                <Form.Label>Street Address</Form.Label>
                <Form.Control name="address"
                    onChange = {inputChange} type="text" placeholder="Street Address" required pattern =".*"/>
                <Form.Control.Feedback type="invalid">
                    Please provide a valid address.
                </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="5" controlId="validationCustom03">
                <Form.Label>City</Form.Label>
                <Form.Control name="city"
                    onChange = {inputChange} type="text" placeholder="City" required pattern =".*"/>
                <Form.Control.Feedback type="invalid">
                    Please provide a valid city.
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>State</Form.Label>
                <Form.Control name="state"
                    onChange = {inputChange} type="text" placeholder="State" required pattern =".*"/>
                <Form.Control.Feedback type="invalid">
                    Please provide a valid state.
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom05">
                <Form.Label>Zip</Form.Label>
                <Form.Control name="zip"
                    onChange = {inputChange} type="text" placeholder="Zip" required pattern="[0-9]{5}"/>
                <Form.Control.Feedback type="invalid">
                    Please provide a valid zip.
                </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='mb-3'>
                <Form.Group as={Col} md="6" controlId="validationCustom06">
                <Form.Label>Credit Card</Form.Label>
                <Form.Control
                    name="cc"
                    onChange = {inputChange}
                    required
                    type="text"
                    placeholder="Card Number"
                    pattern="[0-9]{16}"
                    maxLength="16"
                />
                <Form.Control.Feedback type="invalid">Please provide a valid card.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom06" >
                <Form.Label>Email</Form.Label>
                <Form.Control
                    name="email"
                    onChange = {inputChange}
                    required
                    type="text"
                    placeholder="Email Address"
                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                />
                <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button type="submit">Submit Form</Button>{' '}<Button variant="secondary" type='button' onClick={() => setCurrentView('browse')}>Back To Browse</Button>
        </Form>
    </div>
    </>
  );
}

const ProductCard = ({ product, handleAddToCart, handleRemoveFromCart }) => {
  const { id, title, price, quantity } = product;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.image} style={{maxHeight: "300px"}}/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className=''>{product.description}</Card.Text>
        <Card.Text >${price}</Card.Text>
        <Container className="d-flex justify-content-center">
            <Row>
                <Col><Button variant="outline-danger" onClick={() => handleRemoveFromCart(id)}>-</Button></Col>
                <Col className='d-flex align-items-center'><h6 style={{textAlign : 'center'}}>{quantity} Stock</h6></Col>
                <Col><Button variant="outline-primary" onClick={() => handleAddToCart(id)}>+</Button></Col>
            </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

const ConfirmationView = ({cart, catalog, setCurrentView, customerInfo, setCart, resetCatalog}) => {
  
    function backToBrowse() {
        setCart([]);
        setCurrentView('browse')
        resetCatalog()
    }
  
    function calcTotal(){
      let totalPrice = 0;
      for (let i = 0; i < cart.length; i++){
          totalPrice = totalPrice + cart[i].price;
      }
      return totalPrice.toFixed(2);
    } 
  
    return (
      <>
      <div className="d-flex justify-content-center">
        <h1>Order Placed!</h1>
      </div>
  
      <div className="d-flex justify-content-center">
        <Table striped bordered hover className='w-50'>
          <thead>
              <tr>
              <th></th>
              <th>#</th>
              <th>Product</th>
              <th>Price</th>
              </tr>
          </thead>
          <tbody>
          {cart.map((item) => (
              <tr>
              <td><img src={item.image} width="100" height="100" alt="product"></img></td>
              <td>{item.quantity}</td>
              <td>{item.title}</td>
              <td>${item.price}</td>
              </tr>
              ))}
              <tr>
              <td></td>
              <td></td>
              <td></td>
              <td><h6>Total: ${calcTotal()}</h6></td>
              </tr>
          </tbody>
          </Table>
      </div>
      <div className="d-flex justify-content-center">
        <div className="d-flex justify-content-center" style={{width: "50%"}}>
            <Stack className='w-50' gap={3}>
              <div className="p-2">Name: {customerInfo.firstName} {customerInfo.lastName}</div>
              <div className="p-2">Address: {customerInfo.address} {customerInfo.city}, {customerInfo.state} {customerInfo.zip}</div>
              <div className="p-2">Email: {customerInfo.email}</div>
              <div className="p-2">Card Number: xxxx-xxxx-xxxx-{customerInfo.cc.substring(customerInfo.cc.length-4, customerInfo.cc.length)}</div>
            </Stack>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <Button variant="outline-primary" onClick={() => backToBrowse()}>Back To Browse</Button>
        </div>
      </>
    );
  };


export default App;

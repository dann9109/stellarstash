import React from 'react';
import { Badge, Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {useSelector} from 'react-redux';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import letters2 from '../assets/letters2.png';

const Header = () => {
     const {cartItems} = useSelector((state) => state.cart);
     console.log(cartItems);

    return (
        <header>
            <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    {/* Ensure LinkContainer wraps a single child */}
                    <LinkContainer to='/'>
                        <Navbar.Brand href="/">
                            {/* Make sure this is seen as a singular element */}
                            <img className="letter" src={letters2} alt="shop" />
                            StellarStash
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {/* Ensure each LinkContainer wraps a single Nav.Link */}
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <FaShoppingCart /> Cart
                                    {
                                        cartItems.length > 0 && (
                                           <Badge pill bg='danger' style={{marginLeft: '5px'}}>{cartItems.length}
                                           {cartItems.reduce((a, c) => a + c.qty, 0)}
                                           </Badge>
                                        )
                                    }
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/login'>
                                <Nav.Link>
                                    <FaUser /> Sign In
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
import { Navbar, Nav, Container } from 'react-bootstrap'; // Correct initial import
import { NavbarBrand, NavbarToggle, NavbarCollapse } from 'react-bootstrap'; // Add missing components
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import letters2 from '../assets/letters2.png'; // Corrected path to logo.png


const Header = () => {
    return (
        <header>
            <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="/">
                        <img className="letter" src={letters2} alt="shop" />StellarStash</Navbar.Brand> {/* Corrected to Navbar.Brand */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" /> {/* Corrected to Navbar.Toggle */}
                    <Navbar.Collapse id="basic-navbar-nav"> {/* Corrected to Navbar.Collapse */}
                        <Nav className="ms-auto">
                            <Nav.Link href="/cart"><FaShoppingCart /> Cart</Nav.Link> {/* Corrected to Nav.Link */}
                            <Nav.Link href="/login"><FaUser /> Sign In</Nav.Link> {/* Corrected to Nav.Link */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
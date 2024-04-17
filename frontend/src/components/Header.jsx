import { useNavigate } from 'react-router-dom';
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import letters2 from '../assets/letters2.png';

const Header = () => {
    const {cartItems} = useSelector((state) => state.cart);
    const {userInfo} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();
     
    const logoutHandler = async () => {
        try{
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login')
        
        }catch(err){
            console.error(err);
        }
    }
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
                          <SearchBox />
                            {/* Ensure each LinkContainer wraps a single Nav.Link */}
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <FaShoppingCart /> Cart
                                    {
                                        cartItems.length > 0 && (
                    <Badge pill bg='danger' style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                                        )
                                    }
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
                           
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
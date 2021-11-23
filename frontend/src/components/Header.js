import { Container, Navbar, Nav, NavDropdown, } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'


import React from 'react'

function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart 

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'> 
                        <Navbar.Brand >Amina Shop</Navbar.Brand>
                    </LinkContainer>
                    <Nav id='mobile_nav'>
                        <LinkContainer id='cart_mobile' to='/cart'>
                            <Nav.Link>
                                <i className="fas fa-shopping-cart"></i>({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                            </Nav.Link>
                        </LinkContainer>
                            
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    </Nav>
                    <Navbar.Collapse  id="basic-navbar-nav">
                        <SearchBox />
                        <Nav className="me-auto">
                            {userInfo && userInfo.isAdmin && (
                                    <NavDropdown title='Admin' id='adminmenue'>
                                        <LinkContainer to='/admin/userlist'>
                                            <NavDropdown.Item>Users</NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to='/admin/productlist'>
                                            <NavDropdown.Item>Products</NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to='/admin/orderlist'>
                                            <NavDropdown.Item>Orders</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                )}
                        </Nav>

                        <Nav>
                            <LinkContainer id='cart_desktop' to='/cart'>
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart"></i>({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                                </Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ): (
                                    <LinkContainer to='/login'>
                                        <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                                    </LinkContainer>
                                )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header

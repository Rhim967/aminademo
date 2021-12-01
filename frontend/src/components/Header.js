import { Container, Form, Row, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import{ useTranslation } from 'react-i18next'
import { i18n } from '../i18n'

import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'


import React from 'react'

function Header() {
    const {t, i18n} = useTranslation()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart 

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    const onChange = (e) => {
        e.preventDefault();
        i18n.changeLanguage(e.target.value)
    }
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'> 
                        <Navbar.Brand >MB</Navbar.Brand>
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
                                <NavDropdown title={t('admin')} id='adminmenue'>
                                        <LinkContainer to='/admin/userlist'>
                                            <NavDropdown.Item>{t('users')}</NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to='/admin/productlist'>
                                            <NavDropdown.Item>{t('products')}</NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to='/admin/orderlist'>
                                            <NavDropdown.Item>{t('orders')}</NavDropdown.Item>
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
                                        <NavDropdown.Item>{t('profile')}</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>{t('logout')}</NavDropdown.Item>
                                </NavDropdown>
                            ): (
                                    <LinkContainer to='/login'>
                                        <Nav.Link><i className="fas fa-user"></i>{t('login')}</Nav.Link>
                                    </LinkContainer>
                                )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="lang-box">
                <button className="language-btn " value="ru" onClick={onChange}>{t("Russian")}</button>
                <i class="fas fa-globe"></i>
                <button className="language-btn " value="en" onClick={onChange}>{t("English")}</button>
            </div>
        </header>
    )
}

export default Header

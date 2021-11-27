import React, {useState, useEffect} from 'react'
import{ useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'

function LoginScreen({location, history}) {
    const {t, i18n} = useTranslation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h2>{t("sign in")}</h2>
            {error && <Message variant='danger' >{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>{t("email")}</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="example@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>{t("password")}</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                    {t("sign in")} 
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    {t("New Customer")} <Link 
                    to={redirect ? `/register?redirect=${redirect}` : '/register'}>{t("Register")}</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen

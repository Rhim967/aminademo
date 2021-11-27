import React, {useState, useEffect} from 'react'
import{ useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'

function RegisterScreen({location, history}) {
    const {t, i18n} = useTranslation()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        }else{
            dispatch(register(name, email, password, confirmPassword, message))
        }
    }

    return (
        <FormContainer>
            <h2>{t("Register")}</h2>
            {message && <Message variant='danger' >{message}</Message>}
            {error && <Message variant='danger' >{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId="name">
                    <Form.Label>{t("name")}</Form.Label>
                    <Form.Control
                        required
                        type="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>{t("email")}</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="example@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>{t("password")}</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group  className='mb-3' controlId="confirmPassword">
                    <Form.Label>{t("confirm password")}</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                    {t("Register")} 
                </Button>

            </Form>

            <Row className="py-3">
                <Col>
                    {t("Have An Account")} <Link 
                    to={redirect ? `/login?redirect=${redirect}` : '/login'}>{t("sign in")}</Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default RegisterScreen

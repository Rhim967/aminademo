import React, {useState, } from 'react' //useEffect
import{ useTranslation } from 'react-i18next'
import { Form, Button, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen({history}) {
    const {t, i18n} = useTranslation()

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if(!shippingAddress.address){
        history.push(`/shipping`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push(`/placeorder`)
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>{t("Select Method")}</Form.Label>

                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Cart'
                            id='paypal'
                            name='peymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value) }
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button className='mt-2' type='submit' variant='primary'>
                    {t("Continue")} 
                </Button>
            </Form>

        </FormContainer>
    )
}

export default PaymentScreen

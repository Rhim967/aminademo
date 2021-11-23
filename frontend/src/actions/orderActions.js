import axios from 'axios'
import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,

    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,

    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
 } from '../constants/orderConstants'

 import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

// for creating order ----------------------------------------------------------------------------------------------------------------
export const createOrder = (order) => async (dispatch, getState) => {

    try{
        
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo }, 
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(
            `api/orders/add/`,
            order,
            config
        )

        dispatch({
            type: ORDER_CREATE_SUCCESS,  //maight be it shuld be (USER_UPDATE_PROFILE_RESET)
            payload: data
        })

        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data
        })

        localStorage.removeItem('cartItems')


    }catch(error){
        
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// for displaing details of order --------------------------------------------------------------------------------------------------------
export const getOrderDetails = (id) => async (dispatch, getState) => {

    try{
        
        dispatch({
            type: ORDER_DETAIL_REQUEST
        })

        const {
            userLogin: { userInfo }, 
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/orders/${id}/`,
            config
        )


        dispatch({
            type: ORDER_DETAIL_SUCCESS,
            payload: data
        })


    }catch(error){
        
        dispatch({
            type: ORDER_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// for pay order --------------------------------------------------------------------------------------------------------------------------
export const payOrder = (id, paymentResult) => async (dispatch, getState) => {

    try{
        
        dispatch({
            type: ORDER_PAY_REQUEST
        })

        const {
            userLogin: { userInfo }, 
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/orders/${id}/pay/`,
            paymentResult,
            config
        )


        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })


    }catch(error){
        
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// for deliver order ----------------------------------------------------------------------------------------------------------------------
export const deliverOrder = (order) => async (dispatch, getState) => {

    try{
        
        dispatch({
            type: ORDER_DELIVER_REQUEST
        })

        const {
            userLogin: { userInfo }, 
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/orders/${order._id}/deliver/`,
            {},
            config
        )


        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data
        })


    }catch(error){
        
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// for displaing all orders of user ------------------------------------------------------------------------------------------------------
export const listMyOrders = () => async (dispatch, getState) => {

    try{
        
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        })

        const {
            userLogin: { userInfo }, 
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/orders/myorders/`,
            config
        )


        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })


    }catch(error){
        
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// for displaing all orders ------------------------------------------------------------------------------------------------------
export const listOrders = () => async (dispatch, getState) => {

    try{
        
        dispatch({
            type: ORDER_LIST_REQUEST
        })

        const {
            userLogin: { userInfo }, 
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/orders/`,
            config
        )


        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })


    }catch(error){
        
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

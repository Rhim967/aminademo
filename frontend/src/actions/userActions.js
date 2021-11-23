import axios from 'axios'

import { 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS ,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS ,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST, 
    USER_DETAILS_SUCCESS ,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    //USER_UPDATE_PROFILE_RESET,

    USER_LIST_REQUEST, 
    USER_LIST_SUCCESS ,
    USER_LIST_FAIL,
    USER_LIST_RESET,

    USER_DELETE_REQUEST, 
    USER_DELETE_SUCCESS ,
    USER_DELETE_FAIL,

    USER_UPDATE_REQUEST, 
    USER_UPDATE_SUCCESS ,
    USER_UPDATE_FAIL,
} from '../constants/userConstants'

import {
    ORDER_LIST_MY_RESET,

} from '../constants/orderConstants'

// logic for log In
export const login = (email, password) => async (dispatch) => {

    try{
        
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post(
            'api/users/login/',
            {'username': email, 'password': password},
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// logic for log Out
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    //that's maight be wrong---------------------------
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET})
    dispatch({ type: USER_LIST_RESET})
}

// logging for registration
export const register = (name, email, password) => async (dispatch) => {

    try{
        
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post(
            'api/users/register/',
            {'name':name, 'email': email, 'password': password},
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload:data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


// logging for details
export const getUserDetails = (id) => async (dispatch, getState) => {

    try{
        
        dispatch({
            type: USER_DETAILS_REQUEST
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

        const {data} = await axios.get(
            `/api/users/${id}/`,
            config
        )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload:data
        })



    }catch(error){
        
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// logging for updadeProfile
export const updateUserProfile = (user) => async (dispatch, getState) => {

    try{
        
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
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

        const {data} = await axios.put(
            `api/users/profile/update/`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,  //maight be it shuld be (USER_UPDATE_PROFILE_RESET)
            payload:data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))


    }catch(error){
        
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


// displaing all our users for admin
export const listUsers = () => async (dispatch, getState) => {

    try{
        
        dispatch({
            type: USER_LIST_REQUEST
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

        const {data} = await axios.get(
            `/api/users/`,
            config
        )

        dispatch({
            type: USER_LIST_SUCCESS,  //maight be it shuld be (USER_LIST_RESET)
            payload: data
        })


    }catch(error){
        
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


// deletion user by id
export const deleteUser = (id) => async (dispatch, getState) => {

    try{
        
        dispatch({
            type: USER_DELETE_REQUEST
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

        const {data} = await axios.delete(
            `/api/users/delete/${id}/`,
            config
        )

        dispatch({
            type: USER_DELETE_SUCCESS,  //maight be it shuld be (USER_DELETE_RESET)
            payload: data
        })


    }catch(error){
        
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// updating user by id
export const updateUser = (user) => async (dispatch, getState) => {

    try{
        
        dispatch({
            type: USER_UPDATE_REQUEST
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

        const {data} = await axios.put(
            `/api/users/update/${user._id}/`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_SUCCESS,  //maight be it shuld be (USER_UPDATE_RESET)
        })

        dispatch({
            type: USER_DETAILS_SUCCESS,  //maight be it shuld be (USER_UPDATE_RESET)
            payload: data
        })

    }catch(error){
        
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



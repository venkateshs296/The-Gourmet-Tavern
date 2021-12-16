import axios from 'axios';
import { getConfig, setError } from './commonActions';

export const getCartItems = (token) => {
    return (dispatch) => {
        axios.get(`/cart`,{headers: getConfig(token).header})
        .then(res => {
            // dispatch({
            //     type : 'CLEAR_ERROR'
            // })

            dispatch({
                type : 'GET_CART_ITEMS',
                payload : res.data
            })
            
        })
        // .catch(err => {
        //     setError(dispatch, err.response.data.message, err.response.status, 'GET_CART_ITEMS_FAILURE');
        // })
    }
}

export const addToCart = (product,token) => {
    return (dispatch) => {
        axios.post(`/cart/add`,product,{headers: getConfig(token).header})
        .then(res => {
            // dispatch({
            //     type : 'CLEAR_ERROR'
            // })

            dispatch({
                type : 'ADD_TO_CART_ITEMS',
                payload : res.data
            })
            
        })
        .catch(err => {
            setError(dispatch, err.response.data.message, err.response.status, 'ADD_TO_CART_ITEMS_FAILURE');
        })
    }
}

export const updateCart = (product,token) => {
    return (dispatch) => {
        axios.put(`/cart/update`,{product},{headers: getConfig(token).header})
        .then(res => {
            // dispatch({
            //     type : 'CLEAR_ERROR'
            // })

            dispatch({
                type : 'UPDATE_TO_CART_ITEMS',
                payload : res.data
            })
            
        })
        .catch(err => {
            setError(dispatch, err.response.data.message, err.response.status, 'UPDATE_TO_CART_ITEMS_FAILURE');
        })
    }
}

export const deleteFromCart = (product,token) => {
    const headers = getConfig(token).header

    return (dispatch) => {
        axios.delete(`/cart/delete`, {headers: headers,data:{product}})
        .then(res => {
            // dispatch({
            //     type : 'CLEAR_ERROR'
            // })

            dispatch({
                type : 'DELETE_FROM_CART_ITEMS',
                payload : res.data
            })
            
        })
        .catch(err => {
            setError(dispatch, err.response.data.message, err.response.status, 'DELETE_FROM_CART_ITEMS_FAILURE');
        })
    }
}
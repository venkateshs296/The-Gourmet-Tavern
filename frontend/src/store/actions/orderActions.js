import axios from 'axios';
import { getCartItems } from './cartActions';
import { getConfig, setError } from './commonActions';

export const getOrders = (token) => {
    return (dispatch) => {
        axios.get(`/orders`,{headers: getConfig(token).header})
        .then(res => {
            dispatch({
                type : 'CLEAR_ERROR'
            })

            dispatch({
                type : 'GET_ORDERS',
                payload : res.data
            })
            
        })
        .catch(err => {
            setError(dispatch, err.response.data.message, err.response.status, 'GET_ORDER_FAILURE');
        })
    }
}

export const addOrders = (order,token, history) => {
    return (dispatch) => {
        axios.post(`/orders/add`,order,{headers: getConfig(token).header})
        .then(res => {
            
            dispatch({
                type : 'ADD_ORDERS',
                payload : res.data
            })
            history.push('/')
        })
        // .catch(err => {
        //     setError(dispatch, err.response.data.message, err.response.status, 'ADD_ORDER_FAILURE');
        // })
    }
}


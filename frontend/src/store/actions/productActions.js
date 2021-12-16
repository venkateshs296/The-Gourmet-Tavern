import axios from 'axios';
import { getConfig, setError } from './commonActions';


export const getProducts_Food = (type, skip, limit, search, category, cuisine, preference) => {
    return (dispatch) => {
        axios.get(`/products?productType=${type}&skip=${skip}&limit=${limit}&searchTerm=${search}&category=${category}&cuisine=${cuisine}&preference=${preference}`)
        .then(res => {
            dispatch({
                type : 'CLEAR_ERROR'
            })

            dispatch({
                type : 'GET_FOOD_ITEMS',
                payload : res.data.products
            })
            
        })
        .catch(err => {
            setError(dispatch, err.response.data.message, err.response.status, 'GET_ITEM_FAILURE');
        })
    }
}

export const getProducts_Drink = (type, skip, limit, search, category, level) => {
    return (dispatch) => {
        axios.get(`/products?productType=${type}&skip=${skip}&limit=${limit}&searchTerm=${search}&category=${category}&level=${level}`)
        .then(res => {
            dispatch({
                type : 'CLEAR_ERROR'
            })

            dispatch({
                type : 'GET_DRINK_ITEMS',
                payload : res.data.products
            })
            
        })
        .catch(err => {
            setError(dispatch, err.response.data.message, err.response.status, 'GET_ITEM_FAILURE');
        })
    }
}


export const addFood = (food_item, token) => {
    return (dispatch, getState) => {
        axios.post('/products/add', food_item,{headers: getConfig(token).header})
        .then( res => {
            dispatch({
                type: "ADD_FOOD",
                payload:res.data
            })
        })
        .catch(err => {
            setError(dispatch, err.response.data.message, err.response.status, 'ADD_FOOD_FAILURE');
        })
    }
}

export const addDrink = (drink_item, token) => {
    return (dispatch, getState) => {
        axios.post('/products/add', drink_item,{headers: getConfig(token).header})
        .then( res => {
            dispatch({
                type: "ADD_DRINK",
                payload:res.data
            })
        })
        .catch(err => {
            setError(dispatch, err.response.data.message, err.response.status, 'ADD_DRINK_FAILURE');
        })
    }
}

export const editProduct = (id, item, token) => {
    return (dispatch, getState) => {
        axios.put(`/products/${id}`, item,{headers: getConfig(token).header})
        .then( res => {
            dispatch({
                type: "EDIT_PRODUCT",
                payload: res.data
            })
            // getProducts(item.productType,0,50,"","","","")
        })
        .catch(err => {
            setError(dispatch, err.response.data.message, err.response.status, 'EDIT_PRODUCT_FAILURE');
        })
    }
}

export const deleteProduct = (id, token) => {
    return (dispatch, getState) => {
        axios.delete(`/products/${id}`,{headers: getConfig(token).header})
        .then( res => {
            dispatch({
                type: "DELETE_PRODUCT",
                payload: res.data
            })
        })
        .catch(err => {
            setError(dispatch, err.response.data.message, err.response.status, 'DELETE_PRODUCT_FAILURE');
        })
    }
}

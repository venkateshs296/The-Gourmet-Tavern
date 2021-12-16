export const setError = (dispatch, msg, status, id) => {
    dispatch({
        type : 'SET_ERROR',
        payload : {
            msg,
            status,
            id
        }
    });
}

export const getConfig = (token, contentType='application/json') => {
    const config = {
        header : {
            'Content-Type' : contentType
        }
    }
    if(token) {
        config.header['auth-token'] = token;
    }
    return config;
}

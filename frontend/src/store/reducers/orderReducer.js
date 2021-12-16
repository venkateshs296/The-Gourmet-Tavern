const orderReducer = (state = [], action) => {

  switch(action.type) {
    
    case "GET_ORDERS":
      return action.payload;
    case "ADD_ORDERS":
      return state;
    
    default:
    return state;

  }
};

export default orderReducer;

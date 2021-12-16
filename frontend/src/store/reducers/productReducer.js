const productReducer = (state = [], action) => {
    switch(action.type) {
  
        case "ADD_DRINK":
        return [action.payload, ...state];
      
        case "GET_DRINK_ITEMS":
        return action.payload
      
        case "EDIT_PRODUCT":
        return state.map((product) => {
            return product._id === action.payload._id? action.payload : product
        })
    
        case "ADD_FOOD":
        return [action.payload, ...state];
          
        case "GET_FOOD_ITEMS":
        return action.payload

        case "DELETE_PRODUCT":
        return state.filter((product) => {
            return product._id !== action.payload._id
        })

        default:
        return [...state];
        
    }
  };
  
  export default productReducer;
  
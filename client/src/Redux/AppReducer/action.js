import * as types from "./actionTypes";

const getCartRequest = () => {
  return { type: types.GET_CART_REQUEST };
};

const getCartSuccess = (payload) => {
  
  return { type: types.GET_CART_SUCCESS, payload };
};

const getCartError = () => {
  return { type: types.GET_CART_FAILURE };
};



export { getCartError, getCartRequest, getCartSuccess };
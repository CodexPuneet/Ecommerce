import * as types from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  Cart: [],
};



const reducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_CART_REQUEST:
      return { ...state, isLoading: true };
    case types.GET_CART_SUCCESS:
      return { ...state, isLoading: false, Cart: payload };
    case types.GET_CART_FAILURE:
      return { ...state, isError: true };
    default:
      return state;
  }
};
export { reducer };
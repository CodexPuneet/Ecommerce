import * as types from "./actionTypes";

const initState = {
  isLoading: false,
  token: localStorage.getItem('token')||null,
  isError: false,
  isAuth: {},
};



const reducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_AUTH_REQUEST:
      return { ...state, isLoading: true, isAuth: false };
    case types.GET_AUTH_SUCCESS:
      return { ...state, isLoading: false, token: payload.token, isAuth: payload.user };
    case types.GET_AUTH_FAILURE:
      return { ...state, isError: true, isAuth: false };
    case types.GET_AUTH_LOGOUT:
      return { ...state, isAuth: false, token: null, isAuth:{} };
    default:
      return state;
  }
};
export { reducer };
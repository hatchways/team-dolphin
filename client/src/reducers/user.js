const reducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...state,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        loading: false,
      };
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };
    case "LOGOUT":
      return {
        ...state,
        user: {},
        isAuthenticated: false,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;

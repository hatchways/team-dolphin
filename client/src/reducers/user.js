const reducer = (state, action) => {
  switch (action.type) {
    case "USER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "SET_USER":
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
    case "SET_ERROR":
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

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
      };
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
      };
    default:
      return state;
  }
};

export default reducer;

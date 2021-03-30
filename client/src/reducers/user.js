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
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null,
      };
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload,
      };
    case "SET_PLATFORMS":
      return {
        ...state,
        user: {
          ...state.user,
          platforms: action.payload,
        },
      };
    case "SET_REPORT_EMAIL":
      return {
        ...state,
        user: {
          ...state.user,
          reportEmail: action.payload,
        },
      };
    case "SET_COMPANIES":
      return {
        ...state,
        user: {
          ...state.user,
          companies: action.payload,
        },
      };
    case "SET_ACTIVE_COMPANY":
      return {
        ...state,
        user: {
          ...state.user,
          activeCompany: action.payload,
        },
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
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;

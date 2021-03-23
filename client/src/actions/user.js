import axios from "axios";

export const login = async (dispatch, payload) => {
  try {
    dispatch({
      type: "USER_REQUEST",
    });

    const res = await axios.post("/api/users/auth/signin", payload);

    dispatch({
      type: "SET_USER",
      payload: {
        email: res.data.email,
        name: res.data.name,
      },
    });
  } catch (err) {
    dispatch({
      type: "SET_ERROR",
      payload: err.response.data.message,
    });
    throw err;
  }
};

export const validateRegistration = (dispatch) => {
  dispatch({
    type: "SET_ERROR",
    payload: "Please review the form",
  });
};

// Register User Action
export const register = async (dispatch, payload) => {
  try {
    dispatch({
      type: "USER_REQUEST",
    });

    // data from backend server
    const res = await axios.post("/api/users/auth/signup", payload);

    dispatch({
      type: "SET_USER",
      payload: {
        email: res.data.email,
        name: res.data.name,
      },
    });
  } catch (err) {
    dispatch({
      type: "SET_ERROR",
      payload: err.response.data.message,
    });
    throw err;
  }
};

export const authenticate = async (dispatch) => {
  try {
    dispatch({
      type: "USER_REQUEST",
    });

    const res = await axios.get("/api/users/me", {
      withCredentials: true,
    });

    dispatch({
      type: "SET_USER",
      payload: {
        email: res.data.email,
        name: res.data.name,
      },
    });
  } catch (error) {
    dispatch({
      type: "SET_ERROR",
      payload: error.response.data.message,
    });
    throw error;
  }
};

export const setSearchTerm = (dispatch, searchTerm) => {
  dispatch({
    type: "SET_SEARCH_TERM",
    payload: searchTerm,
  });
};

// User logout action
export const logout = async (dispatch) => {
  dispatch({
    type: "LOGOUT",
  });
};

import axios from "axios";

export const login = async (dispatch, payload) => {
  // const { email, password } = payload;
  console.log(payload);

  try {
    dispatch({
      type: "USER_REQUEST",
    });

    const res = await axios.post("/api/users/auth/signin", payload);

    dispatch({
      type: "SET_USER",
      payload: {
        isAuthenticated: true,
        user: {
          email: res.data.email,
          name: res.data.name,
        },
      },
    });

    return res.data;
  } catch (err) {
    dispatch({
      type: "SET_ERROR",
      payload: { error: err.response.data.message },
    });
    return err.response;
  }
};

// Register User Action
export const register = async (dispatch, payload) => {
  try {
    dispatch({
      type: "USER_REQUEST",
    });

    // data from backend server
    const { data } = await axios.post("/api/users/auth/signup", payload);

    dispatch({
      type: "SET_USER",
      payload: data,
    });

    return data;
  } catch (err) {
    dispatch({
      type: "SET_ERROR",
      payload: { error: err.response.data.message },
    });
    return err;
  }
};

// User logout action
export const logout = async (dispatch) => {
  dispatch({
    type: "LOGOUT",
  });
};

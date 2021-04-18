import axios from "axios";
import { isValidEmail } from "../pages/Signup";

export const login = async (dispatch, payload) => {
  try {
    dispatch({
      type: "USER_REQUEST",
    });

    const res = await axios.post("/api/users/auth/signin", payload);
    console.log("### res.data from actions-login");
    dispatch({
      type: "SET_USER",
      payload: {
        email: res.data.email,
        reportEmail: res.data.reportEmail,
        companies: ["Toyota"],
        activeCompany: ["Toyota"],
        platforms: res.data.platforms,
        likedMentions: res.data.likedMentions,
      },
    });
    console.log("was SET_USER triggered ???");
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
        reportEmail: res.data.reportEmail,
        companies: res.data.companies,
        activeCompany: res.data.activeCompany,
        platforms: res.data.platforms,
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
    console.log("### res.data from actions-authenticate");

    dispatch({
      type: "SET_USER",
      payload: {
        email: res.data.email,
        reportEmail: res.data.reportEmail,
        companies: ["Mazda"],
        activeCompany: ["Mazda"],
        platforms: res.data.platforms,
        likedMentions: res.data.likedMentions,
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
  await axios.get("/api/users/logout");
  dispatch({
    type: "LOGOUT",
  });
};

export const setReportEmail = (dispatch, updatedEmail) => {
  dispatch({
    type: "SET_REPORT_EMAIL",
    payload: updatedEmail,
  });
};

export const updateUser = async (update) => {
  try {
    await axios.patch("/api/users/update", update);
  } catch (error) {
    throw error;
  }
};

export const addCompany = async (update) => {
  try {
    await axios.patch("/api/users/addcompany", update);
  } catch (error) {
    throw error;
  }
};

export const likeMention = async (newURL) => {
  try {
    await axios.patch("/api/users/likemention", newURL);
  } catch (error) {
    throw error;
  }
};

export const unlikeMention = async (newURL) => {
  try {
    await axios.patch("/api/users/unlikemention", newURL);
  } catch (error) {
    throw error;
  }
};

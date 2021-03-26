import axios from "axios";
import { isValidEmail } from "../pages/Signup";

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
  } catch (error) {
    dispatch({
      type: "SET_ERROR",
      payload: error.response.data.message,
    });
    throw error;
  }
};

export const setPlatforms = async (dispatch, platforms) => {
  dispatch({
    type: "SET_PLATFORMS",
    payload: platforms,
  });

  try {
    const res = await axios.patch("/api/users/update/platforms", platforms);
    return res;
  } catch (error) {
    dispatch({
      type: "LOGOUT",
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

export const updateCompanies = async (dispatch, companies) => {
  dispatch({
    type: "SET_COMPANIES",
    payload: companies,
  });
  try {
    const res = await axios.patch("/api/users/update/companies", {
      companies,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateReportEmail = async (dispatch, update) => {
  if (!isValidEmail(update.updatedEmail)) {
    dispatch({
      type: "SET_ERROR",
      payload: "Invalid email format",
    });
    throw new Error("Invalid email format");
  }

  dispatch({
    type: "SET_ERROR",
    payload: null,
  });
  try {
    const res = await axios.patch("/api/users/update/reportEmail", {
      updatedEmail: update.updatedEmail,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateActiveCompany = async (dispatch, update) => {
  dispatch({
    type: "SET_ACTIVE_COMPANY",
    payload: update,
  });

  try {
    await axios.patch("/api/users/update/activeCompany", {
      updatedCompany: update,
    });
  } catch (error) {
    throw error;
  }
};

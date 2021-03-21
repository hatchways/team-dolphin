import React, { createContext, useReducer } from "react";
import reducer from "../reducers/user";
import axios from "axios";

const UserContext = createContext();

const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  user: {},
  searchTerm: "",
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUser = (isAuthenticated, user) => {
    dispatch({
      type: "SET_USER",
      payload: {
        isAuthenticated,
        user,
      },
    });
  };

  const setSearchTerm = (searchTerm) => {
    dispatch({
      type: "SET_SEARCH_TERM",
      payload: {
        searchTerm,
      },
    });
  };

  const setLoading = () => {
    dispatch({
      type: "SET_LOADING",
    });
  };

  const authenticate = async () => {
    try {
      setLoading();
      const res = await axios.get("/api/users/me", {
        withCredentials: true,
      });
      setUser(true, { email: res.data.email, name: res.data.name });
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({
        type: "SET_ERROR",
        payload: {
          error: error.response,
        },
      });
      setUser(false, {});
    }
  };

  async function getMentions() {
    try {
      const res = await axios.get("/api/mentions?platforms=reddit");
      return res.data.mentions;
    } catch (err) {
      return `message: ${err}`;
    }
  }

  return (
    <UserContext.Provider
      value={{
        ...state,
        setUser,
        setSearchTerm,
        getMentions,
        authenticate,
        dispatch,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

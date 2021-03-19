import React, { createContext, useReducer, useEffect } from "react";
import reducer from "../reducers/user";
import axios from "axios";

const UserContext = createContext();

const initialState = {
  isAuthenticated: null,
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

  const authenticate = async () => {
    try {
      const res = await axios.get("/api/users/me", {
        withCredentials: true,
      });
      setUser(true, { email: res.data.email, name: res.data.name });
    } catch (error) {
      setUser(false, {});
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <UserContext.Provider value={{ ...state, setUser, setSearchTerm }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

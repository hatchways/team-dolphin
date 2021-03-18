import React, { createContext, useReducer, useEffect } from "react";
import reducer from "../reducers/user";
import axios from "axios";

const UserContext = createContext();

const checkAuth = async () => {
  const res = await axios.get("/api/users/me", {
    withCredentials: true,
  });
  if (res.status === 200) return true;
  return false;
};

const initialState = {
  isAuthenticated: checkAuth(),
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUser = (email, name) => {
    dispatch({
      type: "SET_USER",
      payload: {
        email,
        name,
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

  useEffect(() => {
    const authenticate = async () => {
      try {
        const res = await axios.get("/api/users/me", {
          withCredentials: true,
        });
        setUser(res.data.email, res.data.name);
      } catch (error) {
        console.log("error");
        // TODO: redirect to /login
      }
    };

    authenticate();
  }, []);

  return (
    <UserContext.Provider value={{ ...state, setUser, setSearchTerm }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

import React, { createContext, useReducer } from "react";
import reducer from "../reducers/user";

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

  return (
    <UserContext.Provider
      value={{
        ...state,
        dispatch,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

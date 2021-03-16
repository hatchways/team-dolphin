import React, { createContext, useReducer } from "react";
import reducer from "../reducers/user";

const UserContext = createContext();

const initialState = {
  user: {},
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

  return (
    <UserContext.Provider value={{ ...state, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

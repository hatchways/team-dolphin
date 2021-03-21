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
        getMentions,
        dispatch,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

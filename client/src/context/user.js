import React, { createContext, useReducer, useEffect } from "react";
import reducer from "../reducers/user";
import axios from "axios";

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
    <UserContext.Provider value={{ ...state, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

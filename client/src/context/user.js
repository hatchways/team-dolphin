import React, { createContext, useReducer, useEffect } from "react";
import reducer from "../reducers/user";
import axios from "axios";

const UserContext = createContext();

// const checkAuth = async () => {
//   const res = await axios.get("/api/users/me", {
//     withCredentials: true,
//   });
//   if (res.status === 200) return true;
//   return false;
// };

const initialState = {
  isAuthenticated: false,
  user: [],
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

  // useEffect(() => {
  //   const authenticate = async () => {
  //     try {
  //       const res = await axios.get("/api/users/me", {
  //         withCredentials: true,
  //       });
  //       setUser(res.data.email, res.data.name);
  //     } catch (error) {
  //       console.log("error");
  //     }
  //   };

  //   authenticate();
  // }, []);

  async function isAuth() {
    try {
      const res = await axios.get("/api/users/me", {
        withCredentials: true,
      });
      console.log(res);
      setUser(res.data.email, res.data.name);
      return res.status === 200;
    } catch (err) {
      return false;
    }
  }

  return (
    <UserContext.Provider value={{ ...state, setUser, setSearchTerm, isAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

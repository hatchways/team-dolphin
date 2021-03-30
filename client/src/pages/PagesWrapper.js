import React, { useContext, useEffect } from "react";
import { authenticate } from "../actions/user";
import { UserContext } from "../context/user";

const PagesWrapper = ({ children }) => {
  const { dispatch, isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    authenticate(dispatch);
  }, [isAuthenticated, dispatch]);

  return <>{children}</>;
};

export default PagesWrapper;

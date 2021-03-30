import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/user";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from:
                  props.location.pathname === "/setting"
                    ? { pathname: "/" }
                    : props.location,
              },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

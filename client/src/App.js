import React, { useContext } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { UserContext } from "./context/user";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { theme } from "./themes/theme";
import HomePage from "./pages/HomePage";
import SettingPage from "./pages/SettingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./App.css";
import { Redirect } from "react-router-dom";

function App() {
  const { isAuthenticated } = useContext(UserContext);

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) =>
              isAuthenticated === true ? <HomePage /> : <Redirect to="/login" />
            }
          />
          <Route path="/setting" component={SettingPage} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;

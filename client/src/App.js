import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { UserProvider } from "./context/user";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { theme } from "./themes/theme";
import HomePage from "./pages/HomePage";
import SettingPage from "./pages/SettingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./App.css";
import { Redirect } from "react-router-dom";

function App() {
  return (
    <UserProvider>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Redirect to="/signup" />
            </Route>
            <Route path="/" component={HomePage} exact />
            <Route path="/setting" component={SettingPage} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </UserProvider>
  );
}

export default App;

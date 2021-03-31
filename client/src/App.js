import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { theme } from "./themes/theme";
import HomePage from "./pages/HomePage";
import SettingPage from "./pages/SettingPage";
import MentionPage from "./pages/MentionPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PagesWrapper from "./pages/PagesWrapper";
import "./App.css";
import PrivateRoute from "./pages/PrivateRoute";
import ScrollRestoration from "react-scroll-restoration";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <ScrollRestoration />
        <Switch>
          <PagesWrapper>
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute path="/setting" component={SettingPage} />
            {/* <PrivateRoute path="/mentions/:id" component={MentionPage} /> */}
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </PagesWrapper>
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;

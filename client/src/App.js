import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { theme } from "./themes/theme";
import HomePage from "./pages/HomePage";
import SettingPage from "./pages/SettingPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PagesWrapper from "./pages/PagesWrapper";
import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <PagesWrapper>
            <Route exact path="/" component={HomePage} />
            <Route path="/setting" component={SettingPage} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </PagesWrapper>
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;

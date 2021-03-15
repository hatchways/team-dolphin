import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { theme } from "./themes/theme";
import HomePage from "./pages/HomePage";
import SettingPage from "./pages/SettingPage";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" component={HomePage} exact />
        <Route path="/setting" component={SettingPage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;

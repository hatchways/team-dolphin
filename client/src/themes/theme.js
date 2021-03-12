import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    },
    h3: {
      fontSize: "2em",
      fontWeight: 800
    },
    h4: {
      fontSize: "1em",
      fontWeight: 600
    }
  },
  palette: {
    primary: { main: "#657DF2" , light: "#94A5F5"},
    secondary: { main: "#303F9F" }
  }
});

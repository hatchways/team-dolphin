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
      fontWeight: 800,
    },
    h4: {
      fontSize: "1em",
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.1em",
    },
  },
  palette: {
    primary: { main: "#536dfe", light: "#94A5F5" },
    secondary: { main: "#303f9f" },
    text: { primary: "#303030", secondary: "#949494" },
    background: { paper: "#FAFBFF" },
  },
});

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchBox from "./SearchBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCogs } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    height: "10vh",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    color: theme.palette.primary.light,
  },
  logo: {
    textDecoration: "none",
  },
}));

const AppBarLoggedIn = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Grid container alignItems="center">
          <Grid item xs={1}>
            <Link to="/" className={classes.logo}>
              <Typography variant="h4" align="right" style={{ color: "#FFF" }}>
                mentions
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={1}>
            <Link to="/" className={classes.logo}>
              <Typography variant="h4" color="secondary" align="left">
                crawler.
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={8} align="right">
            <SearchBox />
          </Grid>
          <Grid item xs={1} align="right">
            <FontAwesomeIcon icon={faUser} className={classes.icon} />
          </Grid>
          <Grid item xs={1} align="center">
            <Link to="/setting">
              <IconButton aria-label="setting">
                <FontAwesomeIcon icon={faCogs} className={classes.icon} />
              </IconButton>
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarLoggedIn;

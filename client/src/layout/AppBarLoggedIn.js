import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchBox from "./SearchBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCogs, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user";
import { updateUser } from "../actions/user";

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

  const { user, dispatch } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (e, item) => {
    setAnchorEl(null);

    if (
      item === "backdropClick" ||
      item === "escapeKeyDown" ||
      item === "tabKeyDown"
    )
      return;

    try {
      await updateUser({
        activeCompany: item,
      });
      dispatch({
        type: "SET_ACTIVE_COMPANY",
        payload: item,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
          <Grid item xs={7} align="right">
            <SearchBox />
          </Grid>
          <Grid item xs={1} align="right">
            <FontAwesomeIcon icon={faUser} className={classes.icon} />
          </Grid>
          <Grid item xs={1} align="center">
            <IconButton aria-label="companies" onClick={handleClick}>
              <FontAwesomeIcon icon={faBriefcase} className={classes.icon} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              {user.companies.map((company) => (
                <MenuItem onClick={(e) => handleClose(e, company)}>
                  {company}
                </MenuItem>
              ))}
            </Menu>
          </Grid>
          <Grid item xs={1} align="left">
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

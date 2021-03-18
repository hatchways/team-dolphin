import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SettingCompany from "../layout/SettingCompany";
import AppBarLoggedIn from "../layout/AppBarLoggedIn";
import SettingTab from "../layout/SettingTab";
import SettingSecurity from "../layout/SettingSecurity";

const useStyles = makeStyles((theme) => ({
  leftPanel: {
    paddingLeft: theme.spacing(8),
    paddingTop: theme.spacing(8),
    backgroundColor: theme.palette.common.white,
  },
  rightPanel: {
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(8),
    backgroundColor: "#FAFBFF",
  },
  icon: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(2),
  },
}));

const SettingPage = () => {
  const classes = useStyles();

  return (
    <>
      <AppBarLoggedIn />
      <BrowserRouter>
        <Grid container>
          <Grid item xs={3} className={classes.leftPanel}>
            <Typography variant="h3" align="left">
              Settings
              <FontAwesomeIcon
                icon={faCog}
                className={classes.icon}
                size="xs"
              />
            </Typography>
            <SettingTab />
          </Grid>
          <Grid item xs={9} className={classes.rightPanel}>
            <Switch>
              <Route exact path="/setting" component={SettingCompany}></Route>
              <Route path="/setting/company" component={SettingCompany}></Route>
              <Route
                path="/setting/security"
                component={SettingSecurity}
              ></Route>
            </Switch>
          </Grid>
        </Grid>
      </BrowserRouter>
    </>
  );
};

export default SettingPage;

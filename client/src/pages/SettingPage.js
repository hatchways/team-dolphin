import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import SettingCompany from "../layout/SettingCompany";
import AppBarLoggedIn from "../layout/AppBarLoggedIn";
import SettingTab from "../layout/SettingTab";

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
    height: "100vh",
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
      <Grid container>
        <Grid item xs={4} className={classes.leftPanel}>
          <Typography variant="h3" align="left">
            Settings
            <FontAwesomeIcon icon={faCog} className={classes.icon} size="xs" />
          </Typography>
          <SettingTab />
        </Grid>
        <Grid item xs={8} className={classes.rightPanel}>
          <SettingCompany />
        </Grid>
      </Grid>
    </>
  );
};

export default SettingPage;

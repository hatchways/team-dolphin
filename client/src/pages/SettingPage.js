import React, { useState } from "react";
import AppBarLoggedIn from "../layout/AppBarLoggedIn";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Tabs, Tab, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import CompanySetting from "../layout/CompanySetting";
import { Link } from "react-router-dom";

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
  indicator: {
    left: "0px",
    width: "5px",
    height: "30px !important",
    transform: "translateY(10px)",
  },
  tabs: {
    marginTop: theme.spacing(5),
  },
  wrapper: {
    alignItems: "flex-start",
    paddingLeft: theme.spacing(1),
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: 800,
  },
  selected: {
    color: theme.palette.primary.main,
  },
}));

const SettingPage = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // logout function handler
  const logoutHandler = () => {};

  return (
    <>
      <AppBarLoggedIn />
      <Grid container>
        <Grid item xs={4} className={classes.leftPanel}>
          <Typography variant="h3" align="left">
            Settings
            <FontAwesomeIcon icon={faCog} className={classes.icon} size="xs" />
          </Typography>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            indicatorColor={"primary"}
            aria-label="setting tabs"
            classes={{
              root: classes.tabs,
              indicator: classes.indicator,
            }}
          >
            <Tab
              label="Company"
              classes={{
                wrapper: classes.wrapper,
                selected: classes.selected,
              }}
              to="/setting/company"
              component={Link}
            />
            <Tab
              label="Security"
              classes={{
                wrapper: classes.wrapper,
                selected: classes.selected,
              }}
              to="/setting/security"
              component={Link}
            />
            <Tab
              label="Log out"
              classes={{
                wrapper: classes.wrapper,
                selected: classes.selected,
              }}
              onClick={logoutHandler}
            />
          </Tabs>
        </Grid>
        <Grid item xs={8} className={classes.rightPanel}>
          <CompanySetting />
        </Grid>
      </Grid>
    </>
  );
};

export default SettingPage;

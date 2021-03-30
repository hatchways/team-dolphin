import React, { useContext, useState } from "react";
import { Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { logout } from "../actions/user";
import { UserContext } from "../context/user";

const useStyles = makeStyles((theme) => ({
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

const SettingTab = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { dispatch } = useContext(UserContext);

  return (
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
      }}>
      <Tab
        label="Company"
        classes={{
          wrapper: classes.wrapper,
          selected: classes.selected,
        }}
        to={"/setting/company"}
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
        onClick={() => logout(dispatch)}
      />
    </Tabs>
  );
};

export default SettingTab;

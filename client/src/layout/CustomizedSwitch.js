import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Switch } from "@material-ui/core";

export const CustomizedSwitch = withStyles((theme) => ({
  root: {
    width: 50,
    height: 25,
    padding: 0,
    marginRight: theme.spacing(2),
  },
  switchBase: {
    padding: 3,
    "&$checked": {
      transform: "translateX(23px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
      },
    },
  },
  thumb: {
    width: 20,
    height: 20,
  },
  track: {
    borderRadius: 25 / 2,
    border: "none",
    backgroundColor: "#bdc7d4",
    opacity: 1,
  },
  checked: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

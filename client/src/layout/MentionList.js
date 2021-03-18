import React, { useState } from "react";
import {
  List,
  ListItem,
  Divider,
  Avatar,
  ListItemText,
  ListItemAvatar,
  Typography,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import reddit from "../utils/images/reddit-logo.png";
import twitter from "../utils/images/twitter-logo.png";
import facebook from "../utils/images/facebook-logo.png";
import amazon from "../utils/images/amazon-logo.png";
import forbes from "../utils/images/forbes-logo.png";
import shopify from "../utils/images/shopify-logo.png";
import business_insider from "../utils/images/BI-logo.png";
import { CustomizedSwitch } from "./CustomizedSwitch";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  listItem: {
    height: "5em",
    marginLeft: theme.spacing(2),
  },
}));

const MentionList = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    checkedReddit: true,
    checkedTwitter: true,
    checkedFacebook: true,
    checkedAmazon: false,
    checkedForbes: false,
    checkedShopify: false,
    checkedBusinessInsider: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <List className={classes.root}>
      <ListItem className={classes.listItem}>
        <ListItemAvatar>
          <Avatar alt="reddit" src={reddit} />
        </ListItemAvatar>
        <ListItemText primary={<Typography variant="h4">Reddit</Typography>} />
        <ListItemSecondaryAction>
          <CustomizedSwitch
            checked={state.checkedReddit}
            onChange={handleChange}
            name="checkedReddit"
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="middle" light />
      <ListItem className={classes.listItem}>
        <ListItemAvatar>
          <Avatar alt="reddit" src={twitter} />
        </ListItemAvatar>
        <ListItemText primary={<Typography variant="h4">Twitter</Typography>} />
        <ListItemSecondaryAction>
          <CustomizedSwitch
            checked={state.checkedTwitter}
            onChange={handleChange}
            name="checkedTwitter"
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="middle" light />
      <ListItem className={classes.listItem}>
        <ListItemAvatar>
          <Avatar alt="reddit" src={facebook} />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography variant="h4">Facebook</Typography>}
        />
        <ListItemSecondaryAction>
          <CustomizedSwitch
            checked={state.checkedFacebook}
            onChange={handleChange}
            name="checkedFacebook"
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="middle" light />
      <ListItem className={classes.listItem}>
        <ListItemAvatar>
          <Avatar alt="reddit" src={amazon} />
        </ListItemAvatar>
        <ListItemText primary={<Typography variant="h4">Amazon</Typography>} />
        <ListItemSecondaryAction>
          <CustomizedSwitch
            checked={state.checkedAmazon}
            onChange={handleChange}
            name="checkedAmazon"
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="middle" light />
      <ListItem className={classes.listItem}>
        <ListItemAvatar>
          <Avatar alt="reddit" src={forbes} />
        </ListItemAvatar>
        <ListItemText primary={<Typography variant="h4">Forbes</Typography>} />
        <ListItemSecondaryAction>
          <CustomizedSwitch
            checked={state.checkedForbes}
            onChange={handleChange}
            name="checkedForbes"
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="middle" light />
      <ListItem className={classes.listItem}>
        <ListItemAvatar>
          <Avatar alt="reddit" src={shopify} />
        </ListItemAvatar>
        <ListItemText primary={<Typography variant="h4">Shopify</Typography>} />
        <ListItemSecondaryAction>
          <CustomizedSwitch
            checked={state.checkedShopify}
            onChange={handleChange}
            name="checkedShopify"
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="middle" light />
      <ListItem className={classes.listItem}>
        <ListItemAvatar>
          <Avatar alt="reddit" src={business_insider} />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography variant="h4">Business Insider</Typography>}
        />
        <ListItemSecondaryAction>
          <CustomizedSwitch
            checked={state.checkedBusinessInsider}
            onChange={handleChange}
            name="checkedBusinessInsider"
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="middle" light />
    </List>
  );
};

export default MentionList;

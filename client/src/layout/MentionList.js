import React, { useContext } from "react";
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
import { UserContext } from "../context/user";
import { updateUser } from "../actions/user";

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

  const { user, dispatch } = useContext(UserContext);

  const togglePlatform = async (event) => {
    const updatedPlatforms = {
      ...user.platforms,
      [event.target.name]: event.target.checked,
    };

    try {
      await updateUser({
        platforms: updatedPlatforms,
      });
      dispatch({
        type: "SET_PLATFORMS",
        payload: updatedPlatforms,
      });
    } catch (error) {
      console.log(error);
    }
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
            checked={user.platforms.reddit}
            onChange={togglePlatform}
            name="reddit"
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="middle" light />
      <ListItem className={classes.listItem}>
        <ListItemAvatar>
          <Avatar alt="twitter" src={twitter} />
        </ListItemAvatar>
        <ListItemText primary={<Typography variant="h4">Twitter</Typography>} />
        <ListItemSecondaryAction>
          <CustomizedSwitch
            checked={user.platforms.twitter}
            onChange={togglePlatform}
            name="twitter"
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="middle" light />
      <ListItem className={classes.listItem}>
        <ListItemAvatar>
          <Avatar alt="facebook" src={facebook} />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography variant="h4">Facebook</Typography>}
        />
        <ListItemSecondaryAction>
          <CustomizedSwitch
            checked={user.platforms.facebook}
            onChange={togglePlatform}
            name="facebook"
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="middle" light />
      <ListItem className={classes.listItem}>
        <ListItemAvatar>
          <Avatar alt="amazon" src={amazon} />
        </ListItemAvatar>
        <ListItemText primary={<Typography variant="h4">Amazon</Typography>} />
        <ListItemSecondaryAction>
          <CustomizedSwitch
            checked={user.platforms.amazon}
            onChange={togglePlatform}
            name="amazon"
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="middle" light />
      <ListItem className={classes.listItem}>
        <ListItemAvatar>
          <Avatar alt="forbes" src={forbes} />
        </ListItemAvatar>
        <ListItemText primary={<Typography variant="h4">Forbes</Typography>} />
        <ListItemSecondaryAction>
          <CustomizedSwitch
            checked={user.platforms.forbes}
            onChange={togglePlatform}
            name="forbes"
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="middle" light />
      <ListItem className={classes.listItem}>
        <ListItemAvatar>
          <Avatar alt="shopify" src={shopify} />
        </ListItemAvatar>
        <ListItemText primary={<Typography variant="h4">Shopify</Typography>} />
        <ListItemSecondaryAction>
          <CustomizedSwitch
            checked={user.platforms.shopify}
            onChange={togglePlatform}
            name="shopify"
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="middle" light />
      <ListItem className={classes.listItem}>
        <ListItemAvatar>
          <Avatar alt="businessinsider" src={business_insider} />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography variant="h4">Business Insider</Typography>}
        />
        <ListItemSecondaryAction>
          <CustomizedSwitch
            checked={user.platforms.businessinsider}
            onChange={togglePlatform}
            name="businessinsider"
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="middle" light />
    </List>
  );
};

export default MentionList;

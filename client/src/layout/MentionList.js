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
import nyt from "../utils/images/nyt-logo.png";
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
          <Avatar alt="nyt" src={nyt} />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography variant="h4">The New York Times</Typography>}
        />
        <ListItemSecondaryAction>
          <CustomizedSwitch
            checked={user.platforms.nyt}
            onChange={togglePlatform}
            name="nyt"
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="middle" light />
    </List>
  );
};

export default MentionList;

import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import redditLogo from "../utils/images/reddit-logo.png";
import twitterLogo from "../utils/images/twitter-logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(2),
    width: "80%",
    height: "10em",
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0px 0px 4px 1px rgba(0,0,0,0.3)",
    },
  },
  media: {
    minHeight: "8em",
    minWidth: "8em",
    marginLeft: "1em",
    border: "none",
  },
  content: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  subtitle: {
    color: "#d2d2d2",
    fontWeight: 400,
    fontSize: 15,
  },
  text: {
    color: theme.palette.text.secondary,
  },
  customBox: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    wordBreak: "break-all",
    overflow: "hidden",
  },
  icon: {
    alignSelf: "start",
    padding: theme.spacing(2),
    marginLeft: "auto",
    color: theme.palette.primary.main,
  },
  titleBox: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 1,
    wordBreak: "break-all",
    overflow: "hidden",
  },
}));

const image = (image) => {
  switch (keyword) {
    case "default" || "self":
      return redditLogo;
    case "twitterDefault":
      return twitterLogo;
    default:
      return image;
  }
};

const Mention = ({ mention }) => {
  const classes = useStyles();
  const keyword = "DolphinCorp";
  const regex = new RegExp(`${keyword}`, "i");
  const indexK = mention.title.search(regex);

  return (
    <Card className={classes.root}>
      <CardMedia
        image={image(mention.image)}
        className={classes.media}
        title="mention cover"
      />
      <CardContent className={classes.content}>
        <Box component="div" className={classes.titleBox}>
          <Typography variant="h6" gutterBottom>
            {/* {mention.title.substring(0, indexK)}
            <span style={{ color: "#536dfe" }}>{keyword}</span>
            {mention.title.substring(indexK + keyword.length)} */}
            {mention.title}
          </Typography>
        </Box>
        <Typography
          vairant="subtitle1"
          className={classes.subtitle}
          gutterBottom>
          {mention.platform}
        </Typography>
        <Box component="div" classes={{ root: classes.customBox }}>
          <Typography vairant="caption" className={classes.text} gutterBottom>
            {mention.content}
          </Typography>
        </Box>
      </CardContent>
      <FontAwesomeIcon icon={faSmile} className={classes.icon} size="lg" />
    </Card>
  );
};

export default Mention;

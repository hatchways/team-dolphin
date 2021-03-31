import React, { useContext, useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faFrown, faMeh } from "@fortawesome/free-regular-svg-icons";
import redditLogo from "../utils/images/reddit-logo.png";
import twitterLogo from "../utils/images/twitter-logo.png";
import { UserContext } from "../context/user";

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
  highlight: {
    color: theme.palette.primary.main,
  },
}));

const image = (image) => {
  switch (image) {
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
  const { searchTerm, user } = useContext(UserContext);
  const [keyword, setKeyword] = useState(user.activeCompany);
  const regex = new RegExp(`${keyword}`, "i");
  const indexK = mention.title.search(regex);

  useEffect(() => {
    if (searchTerm !== "") {
      setKeyword(searchTerm);
    }
  }, [searchTerm]);

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
            {indexK >= 0 ? (
              <span>
                {mention.title.substring(0, indexK)}
                <span className={classes.highlight}>
                  {mention.title.substring(indexK, indexK + keyword.length)}
                </span>
                {mention.title.substring(indexK + keyword.length)}
              </span>
            ) : (
              mention.title
            )}
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
      <FontAwesomeIcon
        icon={
          mention.sentiment === "positive"
            ? faSmile
            : mention.sentiment === "negative"
            ? faFrown
            : faMeh
        }
        className={classes.icon}
        size="lg"
      />
    </Card>
  );
};

export default Mention;

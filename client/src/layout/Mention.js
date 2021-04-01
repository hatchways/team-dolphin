import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Dialog,
  Grid,
  Button,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faFrown, faMeh } from "@fortawesome/free-regular-svg-icons";
import redditLogo from "../utils/images/reddit-logo.png";
import twitterLogo from "../utils/images/twitter-logo.png";
import nytLogo from "../utils/images/nyt-logo.png";
import { UserContext } from "../context/user";
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { REACT_APP_BASE_URL } from "../utils/constants";

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
  modalRoot: {
    width: "100%",
    height: "600px",
  },
  modalHeader: {
    minHeight: "5em",
    alignItems: "center",
    margin: "1em 2em",
  },
  modalImage: {
    height: "16em",
    width: "16em",
    margin: "auto",
  },
  modalContent: {
    height: "16em",
    width: "100%",
    overflow: "auto",
  },
  modalButtons: {
    margin: "0.5em",
  },
  highlight: {
    color: theme.palette.primary.main,
  },
}));

const image = (image) => {
  switch (image) {
    case "self":
      return redditLogo;
    case "default":
      return redditLogo;
    case "twitterDefault":
      return twitterLogo;
    case "nytDefault":
      return nytLogo;
    default:
      return image;
  }
};

const Mention = ({ mention }) => {
  const classes = useStyles();
  const history = useHistory();
  const { searchTerm, user } = useContext(UserContext);
  const [keyword, setKeyword] = useState(user.activeCompany);
  const regex = new RegExp(`${keyword}`, "i");
  const indexK = mention.title.search(regex);
  const url = `${REACT_APP_BASE_URL}/mentions/${mention._id}`;
  const [mentionUrl, setMentionUrl] = useState(url);

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClickOpen = () => {
    setDialogOpen(true);
    window.history.pushState({}, "", `/mentions/${mention._id}`);
  };

  const handleClose = () => {
    setDialogOpen(false);
    history.push("/");
  };

  useEffect(() => {
    if (searchTerm !== "") {
      setKeyword(searchTerm);
    }
  }, [searchTerm]);

  return (
    <>
      <Card className={classes.root} onClick={handleClickOpen}>
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
            <Typography variant="caption" className={classes.text} gutterBottom>
              {mention.content}
            </Typography>
          </Box>
        </CardContent>
        <FontAwesomeIcon
          icon={
            mention.sentiment > 0
              ? faSmile
              : mention.sentiment < 0
              ? faFrown
              : faMeh
          }
          className={classes.icon}
          size="lg"
        />
      </Card>

      <Dialog open={dialogOpen} className={classes.modalRoot} maxWidth="md">
        <Card>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              onClick={handleClose}
              className={classes.modalHeader}>
              <Box display="flex" justifyContent="center">
                <Typography variant="h6">{mention.title}</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} spacing={2} container>
              <Grid item xs={6}>
                <CardMedia
                  className={classes.modalImage}
                  image={image(mention.image)}
                  title="mention cover"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography paragraph className={classes.modalContent}>
                  {mention.content}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              spacing={2}
              className={classes.modalButtons}
              container>
              <Grid item xs={4}>
                <Link href={mention.url} target="_blank" rel="noopener">
                  <Button variant="contained" color="primary" fullWidth>
                    Open link
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <CopyToClipboard text={mentionUrl}>
                  <Button variant="contained" color="primary" fullWidth>
                    SHARE
                  </Button>
                </CopyToClipboard>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                  fullWidth>
                  Close
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Dialog>
    </>
  );
};

export default Mention;

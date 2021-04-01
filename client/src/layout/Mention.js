import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Button,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import redditLogo from "../utils/images/reddit-logo.png";
import twitterLogo from "../utils/images/twitter-logo.png";
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
}));

const image = (image) => {
  if (image === "default" || image === "self") {
    return redditLogo;
  } else {
    return image;
  }
};

const Mention = ({ mention }) => {
  const classes = useStyles();
  const history = useHistory();
  const { searchTerm } = useContext(UserContext);
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
      <Dialog open={dialogOpen}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DialogTitle onClick={handleClose}>
              <Typography variant="h6">{mention.title}</Typography>
            </DialogTitle>
          </Grid>
          <Grid item xs={12}>
            <DialogContent>
              <Grid item xs={12}>
                <Typography paragraph>{mention.content}</Typography>
              </Grid>

              <Grid item xs={12} container spacing={2}>
                <Grid item xs={6}>
                  <Link href={mention.url} target="_blank" rel="noopener">
                    <Button variant="contained" color="primary" fullWidth>
                      Open link
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={6}>
                  <CopyToClipboard text={mentionUrl}>
                    <Button variant="contained" color="primary" fullWidth>
                      SHARE
                    </Button>
                  </CopyToClipboard>
                </Grid>
              </Grid>
            </DialogContent>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default Mention;

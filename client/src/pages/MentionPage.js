import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { UserContext } from "../context/user";
import { getOneMention } from "../hooks/getOneMention";
import HomePage from "./HomePage";
import {
  Dialog,
  Typography,
  Grid,
  Button,
  Link,
  Card,
  CardMedia,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { REACT_APP_BASE_URL } from "../utils/constants";
import redditLogo from "../utils/images/reddit-logo.png";

const useStyles = makeStyles((theme) => ({
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
}));

const MentionPage = () => {
  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const [mention, setMention] = useState({});
  const url = `${REACT_APP_BASE_URL}/mentions/${mention._id}`;
  const [mentionUrl, setMentionUrl] = useState(url);
  const [openDialog, setOpenDialog] = useState(false);
  ////// Like mention feature //////////////
  const [mentionIsLiked, setMentionIsLiked] = useState(false);
  const { user } = useContext(UserContext);

  const checkIfLiked = (mention) => {
    const isLiked = user.likedMentions.find((m) => m.url === mention.url);
    return isLiked ? setMentionIsLiked(true) : setMentionIsLiked(false);
  };

  useEffect(() => {
    getOneMention(id)
      .then((data) => {
        setMention(data);
        checkIfLiked(data);
        setOpenDialog(true);
      })
      .catch((err) => alert("Something went wrong"));
  }, []);

  const handleclick = () => {
    setOpenDialog(false);
    history.push("/");
  };

  const image = (image) => {
    if (image === "default" || image === "self") {
      return redditLogo;
    } else {
      return image;
    }
  };

  return (
    <>
      <HomePage />
      <Dialog open={openDialog} className={classes.modalRoot} maxWidth="md">
        <Card>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              onClick={handleclick}
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
              <Grid item xs={3}>
                <Link href={mention.url} target="_blank" rel="noopener">
                  <Button variant="contained" color="primary" fullWidth>
                    Open link
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={3}>
                <CopyToClipboard text={mentionUrl}>
                  <Button variant="contained" color="primary" fullWidth>
                    SHAREE
                  </Button>
                </CopyToClipboard>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color={mentionIsLiked ? "secondary" : "primary"}
                  fullWidth>
                  {mentionIsLiked ? "UNLIKE" : "LIKE"}
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleclick}
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

export default MentionPage;

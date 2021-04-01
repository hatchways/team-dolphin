import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneMention } from "../hooks/getOneMention";
import HomePage from "./HomePage";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  Button,
  Link,
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { REACT_APP_BASE_URL } from "../utils/constants";

const MentionPage = () => {
  const { id } = useParams();
  const [mention, setMention] = useState({});
  const url = `${REACT_APP_BASE_URL}/mentions/${mention._id}`;
  const [mentionUrl, setMentionUrl] = useState(url);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    getOneMention(id)
      .then((data) => {
        setMention(data);
        setOpenDialog(true);
      })
      .catch((err) => alert("Something went wrong"));
  }, []);

  const handleclick = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <HomePage />
      <Dialog open={openDialog} maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DialogTitle onClick={handleclick}>
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

export default MentionPage;

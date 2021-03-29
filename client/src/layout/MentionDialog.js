import React, { useState } from "react";
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

const MentionDialog = (props) => {
  const { mention, openDialog, setOpenDialog } = props;
  const url = `${REACT_APP_BASE_URL}/mentions/${mention._id}`;
  const [mentionSectionUrl, setMentionSectionUrl] = useState(url);

  return (
    <Dialog open={openDialog} maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DialogTitle onClick={() => setOpenDialog(false)}>
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
                <CopyToClipboard text={mentionSectionUrl}>
                  <Button variant="contained" color="primary" fullWidth>
                    Copy URL
                  </Button>
                </CopyToClipboard>
              </Grid>
            </Grid>
          </DialogContent>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default MentionDialog;

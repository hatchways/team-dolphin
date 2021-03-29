import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard"; // FaClipboard
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { REACT_APP_BASE_URL } from "../utils/constants";

const MentionDialog = (props) => {
  const { mention, children, openDialog, setOpenDialog } = props;
  const url = `${REACT_APP_BASE_URL}/mentions/${mention._id}`;
  const [mentionSectionUrl, setMentionSectionUrl] = useState(url);

  return (
    <Dialog open={openDialog}>
      <DialogTitle onClick={() => setOpenDialog(false)}>
        <div>{mention.title}</div>
      </DialogTitle>
      <DialogContent>
        <div>{mention.content}</div>
        <hr />
        <a href={mention.url}>Open link</a>
        <hr />
        <CopyToClipboard text={mentionSectionUrl}>
          <button>Copy URL</button>
        </CopyToClipboard>
        <hr />
        <span>{mentionSectionUrl}</span>
      </DialogContent>
    </Dialog>
  );
};

export default MentionDialog;

// TODO
// - Import copy-to-clipboard button

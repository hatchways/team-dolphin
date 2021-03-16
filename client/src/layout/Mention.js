import React from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(3),
    width: "80%",
    height: "12em",
  },
  media: {
    height: "10em",
    width: "10em",
    marginLeft: "1em",
    border: "1px solid black",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  header: {
    paddingTop: "2px",
    paddingBottom: "2px",
  },
  title: {
    fontWeight: 500,
    fontSize: 18,
  },
  subtitle: {
    color: "#d2d2d2",
    paddingTop: "2px",
    fontWeight: 400,
    fontSize: 15,
  },
  text: {
    paddingTop: "2px",
    color: "#949494",
  },
}));

const Mention = ({ mention }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia image={mention.image} className={classes.media} />
      <div className={classes.content}>
        <CardHeader
          title={mention.title}
          subheader={mention.platform}
          classes={{
            title: classes.title,
            root: classes.header,
            subheader: classes.subtitle,
          }}
        />
        <CardContent classes={{ root: classes.text }}>
          <Typography>{mention.content}</Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default Mention;

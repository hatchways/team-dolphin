import React from "react";
import AppBarLoggedIn from "../layout/AppBarLoggedIn";
import Mention from "../layout/Mention";
import MentionList from "../layout/MentionList";
import { Grid, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  box: {
    alignItems: "center",
    margin: theme.spacing(6, 3, 4, 0),
    width: "80%",
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const mentionDatas = [
    {
      title: "PayPal invested $400 in DolphinCorp PayPal invested $400",
      id: 1,
      platform: "Reddit",
      image: "https://picsum.photos/100",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisquis nostrud exercitation ullamco laboris nisUt eni",
    },
    {
      title: "PayPal invested $800 in DolphinCorp",
      id: 2,
      platform: "Facebook",
      image: "https://picsum.photos/200/300",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisquis nostrud exercitation ullamco laboris nisUt eni",
    },
    {
      title: "invested $400 in DolphinCorp",
      id: 3,
      platform: "Twitter",
      image: "https://picsum.photos/200",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisquis nostrud exercitation ullamco laboris nisUt eni",
    },
    {
      title: "invested $400 in DolphinCorp",
      id: 4,
      platform: "Twitter",
      image: "https://picsum.photos/400",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisquis nostrud exercitation ullamco laboris nisUt eni",
    },
  ];

  return (
    <>
      <AppBarLoggedIn />
      <Grid container style={{ backgroundColor: "#fff", height: "100vh" }}>
        <Grid item xs>
          <MentionList />
        </Grid>
        <Grid item xs={7} style={{ backgroundColor: "#FAFBFF" }} align="right">
          <Box className={classes.box}>
            <Typography variant="h3" align="left">
              My mentions
            </Typography>
          </Box>
          {mentionDatas.map((mentionData) => (
            <Mention key={mentionData.id} mention={mentionData} />
          ))}
        </Grid>
        <Grid item xs={2} style={{ backgroundColor: "#FAFBFF" }}></Grid>
      </Grid>
    </>
  );
};

export default HomePage;

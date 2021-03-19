import React, { useEffect, useState, useContext } from "react";
import AppBarLoggedIn from "../layout/AppBarLoggedIn";
import Mention from "../layout/Mention";
import { Grid, Typography, Box } from "@material-ui/core";
import axios from "axios";
import { UserContext } from "../context/user";
import { makeStyles } from "@material-ui/core/styles";
import MentionList from "../layout/MentionList";

const useStyles = makeStyles((theme) => ({
  box: {
    alignItems: "center",
    margin: theme.spacing(6, 3, 4, 0),
    width: "80%",
  },
}));

const HomePage = ({ history }) => {
  const [mentionDatas, setMentionDatas] = useState([]);
  const classes = useStyles();
  const { isAuth, user } = useContext(UserContext);

  useEffect(() => {
    isAuth().then((res) => {
      if (!res) {
        history.push("/login");
      }
    });
    async function fetchMentions() {
      let respond = await axios.get("api/mentions?platforms=reddit");
      console.log(respond.data);
      setMentionDatas(respond.data.mentions);
    }

    fetchMentions();
  }, []);

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
            <Mention key={mentionData._id} mention={mentionData} />
          ))}
        </Grid>
        <Grid item xs={2} style={{ backgroundColor: "#FAFBFF" }}></Grid>
      </Grid>
    </>
  );
};

export default HomePage;

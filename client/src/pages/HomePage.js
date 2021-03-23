import React, { useContext, useEffect, useState } from "react";
import AppBarLoggedIn from "../layout/AppBarLoggedIn";
import { Grid, Typography, Box } from "@material-ui/core";
import { UserContext } from "../context/user";
import Mention from "../layout/Mention";
import MentionList from "../layout/MentionList";
import { makeStyles } from "@material-ui/core/styles";
import Spinner from "../layout/Spinner";
import { getMentions } from "../hooks/getMentions";

const useStyles = makeStyles((theme) => ({
  box: {
    alignItems: "center",
    margin: theme.spacing(6, 3, 4, 0),
    width: "80%",
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const [mentionDatas, setMentionDatas] = useState(null);
  const { dispatch, error, searchTerm, user } = useContext(UserContext);

  useEffect(() => {
    getMentions(dispatch, searchTerm, user.platforms)
      .then((data) => setMentionDatas(data))
      .catch((err) => alert("Cookie expired. Please log in again"));
  }, [searchTerm]);

  if (mentionDatas === null) return <Spinner />;

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
          {!error && mentionDatas.length > 0 ? (
            mentionDatas.map((mentionData) => (
              <Mention key={mentionData._id} mention={mentionData} />
            ))
          ) : (
            <div>No results found</div>
          )}
        </Grid>
        <Grid item xs={2} style={{ backgroundColor: "#FAFBFF" }}></Grid>
      </Grid>
    </>
  );
};

export default HomePage;

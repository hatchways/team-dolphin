import React from "react";
import AppBarLoggedIn from "../layout/AppBarLoggedIn";
import Mention from "../layout/Mention";
import { Grid } from "@material-ui/core";

const HomePage = () => {
  const mentionData = {
    title: "PayPal invested $400 in DolphinCorp",
    platform: "reddit",
    image: "https://upload.wikimedia.org/wikipedia/fr/f/fc/Reddit-alien.png",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisquis nostrud exercitation ullamco laboris nisUt eni",
  };

  return (
    <>
      <AppBarLoggedIn />
      <Grid container style={{ backgroundColor: "#fff", height: "100vh" }}>
        <Grid item xs></Grid>
        <Grid item xs={7} style={{ backgroundColor: "#FAFBFF" }} align="right">
          <Mention mention={mentionData} />
        </Grid>
        <Grid item xs={2} style={{ backgroundColor: "#FAFBFF" }}></Grid>
      </Grid>
    </>
  );
};

export default HomePage;
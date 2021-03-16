import React from "react";
import AppBarLoggedIn from "../layout/AppBarLoggedIn";
import { Grid } from "@material-ui/core";

const HomePage = () => {
  return (
    <>
      <AppBarLoggedIn />
      <Grid style={{ backgroundColor: "#cfe8fc", height: "100vh" }}>
        fake contents
      </Grid>
    </>
  );
};

export default HomePage;

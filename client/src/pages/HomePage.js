import React, { useContext, useEffect } from "react";
import AppBarLoggedIn from "../layout/AppBarLoggedIn";
import { Grid } from "@material-ui/core";
import { UserContext } from "../context/user";
import axios from "axios";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  let history = useHistory();
  const { searchTerm, loading, isAuthenticated } = useContext(UserContext);

  // useEffect(() => {
  //   axios.get(`/api/mentions?keyword=${searchTerm}`)
  // }, [searchTerm])

  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  if (isAuthenticated === false) {
    history.push("/login");
  }

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

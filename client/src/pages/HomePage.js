import React, { useEffect, useState, useContext } from "react";
import AppBarLoggedIn from "../layout/AppBarLoggedIn";
import Mention from "../layout/Mention";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { UserContext } from "../context/user";

const HomePage = ({ history }) => {
  const [mentionDatas, setMentionDatas] = useState([]);

  const { isAuth, user } = useContext(UserContext);

  useEffect(() => {
    isAuth().then((res) => {
      if (!res) {
        history.push("/login");
      }
    });
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    async function fetchMentions() {
      let res = await axios.get("api/mentions", config);
      // console.log(res.data);
      // setMentionDatas(response.data);
    }

    // fetchMentions();
  }, []);

  return (
    <>
      <AppBarLoggedIn />
      <Grid container style={{ backgroundColor: "#fff", height: "100vh" }}>
        <Grid item xs></Grid>
        <Grid item xs={7} style={{ backgroundColor: "#FAFBFF" }} align="right">
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

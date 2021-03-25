import React, { useContext, useEffect, useState } from "react";
import AppBarLoggedIn from "../layout/AppBarLoggedIn";
import { Grid, Typography, Box } from "@material-ui/core";
import { UserContext } from "../context/user";
import MentionList from "../layout/MentionList";
import SortToggle from "../layout/SortToggle";
import { makeStyles } from "@material-ui/core/styles";
import Spinner from "../layout/Spinner";
import { getMentions } from "../hooks/getMentions";
import Scroller from "../layout/Scroller";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  box: {
    alignItems: "center",
    margin: theme.spacing(6, 3, 4, 0),
    width: "80%",
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const [hasMore, setHasMore] = useState(true);
  const [mentionDatas, setMentionDatas] = useState(null);
  const [switching, setSwitching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("date");
  const { dispatch, error, searchTerm, user } = useContext(UserContext);

  const loadMore = async () => {
    const config = {
      headers: { "Access-Control-Allow-Origin": "*" },
    };
    const url =
      "/api/mentions?platforms=reddit" +
      (searchTerm ? "&keyword=" + searchTerm : "") +
      "&page=" +
      (currentPage + 1) +
      "&sort=" +
      sort;

    const results = await axios(url, config);
    setHasMore(results.data.nextPage ? true : false);
    const newData = [...mentionDatas, results.data.mentions].flat();
    setMentionDatas(newData);
    setCurrentPage((prev) => prev + 1);
  };

  const handleAlignment = (event, newAlignment) => {
    setSwitching(true);
    getMentions(dispatch, searchTerm, user.platforms, 1, newAlignment)
      .then((data) => {
        setMentionDatas(data.mentions);
        setHasMore(data.nextPage ? true : false);
      })
      .catch((err) => alert(err.message))
      .finally(() => setSwitching(false));
    setSort(newAlignment);
    setCurrentPage(1);
  };

  useEffect(() => {
    getMentions(dispatch, searchTerm, user.platforms, 1, sort)
      .then((data) => {
        setMentionDatas(data.mentions);
        setHasMore(data.nextPage ? true : false);
      })
      .catch((err) => alert("Cookie expired. Please log in again"));
    setCurrentPage(1);
  }, [searchTerm, user.platforms]);

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
            <div className="flexbox space-between">
              <Typography variant="h3" align="left">
                My mentions
              </Typography>
              <SortToggle
                align="right"
                handleAlignment={handleAlignment}
                alignment={sort}
                setAlignment={setSort}
              />
            </div>
          </Box>
          {switching ? (
            <Spinner />
          ) : (
            <Scroller
              sort={sort}
              loadmore={loadMore}
              hasMore={hasMore}
              setHasMore={setHasMore}
              mentionDatas={mentionDatas}
              setMentionDatas={setMentionDatas}
              error={error}
            />
          )}
        </Grid>
        <Grid item xs={2} style={{ backgroundColor: "#FAFBFF" }}></Grid>
      </Grid>
    </>
  );
};

export default HomePage;

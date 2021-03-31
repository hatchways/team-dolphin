import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AppBarLoggedIn from "../layout/AppBarLoggedIn";
import { Grid, Typography, Box } from "@material-ui/core";
import { UserContext } from "../context/user";
import MentionList from "../layout/MentionList";
import SortToggle from "../layout/SortToggle";
import { makeStyles } from "@material-ui/core/styles";
import Spinner from "../layout/Spinner";
import Scroller from "../layout/Scroller";
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
  const history = useHistory();
  const [hasMore, setHasMore] = useState(true);
  const [mentionDatas, setMentionDatas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("date");

  const { dispatch, error, searchTerm, user } = useContext(UserContext);

  console.log("history object");
  console.log(history);

  const loadMore = async () => {
    const data = await getMentions(
      dispatch,
      searchTerm,
      user.platforms,
      currentPage + 1,
      sort
    );
    setHasMore(data.nextPage ? true : false);
    const newData = [...mentionDatas, data.mentions].flat();
    setMentionDatas(newData);
    localStorage.setItem("mentions", JSON.stringify(newData));
    setCurrentPage(currentPage + 1);
    localStorage.setItem("scrollY", JSON.stringify(window.scrollY));
  };

  const handleAlignment = (event, newAlignment) => {
    setSort(newAlignment);
  };

  useEffect(() => {
    setLoading(true);

    if (history.location.state === undefined) {
      console.log("### from useEffect");
      console.log("### mentions from getMentions ");
      getMentions(dispatch, searchTerm, user.platforms, 1, sort)
        .then((data) => {
          setMentionDatas(data.mentions);
          localStorage.setItem("mentions", JSON.stringify(data.mentions));
          setHasMore(data.nextPage ? true : false);
          setCurrentPage(1);
        })
        .catch((err) => alert("Cookie expired. Please log in again"))
        .finally(() => setLoading(false));
    } else {
      console.log("### from useEffect ");
      console.log("### mentions from LS ");
      console.log(history.location.state.mentions.length);
      console.log(history.location.state.mentions[0]);
      setMentionDatas(history.location.state.mentions);
      setLoading(false);
      if (localStorage.getItem("scrollY") !== undefined) {
        console.log("### scrollY");
        console.log(JSON.parse(localStorage.getItem("scrollY")));
        window.scrollTo(0, JSON.parse(localStorage.getItem("scrollY")));
      }
    }
  }, [searchTerm, user.platforms, user.activeCompany, sort]);

  // if (mentionDatas === null) return <Spinner />;

  return (
    <>
      <AppBarLoggedIn />
      <Grid container style={{ backgroundColor: "#fff", height: "100vh" }}>
        <Grid item xs>
          <MentionList />
        </Grid>
        <Grid item xs={7} style={{ backgroundColor: "#FAFBFF" }} align="right">
          <Box className={classes.box}>
            <Box display="flex">
              <Box flexGrow={1}>
                <Typography variant="h3" align="left">
                  My mentions
                </Typography>
              </Box>
              <Box>
                <SortToggle
                  handleAlignment={handleAlignment}
                  alignment={sort}
                  setAlignment={setSort}
                />
              </Box>
            </Box>
          </Box>
          {loading || mentionDatas === null ? (
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

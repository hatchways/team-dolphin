import React, { useContext, useEffect, useState } from "react";
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
  const [hasMore, setHasMore] = useState(true);
  const [mentionDatas, setMentionDatas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("date");
  const [favoritesFilter, setFavoritesFilter] = useState("all");

  const { dispatch, error, searchTerm, user } = useContext(UserContext);

  const loadMore = async () => {
    const data = await getMentions(
      dispatch,
      searchTerm,
      user.platforms,
      currentPage + 1,
      sort,
      favoritesFilter
    );
    setHasMore(data.nextPage ? true : false);
    const newData = [...mentionDatas, data.mentions].flat();
    setMentionDatas(newData);
    setCurrentPage(currentPage + 1);
  };

  const handleAlignment = (event, newAlignment) => {
    if (["Most Recent", "Most Popular"].includes(event.target.textContent)) {
      setSort(newAlignment);
    } else {
      setFavoritesFilter(newAlignment);
    }
  };

  useEffect(() => {
    setLoading(true);
    getMentions(dispatch, searchTerm, user.platforms, 1, sort, favoritesFilter)
      .then((data) => {
        setMentionDatas(data.mentions);
        setHasMore(data.nextPage ? true : false);
        setCurrentPage(1);
      })
      .catch((err) => alert("Cookie expired. Please log in again"))
      .finally(() => setLoading(false));
  }, [searchTerm, user.platforms, user.activeCompany, sort, favoritesFilter]);

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
              <Box display="flex" flexDirection="column">
                <Box>
                  <SortToggle
                    handleAlignment={handleAlignment}
                    alignment={sort}
                    values={["date", "popularity"]}
                    text={["Most Recent", "Most Popular"]}
                  />
                </Box>
                <Box>
                  <SortToggle
                    handleAlignment={handleAlignment}
                    alignment={favoritesFilter}
                    values={["all", "favorites"]}
                    text={["All Mentions", "Favorites"]}
                  />
                </Box>
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
              mentionDatas={mentionDatas}
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

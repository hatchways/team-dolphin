import React, { useContext, useEffect, useState } from "react";
import AppBarLoggedIn from "../layout/AppBarLoggedIn";
import { Grid, Typography, Box } from "@material-ui/core";
import { UserContext } from "../context/user";
import Mention from "../layout/Mention";
import MentionList from "../layout/MentionList";
import { makeStyles } from "@material-ui/core/styles";
import Spinner from "../layout/Spinner";
import { getMentions } from "../hooks/getMentions";
import InfiniteScroll from "react-infinite-scroller";

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
  const [currentPage, setCurrentPage] = useState(1);
  const { dispatch, error, searchTerm, user } = useContext(UserContext);

  const loadMore = async () => {
    const data = await getMentions(
      dispatch,
      searchTerm,
      user.platforms,
      currentPage + 1
    );
    setHasMore(data.nextPage ? true : false);
    const newData = [...mentionDatas, data.mentions].flat();
    setMentionDatas(newData);
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    getMentions(dispatch, searchTerm, user.platforms, 1)
      .then((data) => {
        setMentionDatas(data.mentions);
        setHasMore(data.nextPage ? true : false);
        setCurrentPage(1);
      })
      .catch((err) => alert("Cookie expired. Please log in again"));
  }, [searchTerm, user.platforms]);

  if (mentionDatas === null) return <Spinner />;

  const items =
    !error && mentionDatas.length > 0 ? (
      mentionDatas.map((mentionData) => (
        <Mention key={mentionData._id} mention={mentionData} />
      ))
    ) : (
      <div>No results found</div>
    );

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

          <InfiniteScroll
            pageStart={currentPage}
            loadMore={() => loadMore(currentPage)}
            hasMore={hasMore}
            loader={<Spinner />}>
            {items}
          </InfiniteScroll>
        </Grid>
        <Grid item xs={2} style={{ backgroundColor: "#FAFBFF" }}></Grid>
      </Grid>
    </>
  );
};

export default HomePage;

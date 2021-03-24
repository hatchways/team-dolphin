import React, { useContext, useEffect, useState } from 'react';
import AppBarLoggedIn from '../layout/AppBarLoggedIn';
import { Grid, Typography, Box } from '@material-ui/core';
import { UserContext } from '../context/user';
import Mention from '../layout/Mention';
import MentionList from '../layout/MentionList';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../layout/Spinner';
import { getMentions } from '../hooks/getMentions';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  box: {
    alignItems: 'center',
    margin: theme.spacing(6, 3, 4, 0),
    width: '80%',
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const [hasMore, setHasMore] = useState(true);
  const [mentionDatas, setMentionDatas] = useState(null);
  const { dispatch, error, searchTerm } = useContext(UserContext);

  const loadMore = async (newPage) => {
    const config = {
      headers: { 'Access-Control-Allow-Origin': '*' },
    };
    const url =
      '/api/mentions?platforms=reddit' +
      (searchTerm ? '&keyword=' + searchTerm : '') +
      '&page=' +
      newPage;

    const results = await axios(url, config);
    setHasMore(results.data.nextPage ? true : false);
    const newData = [...mentionDatas, results.data.mentions].flat();
    setMentionDatas(newData);
  };

  useEffect(() => {
    getMentions(dispatch, searchTerm, 1)
      .then((data) => {
        setMentionDatas(data.mentions);
        setHasMore(data.nextPage ? true : false);
      })
      .catch((err) => alert('Cookie expired. Please log in again'));
  }, [searchTerm]);

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
      <Grid container style={{ backgroundColor: '#fff', height: '100vh' }}>
        <Grid item xs>
          <MentionList />
        </Grid>
        <Grid item xs={7} style={{ backgroundColor: '#FAFBFF' }} align='right'>
          <Box className={classes.box}>
            <Typography variant='h3' align='left'>
              My mentions
            </Typography>
          </Box>

          <InfiniteScroll
            pageStart={1}
            loadMore={loadMore}
            hasMore={hasMore}
            loader={<Spinner />}
          >
            {items}
          </InfiniteScroll>
        </Grid>
        <Grid item xs={2} style={{ backgroundColor: '#FAFBFF' }}></Grid>
      </Grid>
    </>
  );
};

export default HomePage;

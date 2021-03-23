import React, { useState, useEffect } from 'react';
import AppBarLoggedIn from '../layout/AppBarLoggedIn';
// import Mention from '../layout/Mention';
import MentionList from '../layout/MentionList';
import InfiniteScroll from 'react-infinite-scroller';
import { Grid, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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

  const [hasMore, setHasMore] = useState(false);
  const [mockData, setMockData] = useState([]);

  const loadFunc = () => {
    const fetchMockData = async () => {
      // const result = await axios('/api/mentions?platforms=reddit', config);
      // console.log(result.data.nbHits);
      // setMockData(result.data.mentions);

      const result = await axios('https://jsonplaceholder.typicode.com/photos');
      console.log(result.data.length);
      console.log(result.data[0]);
      setMockData(result.data);
    };
    fetchMockData();
  };

  const config = {
    headers: { 'Access-Control-Allow-Origin': '*' },
  };

  useEffect(() => {
    loadFunc();
  }, []);

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
            pageStart={0}
            loadMore={loadFunc}
            hasMore={hasMore}
            loader={
              <div className='loader' key={0}>
                Loading ...
              </div>
            }
            useWindow={false}
          >
            {mockData.map((item, index) => (
              <li key={index}>
                {index}: {item.title}
              </li>
            ))}
          </InfiniteScroll>
        </Grid>
        <Grid item xs={2} style={{ backgroundColor: '#FAFBFF' }}></Grid>
      </Grid>
    </>
  );
};

export default HomePage;

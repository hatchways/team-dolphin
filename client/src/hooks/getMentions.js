import axios from 'axios';

export const getMentions = async (dispatch, keyword, page) => {
  try {
    const url = `/api/mentions?platforms=reddit${
      keyword ? '&keyword=' + keyword : ''
    }&page=${page ? page : '1'}`;

    const res = await axios.get(url);

    return res.data;
  } catch (err) {
    dispatch({
      type: 'LOGOUT',
    });
    throw err;
  }
};

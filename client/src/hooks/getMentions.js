import axios from 'axios';

export const getMentions = async (dispatch, keyword, page = 1) => {
  try {
    const url = `/api/mentions?platforms=reddit${
      keyword ? '&keyword=' + keyword : ''
    }&page=${page}`;

    const res = await axios.get(url);

    return res.data;
  } catch (err) {
    dispatch({
      type: 'LOGOUT',
    });
    throw err;
  }
};

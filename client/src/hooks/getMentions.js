import axios from "axios";

export const getMentions = async (dispatch, keyword, page = 1, sort) => {
  try {
    const url = `/api/mentions?platforms=reddit${
      keyword ? "&keyword=" + keyword : ""
    }&page=${page}${sort ? "&sort=" + sort : "date"}`;

    const res = await axios.get(url);

    return res.data;
  } catch (err) {
    dispatch({
      type: "LOGOUT",
    });
    throw err;
  }
};

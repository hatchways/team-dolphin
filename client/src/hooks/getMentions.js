import axios from "axios";

export const getMentions = async (dispatch, keyword, platforms, page, sort) => {
  const platformsArray = Object.keys(platforms).filter((key) => platforms[key]);

  const platformsString = platformsArray.join();

  try {
    const url = `/api/mentions?platforms=${platformsString}${
      keyword ? "&keyword=" + keyword : ""
    }&page=${page}&sort=${sort}`;

    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    dispatch({
      type: "LOGOUT",
    });
    throw err;
  }
};

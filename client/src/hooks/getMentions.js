import axios from "axios";

export const getMentions = async (dispatch, keyword, platforms, page = 1) => {
  let platformsString;
  let platformsArray = Object.keys(platforms).filter((key) => platforms[key]);

  if (platformsArray.length === 0) platformsString = "";
  else platformsString = platformsArray.join();

  try {
    const url = `/api/mentions?platforms=${platformsString}${
      keyword ? "&keyword=" + keyword : ""
    }&page=${page}`;

    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    dispatch({
      type: "LOGOUT",
    });
    throw err;
  }
};

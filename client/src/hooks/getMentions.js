import axios from "axios";

export const getMentions = async (
  dispatch,
  keyword,
  platforms,
  page = 1,
  sort
) => {
  const platformsArray = Object.keys(platforms).filter((key) => platforms[key]);

  let platformsString = platformsArray.join();

  try {
    const url = `/api/mentions?platforms=${platformsString}${
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

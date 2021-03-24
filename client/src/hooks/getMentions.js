import axios from "axios";

export const getMentions = async (dispatch, keyword, platforms) => {
  const platformsArray = Object.keys(platforms).filter((key) => platforms[key]);

  let platformsString = platformsArray.join();

  try {
    const res = await axios.get(
      `/api/mentions?platforms=${platformsString}&keyword=${keyword}`
    );
    return res.data.mentions;
  } catch (err) {
    dispatch({
      type: "LOGOUT",
    });
    throw err;
  }
};

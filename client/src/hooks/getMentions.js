import axios from "axios";

export const getMentions = async (dispatch, keyword, platforms) => {
  let platformsArray = [];

  let i = 0;
  for (const platform in platforms) {
    if (platforms[platform] === true) {
      platformsArray.push(Object.keys(platforms)[i]);
    }
    i++;
  }

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

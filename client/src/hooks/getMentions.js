import axios from "axios";

export const getMentions = async (dispatch, keyword) => {
  try {
    const res = await axios.get(
      `/api/mentions?platforms=reddit&keyword=${keyword}`
    );
    return res.data.mentions;
  } catch (err) {
    dispatch({
      type: "LOGOUT",
    });
    throw err;
  }
};

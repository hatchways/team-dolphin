import axios from "axios";

export const getMentions = async (keyword) => {
  try {
    const res = await axios.get(
      `/api/mentions?platforms=reddit&keyword=${keyword}`
    );
    return res.data.mentions;
  } catch (err) {
    return `message: ${err}`;
  }
};

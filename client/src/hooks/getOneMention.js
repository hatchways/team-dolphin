import axios from "axios";

export const getOneMention = async (id) => {
  try {
    const url = `/api/mentions/mention?id=${id}`;
    const results = await axios.get(url);
    return results.data;
  } catch (err) {
    throw err;
  }
};

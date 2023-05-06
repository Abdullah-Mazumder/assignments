import axios from "../../utils/axios";

export const getPosts = async () => {
  const response = await axios.get(`/blogs`);

  return response.data;
};

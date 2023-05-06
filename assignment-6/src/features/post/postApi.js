import axios from "../../utils/axios";

export const getPost = async (id) => {
  const response = await axios.get(`/blogs/${id}`);

  return response.data;
};

export const giveLike = async (id, value) => {
  const res = await axios.patch(`/blogs/${id}`, { likes: value });
  return res.data.likes;
};

export const changeSaveStatus = async (id, value) => {
  const res = await axios.patch(`/blogs/${id}`, { isSaved: value });
  return res.data.isSaved;
};

import axios from "../../utils/axios";

export const getRelatedPosts = async ({ tags, id }) => {
  let queryString =
    tags?.length > 0
      ? tags.map((tag) => `tags_like=${tag}`).join("&") + `&id_ne=${id}`
      : `id_ne=${id}`;

  const response = await axios.get(`/blogs?${queryString}`);

  return response.data;
};

import axios from "../../utils/axios";

export const deleteJob = async (id) => {
  return await axios.delete(`/jobs/${id}`);
};

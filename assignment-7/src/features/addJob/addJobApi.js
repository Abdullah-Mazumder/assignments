import axios from "../../utils/axios";

export const addJob = async (job) => {
  return await axios.post(`/jobs`, job);
};

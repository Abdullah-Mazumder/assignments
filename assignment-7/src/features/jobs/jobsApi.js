import axios from "../../utils/axios";

export const getJobs = async () => {
  return (await axios.get("/jobs")).data;
};

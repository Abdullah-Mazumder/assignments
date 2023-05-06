import axios from "../../utils/axios";

export const editJob = async (id, data) => {
  return await axios.patch(`/jobs/${id}`, data);
};

export const getAJob = async (id) => {
  return (await axios.get(`/jobs/${id}`)).data;
};

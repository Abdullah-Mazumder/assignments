import { apiSlice } from "../api/apiSlice";

export const projectsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => "/projects",
    }),
  }),
});

export const { useGetProjectsQuery } = projectsAPI;

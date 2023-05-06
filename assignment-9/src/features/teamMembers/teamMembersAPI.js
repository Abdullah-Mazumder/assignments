import { apiSlice } from "../api/apiSlice";

export const teamMembersAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeamMembers: builder.query({
      query: () => "/team",
    }),
  }),
});

export const { useGetTeamMembersQuery } = teamMembersAPI;

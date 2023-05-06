import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:9000",
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    const { data } = result;

    // when we hit student login route with admin credentials then it was responsing good. similarly when we hit admin login route with student credentials it was also responsing good. so i check this.
    if (api.endpoint === "login") {
      const { body } = args;
      const { user } = data;
      if (user.role !== body.role) {
        throw new Error();
      }
    }

    return result;
  },
  endpoints: () => ({}),
});

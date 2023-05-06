import { configureStore } from "@reduxjs/toolkit";
import filterJobReducer from "../features/filterJob/filterJobSlice";
import jobsReducer from "../features/jobs/jobsSlice";
import addJobReducer from "../features/addJob/addJobSlice";
import deleteJobReducer from "../features/deleteJob/deleteJobSlice";
import editJobReducer from "../features/editJob/editJobSlice";

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    filterType: filterJobReducer,
    addJob: addJobReducer,
    deleteJob: deleteJobReducer,
    editJob: editJobReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

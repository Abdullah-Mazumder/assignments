/* eslint-disable eqeqeq */
import { apiSlice } from "../api/apiSlice";

export const tasksAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
    }),

    getTask: builder.query({
      query: (id) => `/tasks/${id}`,
      providesTags: (_result, _error, arg) => [{ type: "singleTask", id: arg }],
    }),

    addTask: builder.mutation({
      query: (data) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),

      // update tasks cache pessimistically
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;
        if (data?.id) {
          dispatch(
            apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
              draft.push(data);
            })
          );
        }
      },
    }),

    editTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => {
        return [{ type: "singleTask", id: id }];
      },

      // update tasks cache pessimistically
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;
        const { id, deadline, project, teamMember, taskName, status } = data;

        if (id) {
          dispatch(
            apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
              const updateToTask = draft.find((task) => task.id === id);
              updateToTask.deadline = deadline;
              updateToTask.project = project;
              updateToTask.teamMember = teamMember;
              updateToTask.taskName = taskName;
              updateToTask.status = status;
            })
          );
        }
      },
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),

      // update tasks cache optimistically
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const deleteTaskInstance = dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            return draft.filter((task) => task.id != arg);
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          deleteTaskInstance.undo();
        }
      },
    }),

    editTaskStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: { status: status },
      }),

      // update tasks cache optimistically
      async onQueryStarted({ id, status }, { queryFulfilled, dispatch }) {
        const editTaskStatusInstance = dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            const task = draft.find((task) => task.id == id);
            task.status = status;
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          editTaskStatusInstance.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useEditTaskMutation,
  useGetTaskQuery,
  useDeleteTaskMutation,
  useEditTaskStatusMutation,
} = tasksAPI;

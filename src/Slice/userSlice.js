import { createAsyncThunk, createSlice , createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import { axiosApi } from "../Api/Apis";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const initialState = [
//   { id: 0, name: "Tianna Jenkins" },
//   { id: 1, name: "Kevin Grant" },
//   { id: 2, name: "Madison Price" },
// ];

export const apiSlice = createApi({
  
  reducerPath: "api",
  
  baseQuery: fetchBaseQuery({ baseUrl: "https://gorest.co.in/public/v2/" ,headers:{
    "Content-Type": "application/json",
    Authorization:
      "Bearer bf48a2155a23c66e8570badd02a145f845e158e884ccdc777fa82ab13a425ca5",
  }}),
  
  endpoints: (builder) => ({
    tasks: builder.query({
      query: () => "/posts",
    }),
    addTask: builder.mutation({
      query: (task) => ({
        url: `/posts`,
        method: "POST",
        body: task,
      }),
    }),
    updateTask: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: rest,
      }),
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useTasksQuery , useAddTaskMutation ,useDeleteTaskMutation , useUpdateTaskMutation} = apiSlice;

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState();
                                                                                                       

export const fetchUsers = createAsyncThunk("posts/fetchUsers", async () => {
  const response = await axiosApi("users");

  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // builder.addCase(fetchUsers.fulfilled, (state, action) => {
    //   return [...state, ...action.payload];
    // });
    builder.addCase(fetchUsers.fulfilled,usersAdapter.setAll)
  },
});

export default usersSlice.reducer;

// export const selectAllUsers = (state) => state.users;

// export const selectUserById = (state, UserId) =>
//   state.users.find((e) => {
//     return e.id === Number(UserId);
//   });

//using createSelector

export const { selectAll: selectAllUsers, selectById: selectUserById } =
usersAdapter.getSelectors((state) => state.users);
// export const selectPostByUser = createSelector([selectAllUsers,(state,userId)=>userId],(posts,userId)=>posts.filter(post=>post.user===userId))
import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, nanoid } from "@reduxjs/toolkit";
import { axiosApi } from "../Api/Apis";

const postAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});



const initialState =postAdapter.getInitialState ({
  status: "idle",
  error: null,
});

export const fetchPost = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axiosApi("https://gorest.co.in/public/v2/posts");
  
  return response.data;
});

export const sendPost = createAsyncThunk("posts/sendPosts", async (value) => {
  const response = await axiosApi.post("posts", value);

  return response.data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare({ title, content, userId }) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        };
      },
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.entities[id];
      // const existingPost = state.posts.find((post) => {
      //   return post.id === id;
      // });
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.entities[postId]
      // const existingPost = state.posts.find((post) => post.id === postId);

      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        postAdapter.upsertMany(
          state,
          action.payload.map((e) => {
            return {
              id: nanoid(),
              date: new Date().toISOString(),
              title: e.title,
              content: e.body,
              user: e.user_id,
              reactions: {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0,
              },
            };
          })
        );

        // state.posts =  action.payload.map(e=>{
        //     return {
        //       id: nanoid(),
        //       date: new Date().toISOString(),
        //       title: e.title,
        //       content: e.body,
        //       user: e.user_id,
        //       reactions: {
        //         thumbsUp: 0,
        //         hooray: 0,
        //         heart: 0,
        //         rocket: 0,
        //         eyes: 0,
        //       },
        //     };
        //   })
        //  state.posts = action.payload;
      })
      .addCase(sendPost.fulfilled, postAdapter.addOne)
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;

// export const selectAllPosts = (state) => state.posts.posts;

// export const selectPostsByUser = (state, postId) =>{
// console.log(state)
//    };

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postAdapter.getSelectors((state) => state.posts);

// export const selectPostsByUser = createSelector(
//   [selectAllPosts, (state, userId) => userId],
//   (posts, userId) => posts.filter((post) => post.user === userId)
// );

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) =>posts.filter((post) => Number(post.user) === Number(userId)));
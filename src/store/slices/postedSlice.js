const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const { getPostedPosts: getPostedPostsAPI, deletePost: deletePostAPI } = require('../../api/post');

const getPostedPosts = createAsyncThunk('posted/getPostedPosts', async () => {
  const data = await getPostedPostsAPI();
  return data.post;
});

const deletePost = createAsyncThunk('post/delete', async params => {
  const { postId } = params;
  await deletePostAPI(postId);
  return postId;
});

const postedSlice = createSlice({
  name: 'posted',
  initialState: {
    posts: [],
    loading: false,
    error: '',
    deleting: false,
  },
  extraReducers: builder => {
    builder.addCase(getPostedPosts.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getPostedPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(getPostedPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    builder.addCase(deletePost.pending, (state, action) => {
      state.deleting = true;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter(p => p.postId !== action.payload);
      state.deleting = false;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.deleting = false;
    });
  },
});

export { getPostedPosts, deletePost };
export default postedSlice.reducer;

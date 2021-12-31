import { postCreateMapper } from '../../utils/mappers';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const {
  createPost,
  getMainPosts,
  getPostDetails: getPostDetailsService,
} = require('../../api/post');

const create = createAsyncThunk('post/create', async params => {
  const { post } = params;
  const data = postCreateMapper(post);
  await createPost(data);
});

const getShowcase = createAsyncThunk('post/showcase', async params => {
  const data = await getMainPosts();
  return data;
});

const getPostDetails = createAsyncThunk('post/details', async params => {
  const { postId } = params;
  const res = await getPostDetailsService(postId);
  return res.data;
});

const postSlice = createSlice({
  name: 'post',
  initialState: {
    post: null,
    showcase: {
      for_rent: [],
      for_share: [],
    },
    error: '',
    loading: false,
    deleting: false,
  },
  extraReducers: builder => {
    builder.addCase(create.fulfilled, (state, action) => {
      state.error = '';
      state.loading = false;
      alert('ok');
    });
    builder.addCase(create.pending, (state, action) => {
      state.error = '';
      state.loading = true;
    });
    builder.addCase(create.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    // get main posts
    builder.addCase(getShowcase.fulfilled, (state, action) => {
      state.error = '';
      state.loading = false;
      state.showcase = action.payload;
    });
    builder.addCase(getShowcase.pending, (state, action) => {
      state.error = '';
      state.loading = true;
    });
    builder.addCase(getShowcase.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    // post details
    builder.addCase(getPostDetails.fulfilled, (state, action) => {
      state.post = null;
      state.error = '';
      state.loading = false;
      state.post = action.payload;
    });
    builder.addCase(getPostDetails.pending, (state, action) => {
      state.error = '';
      state.loading = true;
    });
    builder.addCase(getPostDetails.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    //
  },
});

export { create, getShowcase, getPostDetails };
export default postSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLikedPosts as getLikedPostsAPI } from '../../api/post';

// if passing page as a parameter: get liked posts by page and overwrite all posts in the state
// passing 0 when refresh the list
// otherwise get post by next page and concat to the posts state

const getLikedPosts = createAsyncThunk('like/getLiked', async (page, { getState }) => {
  const byPage = typeof page === 'number';
  const state = getState();
  const { data } = await getLikedPostsAPI(byPage ? +page + 1 : state.like.page + 1);
  return { data, mode: byPage ? 'OVERWRITE' : 'CONCAT' };
});

const likeSlice = createSlice({
  name: 'like',
  initialState: {
    posts: [],
    page: 0,
    loading: false,
    error: '',
  },
  reducers: {
    updateLike: (state, action) => {
      const { post, type } = action.payload
      if (type === "liked") {
        state.posts.push(post)
      } else {
        const index = state.posts.findIndex(el => el.postId === post.postId)
        state.posts.splice(index, 1)
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(getLikedPosts.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });

    builder.addCase(getLikedPosts.fulfilled, (state, action) => {
      const { payload } = action;
      state.loading = false;
      if (payload.data.length !== 0) {
        action.payload.mode === 'OVERWRITE'
          ? (state.posts = payload.data)
          : (state.posts = state.posts.concat(payload.data));
        state.page += 1;
      }
    });

    builder.addCase(getLikedPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export { getLikedPosts };
export const { updateLike } = likeSlice.actions
export default likeSlice.reducer;

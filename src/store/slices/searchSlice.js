import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { searchPosts } from '../../api/search';

const search = createAsyncThunk('search/search', async params => {
  // const {keyword, postType, roomType, order, maxArea, minArea, maxPrice, minPrice} = params;
  const { data } = await searchPosts(params);
  return data;
});

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    posts: [],
    loading: false,
    error: '',
  },
  extraReducers: builder => {
    builder.addCase(search.pending, (state, action) => {
      state.error = '';
      state.loading = true;
    });
    builder.addCase(search.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      state.posts = action.payload;
    });
    builder.addCase(search.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export { search };
export default searchSlice.reducer;

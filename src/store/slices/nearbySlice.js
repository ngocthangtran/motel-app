import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNearbyPosts } from '../../api/nearby';

const getNearbyPost = createAsyncThunk('nearby/getNearby', async params => {
  const { lat, lng, radius } = params;
  const { data } = await fetchNearbyPosts({ lat, lng, radius });
  return data;
});

const nearbySlice = createSlice({
  name: 'nearby',
  initialState: {
    posts: [],
    loading: false,
    error: true,
  },
  extraReducers: builder => {
    builder.addCase(getNearbyPost.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getNearbyPost.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.posts = action.payload;
      state.error = '';
    });
    builder.addCase(getNearbyPost.rejected, state => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export { getNearbyPost };
export default nearbySlice.reducer;

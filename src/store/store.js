import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import roleReducer from './slices/roleSlice';
import themeReducer from './slices/themeSlice';
import postReducer from './slices/postSlice';
import forRentReducer from './slices/forRentSlice';
import forShareReducer from './slices/forShareSlice';
import likeReducer from './slices/likeSlice';
import postedReducer from './slices/postedSlice';
import nearbyReducer from './slices/nearbySlice';
import searchReducer from './slices/searchSlice';
import serviceReducer from './slices/serviceSlice';
import apartmentReducer from './slices/apartment';
import roomReducer from './slices/roomSlice';
import tenantReducer from './slices/tenantSlice';
import contractReducer from './slices/contractSlide';

export const store = configureStore({
  reducer: {
    // posts: postsReducer,
    auth: authReducer,
    role: roleReducer,
    theme: themeReducer,
    post: postReducer,
    forRent: forRentReducer,
    forShare: forShareReducer,
    like: likeReducer,
    posted: postedReducer,
    nearby: nearbyReducer,
    search: searchReducer,
    service: serviceReducer,
    apartment: apartmentReducer,
    room: roomReducer,
    tenant: tenantReducer,
    contract: contractReducer,
  },
});

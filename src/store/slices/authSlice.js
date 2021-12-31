import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import authService from '../../api/auth';
import authStorage from '../../utils/authStorage';

const initialState = {
  user: null,
  loading: false,
  error: '',
  token: '',
  restored: false,
};

const login = createAsyncThunk('auth/login', async (params, thunkApi) => {
  const { token: pToken, provider } = params;
  const { token } = await authService.login(pToken, provider); // return user token
  await authStorage.storeToken(token);
  const user = await authStorage.getUser();
  return { user, token };
});

const logout = createAsyncThunk('auth/logout', async () => {
  await authStorage.removeToken();
});

const restoreUser = createAsyncThunk('auth/restore', async () => {
  const user = await authStorage.getUser();
  const token = await authStorage.getToken();
  return { user, token };
});

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.error = '';
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      //
      // error handling
      //
    });
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    // logout function
    builder.addCase(logout.fulfilled, state => {
      // delete apiClient.defaults.headers.common['x-auth-token'];
      return initialState;
    });
    builder.addCase(logout.rejected, () => {
      alert('Loi');
    });
    builder.addCase(logout.pending, () => {});
    // restore user
    builder.addCase(restoreUser.fulfilled, (state, action) => {
      const { token, user } = action.payload;
      state.user = user;
      state.token = token;
      state.restored = true;
    });

    builder.addCase(restoreUser.rejected, () => {});
  },
});

export { login, logout, restoreUser };
export default authSlice.reducer;

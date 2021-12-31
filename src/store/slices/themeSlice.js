const { createSlice } = require('@reduxjs/toolkit');

const themeSlice = createSlice({
  name: 'theme',
  initialState: false,
  reducers: {
    changeTheme: (state, action) => {
      if (typeof action.payload === 'boolean') state = action.payload;
      return state;
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;

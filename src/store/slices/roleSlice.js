const { createSlice } = require('@reduxjs/toolkit');
const ROLES = ['FINDER', 'MANAGER'];

const roleSlice = createSlice({
  name: 'role',
  initialState: 'FINDER',
  reducers: {
    setRole: (state, action) => {
      const role = action.payload;
      if (ROLES.includes(role)) state = role;
      return state;
    },
  },
});

export const { setRole } = roleSlice.actions;
export default roleSlice.reducer;

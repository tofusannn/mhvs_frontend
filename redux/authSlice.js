import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    login: (state, action) => {
      return (state = { ...action.payload });
    },
    register: (state, action) => {
      return (state = { ...action.payload });
    },
    forgotPassword: (state, action) => {
      if (action.payload.password === "") {
        return (state = { ...action.payload });
      } else {
        return (state = { ...action.payload });
      }
    },
    userProfile: (state, action) => {
      return (state = { ...action.payload });
    },
  },
});

export const { login, register, forgotPassword, userProfile } = authSlice.actions;

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  user: JSON.parse(localStorage.getItem("token")),
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      return {
        user: action.payload,
      };
    },
  },
});

export const { loadUser } = authSlice.actions;
export default authSlice.reducer;

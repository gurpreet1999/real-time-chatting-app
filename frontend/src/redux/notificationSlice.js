import { createSlice } from "@reduxjs/toolkit";

let initialState = {
 notification:[]
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return {
        notification: action.payload,
      };
    },
  },
});

export const { setNotification} = notificationSlice.actions;
export default notificationSlice.reducer;

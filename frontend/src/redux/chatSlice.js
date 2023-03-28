import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  chats: [],
  selectedChat: {},
  fetchagain: true,
};

export const fecthChat = createAsyncThunk("chat/fetchChat", async (token) => {
  console.log("hello");
  const { data } = await axios.get("http://localhost:4000/v1/chat/", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
console.log(data)
  return data;
});

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectChat: (state, { payload }) => {
      return {
        ...state,
        selectedChat: payload,
      };
    },
  },

  extraReducers(builder) {
    builder.addCase(fecthChat.fulfilled, (state, { payload }) => {
      return {
        ...state,
        chats: payload,
        
      };
    });
  },
});

export const { selectChat } = chatSlice.actions;

export default chatSlice.reducer;

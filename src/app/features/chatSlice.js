import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  isOnline: true,
};

const chatSlice = createSlice({
  name: "chat",

  initialState,

  reducers: {
    setId: (state, { payload }) => {
      state.id = payload;
    },
  },
});

export const { setId } = chatSlice.actions;

export default chatSlice.reducer;

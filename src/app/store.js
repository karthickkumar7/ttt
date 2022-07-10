import { configureStore } from "@reduxjs/toolkit";

import postSlice from "./features/postSlice";
import chat from "./features/chatSlice";

export default configureStore({
  reducer: {
    posts: postSlice,
    chat,
  },
});

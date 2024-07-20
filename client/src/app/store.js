import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/user/userSlice'
export const store = configureStore({
  reducer: {
    user:userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }),
});

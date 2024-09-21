import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import chatReducer from "../features/chat/chatSlice"; // Import chatSlice
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer, // Add chatSlice to the root reducer
});
const persistConfig = {
  key: "root",
  storage,
  version: 1,
  blacklist: ["chat"], // Don't persist chat slice
};

// Persist only the user slice
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }),
});
export const persistor = persistStore(store);

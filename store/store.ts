import { configureStore } from "@reduxjs/toolkit";
import buttonsReducer from "./buttonsSlice";

export const store = configureStore({
  reducer: {
    buttons: buttonsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import formReducer from "@/store/slices/formSlice";

export const store = configureStore({
  reducer: {
    formBuilder: formReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
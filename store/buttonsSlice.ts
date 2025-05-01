import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { text: "Log in", type: "button", route: "login" },
  { text: "Register", type: "button", route: "register" },
];

const buttonsSlice = createSlice({
  name: "buttons",
  initialState,
  reducers: {},
});

export default buttonsSlice.reducer;

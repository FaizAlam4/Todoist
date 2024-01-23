import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../feature/projectSlice.js";

export const store = configureStore({
  reducer: {
    project: projectReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../feature/projectSlice.js";
import taskReducer from "../feature/taskSlice.js";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    task: taskReducer,
  },
});

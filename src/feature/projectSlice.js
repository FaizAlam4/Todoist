import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  projectData: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    displayProject: (state, action) => {
      return {
        ...state,
        projectData: [...action.payload],
      };
    },
    createProject: (state, action) => {
      return {
        ...state,
        projectData: [...state.projectData, action.payload],
      };
    },
    deleteProject: (state, action) => {
      const updatedData = state.projectData.filter(
        (ele) => ele.id != action.payload
      );
      return {
        ...state,
        projectData: [...updatedData],
      };
    },
  },
});

export const { displayProject, createProject, deleteProject } =
  projectSlice.actions;

export default projectSlice.reducer;

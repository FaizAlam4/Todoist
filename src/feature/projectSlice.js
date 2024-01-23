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
    // deleteProject: (state, action)=>{
    //   return {

    //   }
    // }
  },
});

export const { displayProject, createProject} = projectSlice.actions;

export default projectSlice.reducer;

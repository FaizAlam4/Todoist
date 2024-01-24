import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  projectData: [],
  loading: true,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    displayProject: (state, action) => {
      return {
        ...state,
        projectData: [...action.payload],
        loading: false,
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
    editProject: (state, action) => {
      const { newId, data } = action.payload;
      let newArr = state.projectData.map((ele) => {
        if (ele.id == newId) return data;
        else return ele;
      });
      return {
        ...state,
        projectData: [...newArr],
      };
    },
  },
});

export const { displayProject, createProject, deleteProject, editProject } =
  projectSlice.actions;

export default projectSlice.reducer;

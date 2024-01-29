import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  taskData: {},
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    displayTask: (state, action) => {
      const { id, data } = action.payload;
      return {
        ...state,
        taskData: { ...state.taskData, [id]: data },
      };
    },
    createTask: (state, action) => {
      const { id, data } = action.payload;
      const existingData = Array.isArray(state.taskData[id])
        ? state.taskData[id]
        : [];
      return {
        ...state,
        taskData: { ...state.taskData, [id]: [...existingData, data] },
      };
    },
    deleteTask: (state, action) => {
      const { projectId, taskItemId } = action.payload;
      const updatedData = state.taskData[projectId].filter(
        (ele) => ele.id != taskItemId
      );
      return {
        ...state,
        taskData: { ...state.taskData, [projectId]: [...updatedData] },
      };
    },
    editTask: (state, action) => {
      const { projectId, taskId, taskData } = action.payload;
      let newArr = state.taskData[projectId].map((ele) => {
        if (ele.id == taskId) return taskData;
        else return ele;
      });
      return {
        ...state,
        taskData: { ...state.taskData, [projectId]: [...newArr] },
      };
    },
  },
});

export const { displayTask, createTask, deleteTask, editTask } =
  taskSlice.actions;

export default taskSlice.reducer;

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
      const { id,data } = action.payload;
      return {
        ...state,
        taskData: {...state.taskData, [id]:[...state.taskData[id],data]},
      };
    },
    deleteProject: (state, action) => {
      const updatedData = state.taskData.filter(
        (ele) => ele.id != action.payload
      );
      return {
        ...state,
        taskData: [...updatedData],
      };
    },
    editProject: (state, action) => {
      const { newId, data } = action.payload;
      let newArr = state.taskData.map((ele) => {
        if (ele.id == newId) return data;
        else return ele;
      });
      return {
        ...state,
        taskData: [...newArr],
      };
    },
  },
});

export const { displayTask, createTask, deleteTask, editTask } =
  taskSlice.actions;

export default taskSlice.reducer;

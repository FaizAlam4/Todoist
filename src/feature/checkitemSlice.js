import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  checkItem: {},
};

export const checkitemSlice = createSlice({
  name: "checkitem",
  initialState,
  reducers: {
    showCheckitem: (state, action) => {
      const { checkListId, itemData } = action.payload;
      return {
        ...state,
        checkItem: { ...state.checkItem, [checkListId]: itemData },
      };
    },
    createCheckitem: (state, action) => {
      const { checkListId, itemData } = action.payload;
      return {
        ...state,
        checkItem: {
          ...state.checkItem,
          [checkListId]: [...state.checkItem[checkListId], itemData],
        },
      };
    },
    deleteMyCheckitem: (state, action) => {
      const { checkListId, checkItemId } = action.payload;
      let updatedData = state.checkItem[checkListId].filter(
        (ele) => ele.id != checkItemId
      );
      return {
        ...state,
        checkItem: { ...state.checkItem, [checkListId]: [...updatedData] },
      };
    },
    updateCheckItem: (state, action) => {
      const { checkListId, checkItemId, data } = action.payload;
      let newValue = state.checkItem[checkListId].map((ele) => {
        if (ele.id == checkItemId) return data;
        else return ele;
      });

      return {
        ...state,
        checkItem: {
          ...state.checkItem,
          [checkListId]: [...newValue],
        },
      };
    },
  },
});

export const {
  showCheckitem,
  createCheckitem,
  deleteMyCheckitem,
  updateCheckItem,
} = checkitemSlice.actions;

export default checkitemSlice.reducer;

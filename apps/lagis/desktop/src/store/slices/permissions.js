import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  edit: false,
};

const slice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    storeEdit(state, action) {
      state.edit = action.payload;
      return state;
    },
  },
});

export default slice;

export const { storeEdit } = slice.actions;

export const getPermissionsEdit = (state) => {
  return state.permissions.edit;
};

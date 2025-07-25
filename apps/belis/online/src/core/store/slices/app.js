import { createSlice } from "@reduxjs/toolkit";

export const CONNECTIONMODE = { FROMCACHE: "FROMCACHE", ONLINE: "ONLINE" };

const initialState = {
  connectionMode: CONNECTIONMODE.ONLINE,
  artificialError: false,
  isMobileWarningShown: false,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setConnectionMode: (state, action) => {
      state.connectionMode = action.payload;
    },
    showDialog(state, action) {
      state.dialog = action.payload;
      return state;
    },
    setArtificialError(state, action) {
      state.artificialError = action.payload;
    },
    setIsMobileWarningShown(state, action) {
      state.isMobileWarningShown = action.payload;
    },
  },
});

export default slice;

//actions
export const {
  setConnectionMode,
  showDialog,
  setArtificialError,
  setIsMobileWarningShown,
} = slice.actions;

//selectors
export const getConnectionMode = (state) => state.app.connectionMode;
export const getDialog = (state) => {
  return state.app.dialog;
};
export const getArtificialError = (state) => state.app.artificialError;

export const getIsMobileWarningShown = (state) =>
  state.app.isMobileWarningShown;

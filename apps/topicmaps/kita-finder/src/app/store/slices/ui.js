import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  featureRenderingOption: "KITAS/CONSTS/FEATURE_RENDERING_BY_PROFIL",
};

const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setFeatureRenderingOption(state, action) {
      state.featureRenderingOption = action.payload;
    },
  },
});

export default slice;

export const { setFeatureRenderingOption } = slice.actions;

export const getFeatureRenderingOption = (state) => {
  return state.ui.featureRenderingOption;
};

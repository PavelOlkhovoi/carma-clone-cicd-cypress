import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leafletElement: undefined,
  bbPoly: undefined,
  hoveredProperties: {},
};

const slice = createSlice({
  name: "mapping",
  initialState,
  reducers: {
    setLeafletElement(state, action) {
      state.leafletElement = action.payload;
      return state;
    },
    setBBPoly(state, action) {
      state.bbPoly = action.payload;
      return state;
    },
    setHoveredProperties(state, action) {
      state.hoveredProperties = action.payload;
      return state;
    },
  },
});

export default slice;

export const { setLeafletElement, setBBPoly, setHoveredProperties } =
  slice.actions;

export const getLeafletElement = (state) => {
  return state.mapping.leafletElement;
};

export const getBBPoly = (state) => {
  return state.mapping.bbPoly;
};

export const getHoveredProperties = (state) => {
  return state.mapping.hoveredProperties;
};

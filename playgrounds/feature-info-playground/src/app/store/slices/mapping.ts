import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";

interface MappingState {
  layers: any[];
  gmlOutput: string | null;
  jsonOutput: any;
  oldVariant: string | null;
  layerMode: string;
  vectorStyle?: string;
  vectorOutput?: string;
}

const initialState: MappingState = {
  layers: [],
  gmlOutput: null,
  jsonOutput: null,
  oldVariant: null,
  layerMode: "default",
  vectorOutput: "",
};

const slice = createSlice({
  name: "mapping",
  initialState,
  reducers: {
    setLayers(state, action) {
      state.layers = action.payload;
    },
    setGMLOutput(state, action) {
      state.gmlOutput = action.payload;
    },
    setJSONOutput(state, action) {
      state.jsonOutput = action.payload;
    },
    setOldVariant(state, action) {
      state.oldVariant = action.payload;
    },
    setLayerMode(state, action) {
      state.layerMode = action.payload;
    },
    setVectorStyle(state, action) {
      state.vectorStyle = action.payload;
    },
    setVectorOutput(state, action) {
      state.vectorOutput = action.payload;
    },
  },
});

export default slice;

export const {
  setLayers,
  setGMLOutput,
  setJSONOutput,
  setOldVariant,
  setLayerMode,
  setVectorStyle,
  setVectorOutput,
} = slice.actions;

export const getLayers = (state: RootState) => {
  return state.mapping.layers;
};

export const getGMLOutput = (state: RootState) => {
  return state.mapping.gmlOutput;
};

export const getJSONOutput = (state: RootState) => {
  return state.mapping.jsonOutput;
};

export const getOldVariant = (state: RootState) => {
  return state.mapping.oldVariant;
};

export const getLayerMode = (state: RootState) => {
  return state.mapping.layerMode;
};

export const getVectorStyle = (state: RootState) => {
  return state.mapping.vectorStyle;
};

export const getVectorOutput = (state: RootState) => {
  return state.mapping.vectorOutput;
};

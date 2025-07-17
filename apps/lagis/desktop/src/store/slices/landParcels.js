import { createSlice } from "@reduxjs/toolkit";
import { fetchGraphQL } from "../../core/graphql";
import queries from "../../core/queries/online";
const initialState = {
  landParcels: undefined,
  landmarks: undefined,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "landParcels",
  initialState,
  reducers: {
    fetchLandParcelsStart: (state) => {
      state.loading = true;
    },
    storeLandParcels(state, action) {
      state.landParcels = action.payload;
      state.loading = false;
      state.error = null;
      return state;
    },
    fetchLandParcelsFailure(state, action) {
      state.landParcels = null;
      state.loading = false;
      state.error = action.payload;
      return state;
    },
    storeLandmarks(state, action) {
      state.landmarks = action.payload;
      state.loading = false;
      state.error = null;
      return state;
    },
    fetchLandLandmarksFailure(state, action) {
      state.landParcels = null;
      state.loading = false;
      state.error = action.payload;
      return state;
    },
  },
});

export default slice;
export const getGemarkungen = (navigate) => {
  return async (dispatch, getState) => {
    const jwt = getState().auth.jwt;
    if (jwt) {
      // dispatch(fetchLandParcelsStart());
      const result = await fetchGraphQL(queries.gemarkung, {}, jwt);
      if (result.status === 401) {
        return navigate("/login");
      }
      if (result.data?.gemarkung) {
        dispatch(storeLandmarks(result.data.gemarkung));
      } else {
        dispatch(fetchLandLandmarksFailure("error message"));
      }
    }
  };
};
export const getflurstuecke = (navigate) => {
  return async (dispatch, getState) => {
    const jwt = getState().auth.jwt;
    if (jwt) {
      // dispatch(fetchLandParcelsStart());
      try {
        const result = await fetchGraphQL(queries.flurstuecke, {}, jwt);
        if (result.status === 401) {
          navigate("/login");
        }
        if (result.data?.view_flurstueck_schluessel) {
          dispatch(storeLandParcels(result.data.view_flurstueck_schluessel));
        } else {
          dispatch(fetchLandParcelsFailure(result.status));
        }
      } catch (e) {
        console.log("xxx error in fetchGraphQL(queries.flurstuecke", e);
      }
    }
  };
};
export const {
  storeLandParcels,
  storeLandmarks,
  fetchLandParcelsStart,
  fetchLandParcelsFailure,
  fetchLandLandmarksFailure,
} = slice.actions;

export const getLandParcels = (state) => {
  return state.landParcels;
};
export const getLandmarks = (state) => {
  return state.landParcels;
};
export const getLandmarksLoading = (state) => {
  return state.landParcels.loading;
};

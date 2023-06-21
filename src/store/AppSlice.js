import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    currentLocation: null,
    locations: [],
    weatherUpdates: null,
  },
  reducers: {
    saveCurrentLocation(state, action) {
      state.currentLocation = action.payload;
    },
    saveLocations(state, action) {
      const { payload } = action;
      state.locations = [...state.locations, payload];
    },
    saveWeatherUpdates(state, action) {
      state.weatherUpdates = action.payload;
    },
    deleteLocation(state, action) {
      const { payload } = action;
      state.locations.splice(payload, 1);
    },
  },
});

export const {
  saveCurrentLocation,
  saveLocations,
  saveWeatherUpdates,
  deleteLocation,
} = appSlice.actions;

export default appSlice.reducer;

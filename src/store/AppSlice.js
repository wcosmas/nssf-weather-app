import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'auth',
  initialState: {
    currentLocation: null,
    locations: null,
    weatherUpdates: null,
  },
  reducers: {
    saveCurrentLocation(state, action) {
      state.currentLocation = action.payload;
    },
    saveLocations(state, action) {
      state.locations = action.payload;
    },
    saveWeatherUpdates(state, action) {
      state.weatherUpdates = action.payload;
    },
  },
});

export const {
  saveCurrentLocation,
  saveLocations,
  saveWeatherUpdates,
} = appSlice.actions;

export default appSlice.reducer;

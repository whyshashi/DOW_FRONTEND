import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: { date: "2025" },
  incidentData: [], // Stores fetched incidents
};

const incidentSlice = createSlice({
  name: "incident",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters.date = action.payload; // Update selected year
    },
    storeIncidentData: (state, action) => {
      state.incidentData = action.payload; // Store fetched incident data
    },
  },
});

// Export actions
export const { setFilters, storeIncidentData } = incidentSlice.actions;
export default incidentSlice.reducer;

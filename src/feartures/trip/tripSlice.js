import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";
import API from "../../api/apiConfig";

// Async thunks
export const listTrip = createAsyncThunk(
  "trip/listTrip",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(API.TRIP, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get blog by ID
export const getTripById = createAsyncThunk(
  "trip/getTripById",
  async (tripId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(API.TRIP_BY_ID, {
        params: { TripId : tripId },
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



const tripSlice = createSlice({
  name: "TRIP",
  initialState: {
    trips: [],
    selectedTrip: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listTrip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listTrip.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = action.payload?.response || [];
      })
      .addCase(listTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch accounts";
      })

      .addCase(getTripById.fulfilled, (state, action) => {
        state.selectedTrip = action.payload?.response || [];
        state.loading = false;
      })

    
  },
});

export default tripSlice;

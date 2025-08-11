import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";
import API from "../../api/apiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Async thunks
export const listTrip = createAsyncThunk(
  "trip/listTrip",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await apiClient.get(API.TRIP, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get trip by ID
export const getTripById = createAsyncThunk(
  "trip/getTripById",
  async (tripId, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await apiClient.get(API.TRIP_BY_ID, {
        params: { TripId: tripId },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// create trip
export const createTrip = createAsyncThunk(
  "trip/createTrip",
  async (tripData, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await apiClient.post(API.CREATE_TRIP, tripData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// create trip schedule
export const createTripSchedule = createAsyncThunk(
  "trip/createTripSchedule",
  async (tripScheduleData, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await apiClient.post(
        API.CREATE_TRIP_SCHEDULE,
        tripScheduleData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get trip schedule by trip id
export const getTripScheduleByTripId = createAsyncThunk(
  "trip/getTripScheduleByTripId",
  async (tripId, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await apiClient.get(API.GET_TRIP_SCHEDULE_BY_TRIPID, {
        params: { TripId: tripId },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// create trip schedule with  AI
export const createTripScheduleAI = createAsyncThunk(
  "trip/createTripScheduleAI",
  async (tripScheduleAiData, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await apiClient.post(
        API.CREATE_TRIP_SCHEDULE_AI,
        tripScheduleAiData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
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
    tripSchedules: [],
    tripSchedulesWithAI: [],
    selectedTrip: [],
    selectedTripSchedule: [],
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

      // create trip
      .addCase(createTrip.fulfilled, (state, action) => {
        state.trips.push(action.payload);
      })

      // create trip schedule
      .addCase(createTripSchedule.fulfilled, (state, action) => {
        state.tripSchedules.push(action.payload);
      })

      .addCase(getTripScheduleByTripId.fulfilled, (state, action) => {
        state.selectedTripSchedule = action.payload?.response || [];
        state.loading = false;
      })

      // create trip schedule AI
      .addCase(createTripScheduleAI.fulfilled, (state, action) => {
        state.tripSchedulesWithAI.push(action.payload);
      });
  },
});

export default tripSlice;

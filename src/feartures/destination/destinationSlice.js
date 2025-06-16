import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";
import API from "../../api/apiConfig";

// Async thunks
export const listDestination = createAsyncThunk(
  "destination/listDestination",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(API.DESTINATION, {
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
export const getDestinationById = createAsyncThunk(
  "destination/getDestinationById",
  async (destinationId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(API.DESTINATION_BY_ID, {
        params: { DestinationId: destinationId },
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

// create destination
export const createDestination = createAsyncThunk(
  "destination/createDestination",
  async (destinationData, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(
        API.CREATE_DESTINATION,
        destinationData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// update Destination
export const updateDestination = createAsyncThunk(
  "destination/updateDestination",
  async (destinationId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(API.UPDATE_DESTINATION, {
        params: { DestinationId: destinationId },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const destinationSlice = createSlice({
  name: "DESTINATION",
  initialState: {
    destinations: [],
    selectedDestination: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listDestination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listDestination.fulfilled, (state, action) => {
        state.loading = false;
        state.destinations = action.payload?.response || [];
      })
      .addCase(listDestination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch accounts";
      })

      .addCase(getDestinationById.fulfilled, (state, action) => {
        state.selectedDestination = action.payload?.response || [];
        state.loading = false;
      })

    //   create destination
    .addCase(createDestination.fulfilled,  (state, action) => {
        state.destinations.push(action.payload);
    })

    //   update destination
    .addCase(updateDestination.fulfilled, (state, action) => {
        state.destinations = state.destinations.map((destination) =>
            destination.DestinationId  === action.payload.DestinationId  ? action.payload : destination
        );
    })
  },
});

export default destinationSlice;

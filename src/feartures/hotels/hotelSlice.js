import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";
import API from "../../api/apiConfig";

// Async thunks
export const listHotel = createAsyncThunk(
  "hotel/listHotel",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(API.HOTEL, {
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

// get attraction by ID
export const getHotelById = createAsyncThunk(
  "hotel/getHotelById",
  async (hotelId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(API.HOTEL_BY_ID, {
        params: { HotelId: hotelId },
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

const hotelSlice = createSlice({
  name: "HOTEL",
  initialState: {
    hotels: [],
    selectedHotel: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload?.response || [];
      })
      .addCase(listHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch accounts";
      })

      .addCase(getHotelById.fulfilled, (state, action) => {
        state.selectedHotel = action.payload?.response || [];
        state.loading = false;
      });
  },
});

export default hotelSlice;

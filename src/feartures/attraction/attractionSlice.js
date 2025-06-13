import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";
import API from "../../api/apiConfig";

// Async thunks
export const listAttraction = createAsyncThunk(
  "attraction/listAttraction",
  async (searchPayload, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(API.ATTRACTION, {
        params: searchPayload,
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



const attractionSlice = createSlice({
  name: "ATTRACTION",
  initialState: {
    attractions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listAttraction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listAttraction.fulfilled, (state, action) => {
        state.loading = false;
        state.attractions = action.payload;
      })
      .addCase(listAttraction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch accounts";
      })

      
  },
});

export default attractionSlice;

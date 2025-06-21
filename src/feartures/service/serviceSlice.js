import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";
import API from "../../api/apiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

// get trip by ID
export const getServiceByType = createAsyncThunk(
  "service/getServiceByType",
  async (serviceId, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await apiClient.get(API.SERVICE, {
        params: { ServiceType: serviceId },
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

const serviceSlice = createSlice({
  name: "SERVICE",
  initialState: {
    services: [],
    selectedService: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getServiceByType.fulfilled, (state, action) => {
      state.selectedService = action.payload?.response || [];
      state.loading = false;
    });
  },
});

export default serviceSlice;

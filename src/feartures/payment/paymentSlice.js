import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";
import API from "../../api/apiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Async thunks

// create trip
export const createPayment = createAsyncThunk(
  "payment/createPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await apiClient.post(API.PAYMENT, paymentData, {
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

const paymentSlice = createSlice({
  name: "PAYMENT",
  initialState: {
    payments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create trip
      .addCase(createPayment.fulfilled, (state, action) => {
        state.payments.push(action.payload);
      });
  },
});

export default paymentSlice;

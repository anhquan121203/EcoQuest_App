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

// callback payment
export const paymentCallBack = createAsyncThunk(
  "payment/paymentCallBack",
  async ({ tripId, code, cancel }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const payload = {
        tripId,
        code,
        cancel,
      };
      const response = await apiClient.post(API.PAYMENT_CALLBACK, payload, {
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

// history payment
export const paymentHistory = createAsyncThunk(
  "payment/paymentHistory",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await apiClient.get(API.PAYMENT_HISTORY, {
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

// payment premier
export const paymentPremier = createAsyncThunk(
  "payment/paymentPremier",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await apiClient.post(
        API.PAYMENT_PREMIER,
        {},
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

export const paymentPremierCallback = createAsyncThunk(
  "payment/paymentPremierCallback",
  async ({ tripId, code, cancel }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const payloadData = {
        tripId,
        code,
        cancel,
      };
      const response = await apiClient.post(
        API.PAYEMNT_PREMIER_CALLBACK,
        payloadData,
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

const paymentSlice = createSlice({
  name: "PAYMENT",
  initialState: {
    payments: [],
    paymentCallback: {},
    premier: null,
    premierCallback: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create trip
      .addCase(createPayment.fulfilled, (state, action) => {
        state.payments.push(action.payload);
      })

      // paymentCallBack
      .addCase(paymentCallBack.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(paymentCallBack.fulfilled, (state, action) => {
        state.loading = false;
        // Nếu cần cập nhật trạng thái thanh toán trong payments
        const index = state.paymentCallback.findIndex(
          (p) => p.tripId === action.payload.tripId
        );
        if (index !== -1) {
          state.paymentCallback[index] = {
            ...state.paymentCallback[index],
            ...action.payload,
          };
        }
      })
      .addCase(paymentCallBack.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // paymentHistory
      .addCase(paymentHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(paymentHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload.response || [];
      })

      .addCase(paymentHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create payment premier
      .addCase(paymentPremier.fulfilled, (state, action) => {
        state.premier = action.payload;
      })

      .addCase(paymentPremierCallback.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.premierCallback.findIndex(
          (p) => p.tripId === action.payload.tripId
        );
        if (index !== -1) {
          state.premierCallback[index] = {
            ...state.premierCallback[index],
            ...action.payload,
          };
        } else {
          state.premierCallback.push(action.payload);
        }
      });
  },
});

export default paymentSlice;

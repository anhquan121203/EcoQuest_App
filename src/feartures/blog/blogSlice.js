import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";
import API from "../../api/apiConfig";

// Async thunks
export const listBlog = createAsyncThunk(
  "blog/listBlog",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(API.BLOG, {
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
export const getBlogById = createAsyncThunk(
  "blog/getBlogById",
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(API.BLOG_BY_ID, {
        params: { BlogId : blogId },
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

const blogSlice = createSlice({
  name: "BLOG",
  initialState: {
    blogs: [],
    selectedBlog: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload?.response || [];
      })
      .addCase(listBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch accounts";
      })

      .addCase(getBlogById.fulfilled, (state, action) => {
        state.selectedBlog = action.payload?.response || [];
        state.loading = false;
      });
  },
});

export default blogSlice;

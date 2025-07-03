import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/apiClient";
import API from "../../api/apiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Async thunks
export const listCommentByBlog = createAsyncThunk(
  "comment/listCommentByBlog",
  async (blogId, { rejectWithValue }) => {
    try {
      // const token = await AsyncStorage.setItem("access_token");
      const response = await apiClient.get(API.COMMENT, {
        params: { BlogId: blogId },
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// create blog
export const createComment = createAsyncThunk(
  "blog/createBlog",
  async (commentData, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await apiClient.post(API.CREATE_COMMENT, commentData, {
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

const commentSlice = createSlice({
  name: "COMMENT",
  initialState: {
    comments: [],
    selectedComment: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listCommentByBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listCommentByBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedComment = action.payload?.response || [];
      })
      .addCase(listCommentByBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch accounts";
      })

      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      });
  },
});

export default commentSlice;

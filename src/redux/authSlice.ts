import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicAxios } from "../utils/axiosClient";
import { apiSlice } from "./apiSlice";

interface AuthState {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const fetchUserDetails = createAsyncThunk(
  "auth/fetchUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicAxios.get("/users/profile-details", {
        withCredentials: true,
      });
      //   console.log(response.data.user);
      return response.data.user;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.error || error.response.data
        );
      } else {
        return rejectWithValue("An unknown error occurred!");
      }
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await publicAxios.post("/auth/login", credentials, {
        withCredentials: true,
      });
      console.log(response.data.user);
      return response.data.user;
    } catch (error: any) {
      if (error.response && error.response.data) {
        // console.log(error.response.data.error);

        return rejectWithValue(
          error.response.data.error || error.response.data
        );
      } else {
        return rejectWithValue("An unknown error occurred!");
      }
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await publicAxios.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(apiSlice.util.invalidateTags(["Cart"]));
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.error || error.response.data
        );
      } else {
        return rejectWithValue("An unknown error occurred!");
      }
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(fetchUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default authSlice.reducer;

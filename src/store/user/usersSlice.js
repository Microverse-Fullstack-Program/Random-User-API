import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchUsers = createAsyncThunk('store/fetchUsers', async (thunkAPI) => {
  try {
    const res = await axios.get('https://randomuser.me/api/?results=500');
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue({ error: err.message })
  }
});

const initialState = {
    users:[],
    isLoading:false,
    error: null,
  };

  export const usersSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder) => {
      builder.addCase(FetchUsers.pending, (state) => ({
        ...state,
        isLoading: true,
      }));
      builder.addCase(FetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
        state.error = null;
      });
      builder.addCase(FetchUsers.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        users: [],
        error: action.error.message,
      }));
    },
  });

export default usersSlice.reducer;

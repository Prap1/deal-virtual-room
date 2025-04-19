import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../api/AxiosInstance';

// Async Thunks
export const fetchDeals = createAsyncThunk('deal/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get('/deal/getdeal');
    // Ensure the response data is properly parsed if it's a stringified array
    const deals = JSON.parse(res.data.deals); // Assuming `deals` is a stringified JSON array
    return deals;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});



export const createdeal = createAsyncThunk('deal/create', async ({ title, description, price, sellerId, token }, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}` // Add the token in the Authorization header
        }
      };
      const res = await axiosInstance.post('/deal/createdeal', { title, description, price, sellerId }, config);
      return res.data.deal;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  });
  
export const updateDealStatus = createAsyncThunk('deal/updateStatus', async ({ dealId, status }, thunkAPI) => {
  try {
    const res = await axiosInstance.put(`/deal/${dealId}/status`, { status });
    return res.data.deal;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const fetchDealById = createAsyncThunk('deal/fetchById', async (dealId, thunkAPI) => {
  try {
    const res = await axiosInstance.get(`/deal/${dealId}`);
    return res.data.deal;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// Initial State
const initialState = {
  deals: [],
  currentDeal: null,
  loading: false,
  error: null,
};

// Deal Slice
const dealSlice = createSlice({
  name: "deal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Deals
      .addCase(fetchDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = action.payload;
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Deal
      .addCase(createdeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createdeal.fulfilled, (state, action) => {
        state.loading = false;
        state.deals.push(action.payload);
      })
      .addCase(createdeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Deal Status
      .addCase(updateDealStatus.fulfilled, (state, action) => {
        const index = state.deals.findIndex(deal => deal._id === action.payload._id);
        if (index !== -1) state.deals[index] = action.payload;
      })
      .addCase(updateDealStatus.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Fetch Deal by ID
      .addCase(fetchDealById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDealById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDeal = action.payload;
      })
      .addCase(fetchDealById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dealSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  areLoading: true,
  hasError: false,
  allBusiness: [],
  businessId: 0
};

export const fetchBusiness = createAsyncThunk(
  "fetchBusiness",
  async () => {
    const data = await axios.get(`http://localhost:5001/api/business`)
      .then(data => data.data)
      .catch(err => console.log(err));
    return data;
  }
);

export const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    updateBusinessId: (state, action) => { state.businessId = action.payload },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBusiness.fulfilled, (state, action) => {
      state.allBusiness = action.payload
      state.areLoading = false;
    });

    builder.addCase(fetchBusiness.rejected, (state) => {
      state.hasError = true;
    });
  },
});


export const getBusinessById = (store, id) =>
  store.businessReducer.allBusiness.find(b => b.id == id);

export const { updateBusinessId } = businessSlice.actions;
export default businessSlice.reducer;

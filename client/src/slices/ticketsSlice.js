import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = { areLoading: true, hasError: false, tickets: [] };

export const fetchData = createAsyncThunk(
    "fetchData",
    async () => {
        const data = await axios.get(`http://localhost:5001/api/tickets`)
            .then(data => data.data)
            .catch(err=>console.log(err));
        //console.log('Data in fetchData in ticketsSlice.js : ',data);
        return data; 
    }
);

export const ticketsSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        ticketsAreLoading: (state, action) =>{(state.areLoading = action.payload)},
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.tickets = action.payload
            state.areLoading = false;
        });

        builder.addCase(fetchData.rejected, (state) => {
            state.hasError = true;
        });
    },
});

console.log('ticketsSlice in ticketsSlice.js: ', ticketsSlice);

export const { ticketsAreLoading } = ticketsSlice.actions;
export default ticketsSlice.reducer;

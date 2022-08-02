import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    areLoading: true,
    hasError: false,
    allTickets: [],
    calledTicketId: 0
};

export const fetchTickets = createAsyncThunk(
    "fetchTickets",
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
        ticketsAreLoading: (state, action) => { state.areLoading = action.payload },
        updateCalledTicketId: (state, action) => { state.calledTicketId = action.payload },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTickets.fulfilled, (state, action) => {
            state.allTickets = action.payload
            state.areLoading = false;
        });

        builder.addCase(fetchTickets.rejected, (state) => {
            state.hasError = true;
        });
    },
});

console.log('ticketsSlice in ticketsSlice.js: ', ticketsSlice);
//console.log('state.allTickets in ticketsSlice.js: ', state.allTickets);

export const getTicketsForOneBiz = (store, id) =>
    store.ticketsReducer.allTickets.filter(t => t.status == 'waiting' && t.resId == id)

export const getTicketById = (store, id) =>
    store.ticketsReducer.allTickets.find(t => t.ticketId == id);
    

export const { ticketsAreLoading, updateCalledTicketId } = ticketsSlice.actions;
export default ticketsSlice.reducer;

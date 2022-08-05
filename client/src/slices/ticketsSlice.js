import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    areLoading: true,
    error: null,
    allTickets: [],
    ticketsUpdateFlag: true
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

export const changeStatus = createAsyncThunk(
    "changeStatus",
    async (data) => {
        const { id, status } = data;
        await axios.put(`/api/tickets/${id}`, { status })
            .catch(err => console.log(err)); 
    }
);

export const createTicket = createAsyncThunk(
    "createTicket",
    async (detail) => {
        const data = await axios.post(`http://localhost:5001/api/tickets`, detail)
            .then(data => data.data)
            .catch(err => console.log(err));
        //console.log('Data in fetchData in ticketsSlice.js : ',data);
        return data;
    }
);

export const ticketsSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        ticketsAreLoading: (state, action) => { state.areLoading = action.payload },
        updateTickets: (state) => {
            state.ticketsUpdateFlag = !state.ticketsUpdateFlag
            console.log(state.ticketsUpdateFlag, 'Flag in ticketsSlice updateTickets!!!')
        },
        showFlag: (state) => { console.log(state.ticketsUpdateFlag, 'Flag in ticketsSlice!!') }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTickets.fulfilled, (state, action) => {
            state.allTickets = action.payload
            state.areLoading = false;
            console.log('fetchTickets  in t is working');
        });
        builder.addCase(fetchTickets.rejected, (state,action) => {
            state.error = action.error;
        });
        builder.addCase(changeStatus.fulfilled, (state) => {
            state.ticketsUpdateFlag = !state.ticketsUpdateFlag
            console.log(state.ticketsUpdateFlag, 'Flag in ticketsSlice changeStatus!!!')
        });
        builder.addCase(changeStatus.rejected, (state, action) => {
            state.error = action.error;
        });
        builder.addCase(createTicket.fulfilled, (state, action) => {
            state.ticketsUpdateFlag = !state.ticketsUpdateFlag
            state.allTickets.push(action.payload) 
            console.log(state.ticketsUpdateFlag, 'Flag in ticketsSlice createTicket!!!')
            
        });
        builder.addCase(createTicket.rejected, (state, action) => {
            state.error = action.error;
        });
    },
});

console.log('ticketsSlice in ticketsSlice.js: ', ticketsSlice);

//console.log('state.allTickets in ticketsSlice.js: ', state.allTickets);

export const getTicketsForOneBiz = (store, id) =>{
    //console.log(store.ticketsReducer.allTickets.filter(t => t.resId == id), 'tickets in getTicketsForOneBiz');
    return store.ticketsReducer.allTickets.filter(t => t.resId == id)
}


    
export const { ticketsAreLoading, updateTickets, showFlag } = ticketsSlice.actions;
export default ticketsSlice.reducer;

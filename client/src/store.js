import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from "./slices/ticketsSlice";
import businessReducer from "./slices/businessSlice";

const store = configureStore({
    reducer: {
        ticketsReducer,
        businessReducer
    },
});
export default store

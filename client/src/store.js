import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from "./slices/ticketsSlice";

const store = configureStore({
    reducer: {
        ticketsReducer
    },
});
export default store

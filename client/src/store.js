import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from "./slices/ticketsSlice";
import businessReducer from "./slices/businessSlice";
import { createStateSyncMiddleware, initStateWithPrevTab } from "redux-state-sync";

const store = configureStore({
    reducer: {
        ticketsReducer,
        businessReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createStateSyncMiddleware({})),
});

initStateWithPrevTab(store);
export default store

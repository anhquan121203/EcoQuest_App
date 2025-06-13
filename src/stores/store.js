import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../feartures/auth/authSlice";
import attractionSlice from "../feartures/attraction/attractionSlice";

export const store = configureStore({
    reducer: {
        // Add your reducers here
        auth: authSlice.reducer,
        attraction: attractionSlice.reducer, 
    },
    
})
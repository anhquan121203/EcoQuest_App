import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../feartures/auth/authSlice";
import attractionSlice from "../feartures/attraction/attractionSlice";
import hotelSlice from "../feartures/hotels/hotelSlice";
import blogSlice from "../feartures/blog/blogSlice";
import destinationSlice from "../feartures/destination/destinationSlice";
import tripSlice from "../feartures/trip/tripSlice";
import paymentSlice from "../feartures/payment/paymentSlice";
import serviceSlice from "../feartures/service/serviceSlice";
import commentSlice from "../feartures/comment/commentSlice";

export const store = configureStore({
    reducer: {
        // Add your reducers here
        auth: authSlice.reducer,
        attraction: attractionSlice.reducer, 
        hotel: hotelSlice.reducer,
        blog: blogSlice.reducer,
        destination: destinationSlice.reducer,
        trip: tripSlice.reducer,
        payment: paymentSlice.reducer,
        service: serviceSlice.reducer,
        comment: commentSlice.reducer,
    },
    
})
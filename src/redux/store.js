import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import blogReducer from './blogSlice';
import dashboardReducer from './dashboardSlice';
import feedbackReducer from './feedbackSlice';
import progressReducer from "./progressSlice";
import userReducer from './userSlice';
import videoReducer from './videoSlice';
import categoryReducer from './categorySlice';
import attendanceReducer from "./attendanceSlice";
import paymentReducer from "./paymentSlice";

//USE TOOLKIT
const rootReducer = {
    reducer: {
        progress: progressReducer,
        blog: blogReducer,
        auth: authReducer,
        video: videoReducer,
        dashboard: dashboardReducer,
        user: userReducer,
        feedback: feedbackReducer,
        category: categoryReducer,
        attendance: attendanceReducer,
        payment: paymentReducer
    },
};

export const store = configureStore(rootReducer);

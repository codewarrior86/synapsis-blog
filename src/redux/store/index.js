import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/users/userSlice";
import logger from 'redux-logger'
import thunk from 'redux-thunk';

const store = configureStore({
    reducer: {
        user: userSlice.reducer
    },
    // middleware: (getDefaultMiddleware) => [
    //     ...getDefaultMiddleware(),
    //     mainMiddleware,
    // ],
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),


    devTools: process.env.NODE_ENV !== 'PRODUCTION',
})


export default store;
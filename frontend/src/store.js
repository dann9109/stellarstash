import {configureStore} from '@reduxjs/toolkit';
import {apiSlice} from './slices/apiSlice';
import { cartSliceReducer} from './slices/cartSlice';
import { get } from 'mongoose';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});


export default store;
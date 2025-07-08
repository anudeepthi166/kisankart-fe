import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import addressReducer from './addressSlice'

export const store = configureStore({
    reducer: 
    {
        product: productReducer,
        address: addressReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
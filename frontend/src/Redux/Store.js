
import {configureStore} from '@reduxjs/toolkit'
import userReducer from './Reducer/UserSlice'

export const Store=configureStore({

    reducer:{

        user:userReducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false,
    })
})
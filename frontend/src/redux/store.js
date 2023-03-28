import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import chatReducer from './chatSlice'
import notificationReducer from './notificationSlice'


const store=configureStore({
    reducer:{
        user:authReducer,
        mychat:chatReducer,
        notification:notificationReducer
    }
})


export default store
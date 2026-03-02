import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './slices/taskSlice'
import themeReducer from './slices/themeSlice'

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        theme: themeReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
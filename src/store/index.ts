import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './slices/taskSlice'
import themeReducer from './slices/themeSlice'
import analyticReducer from './slices/analyticSlice'

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        theme: themeReducer,
        analytics: analyticReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
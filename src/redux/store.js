import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "./taskSlice";

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
    },
})


window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()


import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "./taskSlice";
import projectReducer from "./projectSlice"

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        projects: projectReducer,
    },
})


window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()


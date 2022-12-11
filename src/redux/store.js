import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "./taskSlice";
import projectReducer from "./projectSlice"
import currentReducer from "./currentSlice"

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        projects: projectReducer,
        current: currentReducer,
    },
})


window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()


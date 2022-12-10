import { configureStore } from '@reduxjs/toolkit'
import taskReducer from "./taskSlice";
import projectReducer from "./projectSlice"
import currentTaskReducer from "./currentTaskSlice"

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        projects: projectReducer,
        currentTask: currentTaskReducer
    },
})


window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()


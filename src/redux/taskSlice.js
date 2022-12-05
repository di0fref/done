import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {tasksAll, taskUpdate} from "../service/api";
import {apiConfig} from "../service/config";
import http from "../service/http-common";

const initialState = []

export const getTasks = createAsyncThunk(
    'tasks/getTasks',
    async (thunkAPI) => {
        const showCompleted = localStorage.getItem("showCompletedTasks")
        return await tasksAll(showCompleted)
    }
)

export const addTask = createAsyncThunk(
    'tasks/addTask',
    async (task, thunkAPI) => {
        return await taskUpdate(task)
    }
)

export const toggleCompleted = createAsyncThunk(
    'tasks/toggleCompleted',
    async (task, thunkAPI) => {
        return await http.put(apiConfig.url + "/tasks/" + task.id, {
            completed: task.completed ? 0 : 1
        }).then(response => response.data)
    }
)

export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async (task, thunkAPI) => {
        return await http.put(apiConfig.url + "/tasks/" + task.id, task).then(response => response.data)
    }
)


export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        add: (state) => {
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.fulfilled, (state, action) => {
                return action.payload
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.unshift(action.payload)
            })
            .addCase(toggleCompleted.fulfilled, (state, action) => {
                const task = Object.values(state).find(task => task.id == action.payload.id)
                task.completed = action.payload.completed
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.findIndex(tutorial => tutorial.id === action.payload.id);
                state[index] = {
                    ...state[index],
                    ...action.payload,
                };
            })
    }
})

export default taskSlice.reducer

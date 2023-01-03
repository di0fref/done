import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {taskCreate, tasksAll, taskUpdate} from "../service/api";
import {apiConfig} from "../service/config";
import http from "../service/http-common";
import {currentTaskSlice} from "./currentSlice";

const initialState = []



export const getTasks = createAsyncThunk(
    'tasks/getTasks',
    async (thunkAPI) => {
        return await http.get(apiConfig.url + "/tasks").then(response => response.data)
    }
)

export const addTask = createAsyncThunk(
    'tasks/addTask',
    async (task) => {
        return await taskCreate(task)
    }
)

export const toggleCompleted = createAsyncThunk(
    'tasks/toggleCompleted',
    async (task, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try {
            const response = await http.put(apiConfig.url + "/tasks/" + task.id, {
                completed: task.completed ? 0 : 1
            })
            if (response.error) {
                return rejectWithValue(response.status)
            }
            return fulfillWithValue(response.data)
        } catch (error) {
            throw rejectWithValue(error.message)
        }
    }
)

export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async (task, thunkAPI) => {
        return await http.put(apiConfig.url + "/tasks/" + task.id, task).then(response => response.data)
    }
)


export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (task, thunkAPI) => {
        return await http.delete(apiConfig.url + "/tasks/" + task.id).then(response => response.data)
    }
)


export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTaskFromSocket: (state, action) => {
           return [...state, action.payload]
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
                const task = Object.values(state).find(task => task.id === action.payload.id)
                task.completed = action.payload.completed
            })
            .addCase(toggleCompleted.rejected, (state, action) => {
                const {requestId} = action.meta
                if (
                    state.loading === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                    state.loading = 'idle'
                    state.error = action
                    state.currentRequestId = undefined
                }
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.findIndex(task => task.id === action.payload.id);
                state[index] = {
                    ...state[index],
                    ...action.payload,
                };
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                const index = state.findIndex(task => task.id === action.payload.id);
                state.splice(index, 1)
            })
    }
})
export const {addTaskFromSocket} = taskSlice.actions
export default taskSlice.reducer

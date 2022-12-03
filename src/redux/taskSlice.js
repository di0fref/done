import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {allTasks, createTask} from "../service/api";

const initialState = []

export const getTasks = createAsyncThunk(
    'tasks/getTasks',
    async (thunkAPI) => {
        return await allTasks()
    }
)
export const addTask = createAsyncThunk(
    'tasks/addTask',
    async (task, thunkAPI) => {
        return await createTask(task)
    }
)
export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        add: (state) => {},
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.fulfilled, (state, action) => {
                return action.payload
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.unshift(action.payload)
            })
    }
})

export default taskSlice.reducer

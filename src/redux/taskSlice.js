import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {all} from "../service/api";

const initialState = []

export const getTasks = createAsyncThunk(
    'tasks/getTasks',
    async (folderId = 0, thunkAPI) => {
        return await all()
    }
)

export const taskSlice = createSlice({
    name: 'counter',
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
    }
})

// Action creators are generated for each case reducer function
export const {add} = taskSlice.actions

export default taskSlice.reducer

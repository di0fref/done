import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {allProjects, createProject} from "../service/api";

const initialState = []

export const getProjects = createAsyncThunk(
    'project/getProjects',
    async (thunkAPI) => {
        return await allProjects()
    }
)
export const addProject = createAsyncThunk(
    'project/addProject',
    async (project, thunkAPI) => {
        return await createProject(project)
    }
)
export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        add: (state) => {},
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProjects.fulfilled, (state, action) => {
                return action.payload
            })
            .addCase(addProject.fulfilled, (state, action) => {
                state.unshift(action.payload)
            })
    }
})

export default projectSlice.reducer

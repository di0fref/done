import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {allProjects, createProject} from "../service/api";
import {apiConfig} from "../service/config";
import http from "../service/http-common";

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

export const updateProject = createAsyncThunk(
    'project/updateProject',
    async (project, thunkAPI) => {
        return await http.put(apiConfig.url + "/projects/" + project.id, project).then(response => response.data)
    }
)
export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        add: (state) => {
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProjects.fulfilled, (state, action) => {
                return action.payload
            })
            .addCase(addProject.fulfilled, (state, action) => {
                state.unshift(action.payload)
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                const index = state.findIndex(project => project.id === action.payload.id);
                state[index] = {
                    ...state[index],
                    ...action.payload,
                };

                console.log(state[index]);
            })
    }
})

export default projectSlice.reducer

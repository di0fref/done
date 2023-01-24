import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {arrayMoveImmutable} from "array-move";

const initialState = null

export const getProjects = createAsyncThunk(
    'project/getProjects',
    async (thunkAPI) => {
        return await axios.get("/projects").then(response => response.data)
    }
)
export const addProject = createAsyncThunk(
    'project/addProject',
    async (project, thunkAPI) => {
        console.log(project)
        return await axios.post("/projects", project).then(response => response.data)
    }
)

export const updateProject = createAsyncThunk(
    'project/updateProject',
    async (project, thunkAPI) => {
        return await axios.put("/projects/" + project.id, project).then(response => response.data)
    }
)
export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        move(state, action) {


            const a = state[action.payload.oldIndex]
            const b = state[action.payload.newIndex]

            axios.put("/projects/" + a.id, {
                order: action.payload.newIndex,
            }).then((result) => {
            })
            axios.put("/projects/" + b.id, {
                order: action.payload.oldIndex,
            }).then((result) => {
            })

            return arrayMoveImmutable(state, action.payload.oldIndex, action.payload.newIndex)

        }
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
            })
    }
})

export const {move} = projectSlice.actions


export default projectSlice.reducer

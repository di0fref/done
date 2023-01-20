import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    task: {},
    project: {},
    user: {}
}

export const currentSlice = createSlice({
    name: 'setCurrent',
    initialState,
    reducers: {
        setCurrentTask: (state, action) => {
            state["task"] = action.payload
        },
        setCurrentProject: (state, action) => {
            state["project"] = action.payload
        },
        setCurrentUser: (state, action) => {
            state["user"] = action.payload
        },
    },
})
export const {setCurrentTask, setCurrentProject, setCurrentUser} = currentSlice.actions
export default currentSlice.reducer

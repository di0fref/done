import {createSlice} from '@reduxjs/toolkit'

const initialState = {}

export const currentTaskSlice = createSlice({
    name: 'currentTask',
    initialState,
    reducers: {
        setCurrentTask: (state, action) => {
            return action.payload
        },
    },
})
export const {setCurrentTask} = currentTaskSlice.actions
export default currentTaskSlice.reducer

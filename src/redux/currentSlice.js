import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    task:{},
    project:{}
}

export const currentSlice = createSlice({
    name: 'currentTask',
    initialState,
    reducers: {
        setCurrent: (state, action) => {
            return action.payload
         },
    },
})
export const {setCurrent} = currentSlice.actions
export default currentSlice.reducer

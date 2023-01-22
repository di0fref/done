import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const getNotifications = createAsyncThunk(
    'notifications/getNotifications',
    async (user_id, thunkAPI) => {
        try {
            const response = await axios.get("notifications")
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)


const initialState = []

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNotifications.fulfilled, (state, action) => {
                return action.payload
            })
            .addCase(getNotifications.rejected, (state, action) => {
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
    }
})
// export const {getNotifications} = notificationSlice.actions
export default notificationSlice.reducer

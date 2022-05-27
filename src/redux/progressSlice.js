import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 100,
};

export const progressSlice = createSlice({
    name: 'progress',
    initialState,
    reducers: {
        updateProgress: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateProgress } = progressSlice.actions

export default progressSlice.reducer
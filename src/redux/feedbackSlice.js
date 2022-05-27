import { createSlice } from '@reduxjs/toolkit';
import { addFeedback, deleteFeedback, getFeedback } from '../services/feedback.service';

const initialState = {
    data: null,
    error: null
};

export const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
            state.error = null;
        },
        setError: (state, action) => {
            state.data = null
            state.error = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setData, setError } = feedbackSlice.actions;

// Define a thunk that dispatches those action creators
export const getFeedbackThunk = () => async (dispatch) => {

    try {
        const data = await getFeedback();
        dispatch(setData(data))
    } catch (err) {
        dispatch(setError(err))
    }
    //done
}

export const addFeedbackThunk = (data) => async (dispatch) => {
    try {
        let response = await addFeedback(data);
        getFeedbackThunk();
        return response;
    } catch (error) {
        console.log(error)
    }
}

export const deleteFeedbackThunk = (data) => async () => {
    try {
        let response = await deleteFeedback(data);
        getFeedbackThunk();
        return response
    } catch (error) {
        console.log(error)
    }
}


export default feedbackSlice.reducer
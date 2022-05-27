import { createSlice } from '@reduxjs/toolkit';
import { addVideo, deleteVideo, detailVideo, editVideo, getVideo } from '../services/video.service';

const initialState = {
    data: null,
    error: null
};

export const videoSlice = createSlice({
    name: 'video',
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
export const { setData, setError } = videoSlice.actions;

// Define a thunk that dispatches those action creators
export const getVideoThunk = (dto) => async (dispatch) => {

    try {
        const data = await getVideo(dto);
        dispatch(setData(data))  // set dữ liệu nhận được video lưu trữ trên store
    } catch (err) {
        dispatch(setError(err))
    }
    //done
}

export const addVideoThunk = (data) => async (dispatch) => {
    try {
        let response = await addVideo(data);
        return response;
    } catch (error) {
        console.log(error)
    }
}



export const editVideoThunk = (videoId, data) => async (dispatch) => {
    try {
        let response = await editVideo(videoId, data);
        getVideoThunk()
        return response;
    } catch (error) {
        console.log(error)
    }
}

export const detailVideoThunk = (data) => async () => {
    try {
        let response = await detailVideo(data);
        return response
    } catch (error) {
        console.log(error)
    }
}
export const deleteVideoThunk = (data) => async () => {
    try {
        let response = await deleteVideo(data);
        return response
    } catch (error) {
        console.log(error)
    }
}
export default videoSlice.reducer
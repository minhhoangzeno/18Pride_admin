import { createSlice } from '@reduxjs/toolkit';
import { getUser, roleUser } from '../services/user.service';

const initialState = {
    data: null,
    error: null
};

export const userSlice = createSlice({
    name: 'user',
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
export const { setData, setError } = userSlice.actions;

// Define a thunk that dispatches those action creators
export const getUserThunk = () => async (dispatch) => {

    try {
        const data = await getUser();
        dispatch(setData(data))
    } catch (err) {
        dispatch(setError(err))
    }
    //done
}

export const roleUserThunk = (data) => async (dispatch) => {
    try {
        let response = await roleUser(data);
        getUserThunk();
        return response;
    } catch (error) {
        console.log(error)
    }
}


export default userSlice.reducer
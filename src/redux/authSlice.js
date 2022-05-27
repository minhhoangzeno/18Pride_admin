import { createSlice } from '@reduxjs/toolkit';
import { changePassword, checkBeforeResetPassword, forgotPassword, login, resetPassword, siginup, updateProfile, verifyEmail } from '../services/auth.service';
import { updateProgress } from './progressSlice';

const initialState = {
    data: null,
    error: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            localStorage.setItem("token", JSON.stringify(action.payload.access_token))
            localStorage.setItem("user", JSON.stringify(action.payload.user))
            state.error = null;
        },
        setError: (state, action) => {
            state.data = null
            state.error = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUser, setError } = authSlice.actions

// Define a thunk that dispatches those action creators
export const loginThunk = (username, password) => async (dispatch) => {
    dispatch(updateProgress(0))
    try {
        const data = await login(username, password);
        return data;
    } catch (err) {
        dispatch(setError(err))
    }
    //done
    dispatch(updateProgress(100))
}

export const signupThunk = (userDto) => async (dispatch) => {
    dispatch(updateProgress(0))
    try {
        const data = await siginup(userDto);
        return data;

    } catch (err) {
        console.log(err)
    }
    //done
    dispatch(updateProgress(100))
}

export const verifyEmailThunk = (confirmationCode) => async (dispatch) => {
    dispatch(updateProgress(0))
    try {
        const data = await verifyEmail(confirmationCode);
        console.log("redux", data)
        if (data.statusCode !== 201) {
            return data;
        } else {
            return null
        }
    } catch (err) {
        console.log("err", err)
    }
    //done
    dispatch(updateProgress(100))
}

export const forgotPasswordThunk = (email) => async (dispatch) => {
    dispatch(updateProgress(0))
    try {
        const data = await forgotPassword(email);
        if (data.statusCode !== 201) {
            return data
        } else {
            return null
        }
    } catch (err) {
        console.log("err", err)
    }
    //done
    dispatch(updateProgress(100))
}

export const resetPasswordThunk = (confirmationCode, newPassword) => async (dispatch) => {
    dispatch(updateProgress(0))
    try {
        const data = await resetPassword(confirmationCode, newPassword);
        if (data.statusCode !== 201) {
            return data;
        } else {
            return null;
        }
    } catch (err) {
        console.log("err", err)
    }
    //done
    dispatch(updateProgress(100))
}


export const checkBeforePasswordThunk = (confirmationCode) => async (dispatch) => {
    dispatch(updateProgress(0))
    try {
        const data = await checkBeforeResetPassword(confirmationCode);
        if (data.statusCode !== 201) {
            return data;
        } else {
            return null;
        }
    } catch (err) {
        console.log("err", err)
    }
    //done
    dispatch(updateProgress(100))
}


export const updateProfileThunk = (dto) => async (dispatch) => {
    dispatch(updateProgress(0))
    try {
        const data = await updateProfile(dto);
        return data;
    } catch (err) {
        console.log("err", err)
    }
    //done
    dispatch(updateProgress(100))
}

export const changePasswordThunk = (dto) => async (dispatch) => {
    dispatch(updateProgress(0))
    try {
        const data = await changePassword(dto);
        return data;
    } catch (err) {
        dispatch(setError(err))
    }
    //done
    dispatch(updateProgress(100))
}


export default authSlice.reducer
import { createSlice } from '@reduxjs/toolkit';
import { addAttendance, deleteAttendance, detailAttendance, editAttendance, getAttendance, getAttendanceUser, statusByAdminAttendance, statusByUserAttendance } from '../services/attendance.service';

const initialState = {
  data: null,
  error: null
};

export const attendanceSlice = createSlice({
  name: 'attendance',
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
export const { setData, setError } = attendanceSlice.actions;

// Define a thunk that dispatches those action creators
export const getAttendanceThunk = () => async (dispatch) => {

  try {
    const data = await getAttendance();
    dispatch(setData(data))
  } catch (err) {
    dispatch(setError(err))
  }
  //done
}

export const getAttendanceUserThunk = () => async (dispatch) => {
  try {
    const data = await getAttendanceUser();
    return data;
  } catch (err) {
    dispatch(setError(err))
  }
  //done
}


export const addAttendanceThunk = (data) => async () => {
  try {
    let response = await addAttendance(data);
    return response;
  } catch (error) {
    console.log(error)
  }
}



export const editAttendanceThunk = (attendanceId, data) => async () => {
  try {
    let response = await editAttendance(attendanceId, data);
    return response;
  } catch (error) {
    console.log(error)
  }
}


export const statusByAdminAttendanceThunk = (data) => async () => {
  try {
    let response = await statusByAdminAttendance(data);
    return response;
  } catch (error) {
    console.log(error)
  }
}



export const statusByUserAttendanceThunk = (data) => async () => {
  try {
    let response = await statusByUserAttendance(data);
    return response;
  } catch (error) {
    console.log(error)
  }
}

export const detailAttendanceThunk = (data) => async () => {
  try {
    let response = await detailAttendance(data);
    return response
  } catch (error) {
    console.log(error)
  }
}
export const deleteAttendanceThunk = (data) => async () => {
  try {
    let response = await deleteAttendance(data);
    return response
  } catch (error) {
    console.log(error)
  }
}
export default attendanceSlice.reducer
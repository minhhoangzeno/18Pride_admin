import { createSlice } from '@reduxjs/toolkit';
import { addPayment, addPaymentByUser, deletePayment, detailPayment, editPayment, getPayment, getPaymentUser, paymentUserStatus, statusByAdminPayment } from '../services/payment.service';

const initialState = {
  data: null,
  error: null
};

export const paymentSlice = createSlice({
  name: 'payment',
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
export const { setData, setError } = paymentSlice.actions;

// Define a thunk that dispatches those action creators
export const getPaymentThunk = () => async (dispatch) => {

  try {
    const data = await getPayment();
    dispatch(setData(data))
  } catch (err) {
    dispatch(setError(err))
  }
  //done
}


export const getPaymentUserThunk = () => async (dispatch) => {
  try {
    const data = await getPaymentUser();
    return data;
  } catch (err) {
    dispatch(setError(err))
  }
  //done
}


export const addPaymentThunk = (data) => async () => {
  try {
    let response = await addPayment(data);
    return response;
  } catch (error) {
    console.log(error)
  }
}


export const addPaymentByUserThunk = (data) => async () => {
  try {
    let response = await addPaymentByUser(data);
    return response;
  } catch (error) {
    console.log(error)
  }
}



export const paymentUserStatusThunk = (data) => async () => {
  try {
    let response = await paymentUserStatus(data);
    return response;
  } catch (error) {
    console.log(error)
  }
}



export const editPaymentThunk = (paymentId, data) => async () => {
  try {
    let response = await editPayment(paymentId, data);
    return response;
  } catch (error) {
    console.log(error)
  }
}


export const statusByAdminPaymentThunk = (data) => async () => {
  try {
    let response = await statusByAdminPayment(data);
    return response;
  } catch (error) {
    console.log(error)
  }
}

export const detailPaymentThunk = (data) => async () => {
  try {
    let response = await detailPayment(data);
    return response
  } catch (error) {
    console.log(error)
  }
}
export const deletePaymentThunk = (data) => async () => {
  try {
    let response = await deletePayment(data);
    return response
  } catch (error) {
    console.log(error)
  }
}
export default paymentSlice.reducer
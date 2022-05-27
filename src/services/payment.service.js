import { privateDeleteApi, privateGetApi, privatePostApi, publicGetApi } from "../apis/API";

export const getPayment = async () => {
    let response = await publicGetApi(`/payment`)
    return response
};


export const getPaymentUser = async () => {
    let response = await privateGetApi(`/payment-user`)
    return response
};


export const paymentUserStatus = async (dto) => {
    let response = await privateGetApi(`/payment-user/payment/${dto}`)
    return response
};


export const paymentUserStatisticByAdmin = async (dto) => {
    let response = await privateGetApi(`/payment-user/statistic-admin/${dto}`)
    return response
};


export const paymentUserStatistic = async () => {
    let response = await privateGetApi(`/payment-user/statistic`)
    return response
};



export const addPayment = async (data) => {
    let response = await privatePostApi('/payment/create', data)
    return response
};


export const addPaymentByUser = async (data) => {
    let response = await privatePostApi('/payment-user/create', data)
    return response
};

export const editPayment = async (paymentId, data) => {
    let response = await privatePostApi(`/payment/edit/${paymentId}`, data)
    return response
};
export const detailPayment = async (data) => {
    let response = await privateGetApi(`/payment/detail?paymentId=${data.paymentId}&status=${data.status}`);
    return response;
}

export const statusByAdminPayment = async (data) => {
    let response = await privatePostApi(`/payment-user/status-admin`, data)
    return response
};
export const deletePayment = async (data) => {
    let response = await privateDeleteApi(`/payment/delete/${data}`)
    return response
};

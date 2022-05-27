import { publicGetApi } from '../apis/API';

export const dashboardUser = async () => {
    let response = await publicGetApi('/user');
    return response;
};


export const dashboardProduct = async () => {
    let response = await publicGetApi('/product');
    return response;
};


export const dashboardDetailCountdown = async (countdownId) => {
    let response = await publicGetApi(`/countdown/detail/${countdownId}`);
    return response;
};


export const dashboardCountdown = async () => {
    let response = await publicGetApi('/countdown');
    return response;
};



export const dashboardVoteUser = async () => {
    let response = await publicGetApi('/vote-user');
    return response;
};




export const dashboardOrderByAmount = async (dto) => {
    let response = await publicGetApi(`/order/amount/${dto}`);
    return response;
};


export const dashboardOrderByRevenue = async (dto) => {
    let response = await publicGetApi(`/order/revenue/${dto}`);
    return response;
};

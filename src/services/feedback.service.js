import { privateDeleteApi, privatePostApi, publicGetApi } from "../apis/API";

export const getFeedback = async () => {
    let response = await publicGetApi('/feedback')
    return response
};

export const addFeedback = async (data) => {
    let response = await privatePostApi('/feedback/create', data)
    return response
};


export const deleteFeedback = async (data) => {
    let response = await privateDeleteApi(`/feedback/delete/${data}`)
    return response
};
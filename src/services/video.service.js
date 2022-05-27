import { privateDeleteApi, privatePostApi, publicGetApi } from "../apis/API";

export const getVideo = async (dto) => {
    let response = await publicGetApi(`/video/${dto}`)
    return response
};

export const addVideo = async (data) => {
    let response = await privatePostApi('/video/create', data)
    return response
};

export const editVideo = async (videoId, data) => {
    let response = await privatePostApi(`/video/edit/${videoId}`, data)
    return response
};
export const detailVideo = async (data) => {
    let response = await publicGetApi(`/video/detail/${data}`);
    return response;
}

export const deleteVideo = async (data) => {
    let response = await privateDeleteApi(`/video/delete/${data}`)
    return response
};

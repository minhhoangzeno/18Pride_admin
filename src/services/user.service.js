import { privatePostApi, publicGetApi } from "../apis/API";

export const getUser = async () => {
    let response = await publicGetApi('/user')
    return response
};

export const roleUser = async (data) => {
    let response = await privatePostApi('/user/role', data)
    return response
};

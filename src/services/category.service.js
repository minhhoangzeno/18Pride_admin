import { privateDeleteApi, privatePostApi, publicGetApi } from "../apis/API";

export const getCategory = async () => {
    let response = await publicGetApi(`/category`)
    return response;
};

export const addCategory = async (data) => {
    let response = await privatePostApi('/category/create', data)
    return response
};

export const editCategory = async (categoryId, data) => {
    let response = await privatePostApi(`/category/edit/${categoryId}`, data)
    return response
};

export const detailCategory = async (data) => {
    let response = await publicGetApi(`/category/detail/${data}`);
    return response;
}

export const deleteCategory = async (data) => {
    let response = await privateDeleteApi(`/category/delete/${data}`)
    return response
};

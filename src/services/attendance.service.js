import { privateDeleteApi, privateGetApi, privatePostApi, publicGetApi } from "../apis/API";

export const getAttendance = async () => {
    let response = await publicGetApi(`/attendance`)
    return response
};

export const addAttendance = async (data) => {
    let response = await privatePostApi('/attendance/create', data)
    return response
};

export const editAttendance = async (attendanceId, data) => {
    let response = await privatePostApi(`/attendance/edit/${attendanceId}`, data)
    return response
};
export const detailAttendance = async (data) => {
    let response = await privateGetApi(`/attendance/detail?attendanceId=${data.attendanceId}&status=${data.status}`);
    return response;
}

export const statusByAdminAttendance = async (data) => {
    let response = await privatePostApi(`/attendance-user/status-admin`, data)
    return response
};


export const statusByUserAttendance = async (data) => {
    let response = await privatePostApi(`/attendance-user/status`, data)
    return response
};


export const getAttendanceUser = async () => {
    let response = await privateGetApi(`/attendance-user`)
    return response
};


export const attendanceUserStatistic = async () => {
    let response = await privateGetApi(`/attendance-user/statistic`)
    return response
};



export const attendanceUserStatisticByAdmin = async (dto) => {
    let response = await privateGetApi(`/attendance-user/statistic-admin/${dto}`)
    return response
};


export const deleteAttendance = async (data) => {
    let response = await privateDeleteApi(`/attendance/delete/${data}`)
    return response
};

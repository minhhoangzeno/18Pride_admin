import { privatePostApi, privatePostFileApi, publicGetApi, publicPostApi } from '../apis/API';

export const login = async (username, password) => {
    const data = {
        username,
        password
    }
    let response = await publicPostApi('/auth/login', data)
    return response
};

export const siginup = async (userDto) => {
    let response = await publicPostApi('/user/register', userDto)
    return response
};

export const verifyEmail = async (confirmationCode) => {
    try {
        let response = await publicGetApi(`/user/confirm/${confirmationCode}`)
        return response;
    } catch (error) {
        console.log(error)
    }
}


export const forgotPassword = async (email) => {
    let response = await publicPostApi('/user/forgot-password', { email });
    return response;
}

export const resetPassword = async (confirmationCode, newPassword) => {
    let response = await publicPostApi('/user/verify-password', { confirmationCode, newPassword });
    return response;
}

export const checkBeforeResetPassword = async (confirmationCode) => {
    try {
        let response = await publicGetApi(`/user/verify-password/${confirmationCode}`)
        return response;
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = async (data) => {
    try {
        let response = await privatePostFileApi(`/user/update`,data);
        return response;
    } catch (error) {
        
    }
}

export const changePassword = async (data) => {
    let response = await privatePostApi('/user/change-password', data)
    return response
}
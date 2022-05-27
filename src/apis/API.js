import axios from 'axios';
// import { userConstants } from '../commons/constants';
// import { login } from '../services/login.services';

export const SERVER = {
    // BASE_URL: "http://103.124.95.61:3001",//CHANGE HERE
    BASE_URL: "http://localhost:3000",//CHANGE HERE
    token: JSON.parse(localStorage.getItem("token")),
    URL_IMAGE: "http://localhost:3000/image/"
}

//
export const publicGetApi = async (url) => {
    let resp = await axios({
        method: 'GET',
        url: `${SERVER.BASE_URL}${url}`
    })
    return resp.data;
}

export const privateGetApi = async (url) => {
    let resp = await axios({
        method: 'GET',
        url: `${SERVER.BASE_URL}${url}`,
        headers: {
            'Authorization': `Bearer ${SERVER.token}`
        }
    })
    return resp.data;
}



export const publicPostApi = async (url, data) => {
    let resp = await axios({
        method: 'POST',
        url: `${SERVER.BASE_URL}${url}`,
        data
    })
    return resp.data;
}

export const privatePostApi = async (url, data) => {
    let resp = await axios({
        method: 'POST',
        url: `${SERVER.BASE_URL}${url}`,
        data,
        headers: {
            'Authorization': `Bearer ${SERVER.token}`
        }
    })
    return resp.data;
}

export const privatePostFileApi = async (url,data) => {
    let resp = await axios({
        method: 'POST',
        url: `${SERVER.BASE_URL}${url}`,
        data,
        headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${SERVER.token}`
        }
    })
    return resp.data;
}


export const privateDeleteApi = async (url) => {
    let resp = await axios({
        method: 'DELETE',
        url: `${SERVER.BASE_URL}${url}`,
        headers: {
            'Authorization': `Bearer ${SERVER.token}`
        }
    })
    return resp.data;
}

// ///PRIVATE
// export const protectedAuthInstance = axios.create({
//     baseURL: SERVER.BASE_URL,
//     timeout: 2500,
//     headers: {
//         'apikey': SERVER.API_KEY,
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//     }
// });

// // Request interceptor for API calls
// protectedAuthInstance.interceptors.request.use(
//     async (config) => {
//         const value = localStorage.getItem(userConstants.LOGIN_USER)
//         const token = JSON.parse(value)
//         config.headers = {
//             ...config.headers,
//             'customAuth': `Bearer ${token.accessToken}`
//         }
//         return config;
//     },
//     error => {
//         Promise.reject(error)
//     });

// // Response interceptor for API calls
// protectedAuthInstance.interceptors.response.use((response) => {
//     return response
// }, async (error) => {
//     const originalRequest = error.config;
//     if ((error.response.status === 417) && !originalRequest._retry) {
//         originalRequest._retry = true;
//         await refreshAccessToken();
//         return protectedAuthInstance(originalRequest);
//     }

//     if ((error.response.status === 417) && originalRequest._retry) {
//         window.location = "/login" //redirect login 
//     }

//     return Promise.reject(error);
// })

// export const refreshAccessToken = async () => {
//     let value = localStorage.getItem(userConstants.LOGIN_USER)
//     let data = JSON.parse(value)

//     try {
//         let body = await login(data)
//         //set new token
//         localStorage.setItem(userConstants.LOGIN_USER, JSON.stringify(body))
//     } catch (error) {
//         if (error.response.status === 401) {
//             window.location = "/login" //redirect login 
//             return
//         }
//         throw error
//     }
// }

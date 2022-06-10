import axios from "axios";

export default axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
});

export const axiosPrivate = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
    headers: {
        'Access-Control-Allow-Origin' : `${process.env.REACT_APP_CLIENT_URL}`,
    },
    withCredentials: true,
});
import axios from "axios";

const {REACT_APP_SERVER_ADDRESS} = process.env;

export let CommunityRepo = {
    submitPost: (data, token) => {
        return axios.post(`${REACT_APP_SERVER_ADDRESS}/api/post/submit`, data, {
            headers: {
                "X-Auth": token
            }
        });
    },
    getLatestPosts: (params, token) => {
        return axios.get(`${REACT_APP_SERVER_ADDRESS}/api/post/get?page=${params.page}`, {
            headers: {
                "X-Auth": token
            }
        });
    },
    getCommentedPosts: (params, token) => {
        return axios.get(`${REACT_APP_SERVER_ADDRESS}/api/post/get?page=${params.page}&sort=comments.length,desc`, {
            headers: {
                "X-Auth": token
            }
        });
    }
};

import * as axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: { "API-KEY": "fd29c760-afd8-46bc-9f14-512944ead313" },
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return (
            instance
                .get(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => { // промисы
                    return response.data;
                })
        )
    },
    follow(id) {
        return (
            instance
                .post(`follow/` + id)
                .then(response => {
                    return response.data
                })

        )
    },
    unfollow(id) {
        return (
            instance
                .delete(`follow/` + id)
                .then(response => {
                    return response.data;
                })
        )
    },
}

export const profileAPI = {
    getProfile(userId) {
        return (
            instance
                .get(`profile/` + userId)
                .then(response => {
                    return response.data;
                })
        )
    }
}

export const authAPI = {
    authMe() {
        return (
            instance
                .get(`auth/me/`)
                .then(response => {
                    return response.data;
                })
        )
    }
}

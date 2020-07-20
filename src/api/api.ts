import axios from "axios"
import {ProfileType} from "../types/types"


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {"API-KEY": "fd29c760-afd8-46bc-9f14-512944ead313"},
})


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return (
            instance
                .get(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => { // промисы
                    return response.data
                })
        )
    },
    follow(userId: number) {
        return (
            instance
                .post(`follow/` + userId)
                .then(response => {
                    return response.data
                })

        )
    },
    unfollow(userId: number) {
        return (
            instance
                .delete(`follow/` + userId)
                .then(response => {
                    return response.data
                })
        )
    },
}

export const profileAPI = {
    getProfile(userId: number | null) {
        return (
            instance
                .get(`profile/` + userId)
                .then(response => {
                    return response.data
                })
        )
    },
    getStatus(userId: number) {
        return (
            instance
                .get(`profile/status/` + userId)
        )
    },
    updateStatus(status: string) {
        return (
            instance
                .put(`profile/status`, {status: status})
        )
    },
    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append("image", photoFile)

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': `multipart/form-data`
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return (
            instance.put(`profile`, profile)
        )
    },
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum | ResultCodeForCaptcha
    messages: Array<string>
}
type LogoutResponseType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {}
}

export const authAPI = {
    authMe() {
        return (
            instance
                .get<MeResponseType>(`auth/me/`)
                .then(response => {
                    return response.data
                })
        )
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return (
            instance
                .post<LoginResponseType>(`auth/login/`, {email, password, rememberMe, captcha})
                .then(response => {
                    return response.data
                })
        )
    },
    logout() {
        return instance
            .delete<LogoutResponseType>(`auth/login`)
            .then(response => {
                return response.data
            })
    },
}

type GetCaptchaResponseType = {
    url: string
}
export const securityAPI = {
    getCaptchaUrl() {
        return (
            instance
                .get<GetCaptchaResponseType>('security/get-captcha-url')
                .then(response => {
                    return response.data
                })
        )
    },
}

import axios from "axios"
import {UserType} from "../types/types";


export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {"API-KEY": "fd29c760-afd8-46bc-9f14-512944ead313"},
})


export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = { // D = data: ({...} | { }), RC = resultCode (0 | 10)
    data: D
    messages: Array<string>
    resultCode: RC
}
import { IUser } from "../store/UserStore";
import { $authHost, $host, baseUser } from "./index";
import jwt_decode from "jwt-decode";

interface IEditParams extends IUser {
    newEmail?: string,
    newPassword?: string
}

const catchTokenError = (data: any): unknown => {
    if (!data || !data.token) {
        return null
    }
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const registration = async (email: string, password: string) => {
    const { data } = await $host.post(`${baseUser}registration`, { email, password })
    return catchTokenError(data)
}

export const login = async (email: string, password: string) => {

    const { data } = await $host.post(`${baseUser}login`, { email, password })
    return catchTokenError(data)

}
export const edit = async (params: IEditParams) => {
    const { data } = await $authHost.post(`${baseUser}edit`, { ...params })
    return catchTokenError(data)

}
export const check = async () => {
    const { data } = await $authHost.get(`${baseUser}auth`)
    return catchTokenError(data)
}

export const createAdmin = async (email: string, password: string) => {
    const { data } = await $authHost.post(`${baseUser}create-admin`, { email, password })
    return data
}

export const getUserById = async (id: number) => {
    const { data } = await $authHost.get(`${baseUser}${id}`)
    return data
}
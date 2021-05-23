import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, nickname, countryId, password) => {
    const {data} = await $host.post('api/gamer/registration', {email,  nickname, countryId, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/gamer/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/gamer/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

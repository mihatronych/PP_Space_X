import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createGamer = async (gamer) => {
    const {data} = await $authHost.post('api/gamer', gamer)
    return data
}
export const fetchGamer = async () => {
    const {data} = await $host.get('api/gamer')
    return data
}
export const createSession = async (session) => {
    const {data} = await $authHost.post('api/session', session)
    return data
}
export const fetchSession = async () => {
    const {data} = await $host.get('api/session')
    return data
}
export const fetchCountry = async () => {
    const {data} = await $host.get('api/country')
    return data
}

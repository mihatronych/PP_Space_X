import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";
import {useCookies} from "react-cookie";
import {set} from "mobx";

async function setOurCookie(jwt){
    console.log(jwt)
    const [cookies, setCookie] = useCookies(['id'])
    let exp = jwt.exp
    setCookie('id', jwt.id, {path: '/', exp})
}

export const registration = async (email, nickname, countryId, password) => {
    const {data} = await $host.post('api/gamer/registration', {email,  nickname, countryId, password})
    localStorage.setItem('token', data.token)
    let result_jwt = jwt_decode(data.token)
    // await setOurCookie(result_jwt);
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/gamer/login', {email, password})
    localStorage.setItem('token', data.token)
    let result_jwt = jwt_decode(data.token)
    // await setOurCookie(result_jwt)
    return jwt_decode(data.token)
}

export const update = async (data_up) =>{
    const {data} = await $authHost.put('api/gamer/', data_up) //$authHost
    return data
}

export const check = async () => {
    const {data} = await $authHost.get('api/gamer/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

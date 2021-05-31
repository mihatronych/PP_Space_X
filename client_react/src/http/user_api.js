import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";
import {set} from "mobx";


export const registration = async (email, nickname, countryId, password) => {
    const {data} = await $host.post('api/gamer/registration', {email,  nickname, countryId, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/gamer/login', {email, password})
    localStorage.setItem('token', data.token)
    console.log(localStorage.getItem('token'))
    return jwt_decode(data.token)
}

export const update = async (data_up) =>{
    console.log(data_up)
    const token = localStorage.getItem('token')
    console.log(token)
    const {data} = await $host.put('api/gamer/', data_up, {headers: {
        'Authorization': `Bearer ${token}`
    }}) //$authHost
    return jwt_decode(data.token)
}

export const delete_ = async (data_up) =>{
    console.log(data_up)
    const token = localStorage.getItem('token')
    console.log(token)
    const {data} = await $host.delete('api/gamer/'+data_up.id, {headers: {
            'Authorization': `Bearer ${token}`
        }})//, params: {id: data_up.id}}) //$authHost
    return data
}

export const check = async () => {
    const {data} = await $authHost.get('api/gamer/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

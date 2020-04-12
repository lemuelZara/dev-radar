import axios from 'axios'

export const api = axios.create({
    // IP exibido pelo expo start: exp://<Seu IP>:3333
    baseURL: 'http://192.168.100.160:3333'
})
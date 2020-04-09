import axios from 'axios'

const api = axios.create({
    baseURL: 'https://192.168.100.160:3333'
    // baseURL: 'https://<IP local da sua máquina>:3333'
})

export default api
import axios, { AxiosError } from "axios"
import { LOGIN_URL, REGISTER_URL } from "../constants/ApiString"

const doLogin = async (email: string, password: string) => {
    try {
        const res = await axios.post(`${LOGIN_URL}`, { email, password })
        
        return res.data;
    } catch (e) {
        const error = e as AxiosError;
        throw error.response?.data;
    }
}

const doRegister = async (username: string, email: string, password: string) => {
    try {
        const res = await axios.post(`${REGISTER_URL}`, { username, email, password })

        return res.data;
    } catch (e) {
        const error = e as AxiosError;
        throw error.response?.data;
    }
}

const AuthService = {
    doLogin: doLogin,
    doRegister: doRegister
}

export default AuthService;
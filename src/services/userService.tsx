import axios, { AxiosError } from "axios";
import { ALL_USER_URL, PROFILE_URL, UPDATE_ROLE_URL } from "../constants/ApiString";

const getAllUser = async () => {
    try {
        const res = await axios.get(`${ALL_USER_URL}`);

        return res.data;
    } catch (e) {
        const error = e as AxiosError;
        throw error.response?.data;
    }
}

const updateRole = async (id: number, role: string, token: string) => {
    try {
        const res = await axios.patch(`${UPDATE_ROLE_URL.replace(':id', id.toString())}`, 
            { role }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (e) {
        const error = e as AxiosError;
        throw error.response?.data;
    }
}

const getProfile = async (token: string) => {
    try {
        const res = await axios.get(`${PROFILE_URL}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (e) {
        const error = e as AxiosError;
        throw error.response?.data;
    }
}

const UserService = {
    getAllUser: getAllUser,
    updateRole: updateRole,
    getProfile: getProfile,
}

export default UserService;
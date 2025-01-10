import axios from "../config/axios"

export const createUser = async (data) => {
    return await axios.post('/api/user/create', data);
}

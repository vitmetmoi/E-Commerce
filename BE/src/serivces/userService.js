import db from "../models"

const createUserService = async (data) => {
    try {
        if (!data || !data.email || !data.firstName || !data.lastName) {
            return {
                DT: "",
                EC: -1,
                EM: 'Missing parameter!'
            }
        }
        else {
            await db.User.create(data);
            return {
                DT: "",
                EC: 0,
                EM: 'Create new user completed!'
            }
        }
    }
    catch (e) {
        console.log(e);
        return {
            DT: "",
            EC: -1,
            EM: 'Err from sever service...'
        }
    }
}

module.exports = {
    createUserService
}
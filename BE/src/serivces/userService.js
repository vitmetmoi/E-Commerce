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


const getUserService = async (type, userId) => {
    try {
        if (!type) {
            return {
                DT: "",
                EC: -1,
                EM: 'Missing parameter!'
            }
        }
        else {
            let data = [];
            if (type === 'ALL') {
                data = await db.User.findAll();
                return {
                    DT: data,
                    EC: 0,
                    EM: 'Get user completed!'
                }
            }
            else {
                data = await db.User.findOne({ where: { id: userId } });
                return {
                    DT: data,
                    EC: 0,
                    EM: 'Get user completed!'
                }
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
    createUserService, getUserService
}
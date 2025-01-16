import { raw } from "body-parser";
import db from "../models"
import _ from 'lodash'
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

const checkValidatePhoneNumber = (phoneNumber) => {
    try {
        let isValid = true;
        let user = db.User.findOne({
            where: {
                phoneNumber: phoneNumber,
                raw: true
            }
        })
        if (!_.isEmpty(user)) {
            isValid = false;
        }
        return isValid;
    }
    catch (e) {
        console.log(e);
    }
}

const checkValidateEmail = (email) => {
    try {
        let isValid = true;
        let user = db.User.findOne({
            where: {
                email: email,
                raw: true
            }
        })
        if (!_.isEmpty(user)) {
            isValid = false;
        }
        return isValid;
    }
    catch (e) {
        console.log(e);
    }
}


const registerService = async (data) => {
    try {
        if (!data || !data.email || !data.firstName || !data.lastName || !data.phoneNumber || !data.address) {
            return {
                DT: "",
                EC: -1,
                EM: 'Missing parameter!'
            }
        }
        else {
            if (checkValidateEmail(data.email) === false || checkValidatePhoneNumber(data.phoneNumber)) {
                return {
                    DT: "",
                    EC: -1,
                    EM: ' Your email or phone number is exist!'
                }
            }
            else {
                let user = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                    gender: data.gender,
                    groupId: data.groupId ? data.groupId : 3
                }
                await db.User.create(user);
                return {
                    DT: "",
                    EC: 0,
                    EM: 'Register completed!'
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
    createUserService, getUserService, registerService
}
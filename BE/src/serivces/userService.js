import { raw } from "body-parser";
import db from "../models"
import _, { has, includes } from 'lodash'
import bcrypt from 'bcryptjs';
import { Op, where } from "sequelize";
import JWTservice from '../middleware/JWTservice.js'
import jwt from 'jsonwebtoken'
const saltRounds = 10;
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


const loginService = async (loginAcc, password) => {
    try {
        if (!loginAcc || !password) {
            return {
                DT: "",
                EC: -1,
                EM: 'Missing parameter!'
            }
        }
        else {

            let user = await db.User.findOne({
                where: {
                    [Op.or]: {
                        email: loginAcc,
                        phoneNumber: loginAcc,
                    },
                },
                raw: true
            });
            if (!_.isEmpty(user)) {
                let checkPassword = bcrypt.compareSync(password, user.password);
                if (checkPassword === true) {

                    let data = {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        address: user.address,
                        gender: user.gender,
                        avatar: user.avatar,
                        groupId: user.groupId ? user.groupId : 3,
                    }


                    let token = JWTservice.createJwtTokenService(data);

                    return {
                        DT: { data: data, token: token },
                        EC: 0,
                        EM: 'Login completed!'
                    }
                }
                else {
                    return {
                        DT: '',
                        EC: -1,
                        EM: 'Your password isnt correct!'
                    }
                }

            }
            else {
                return {
                    DT: '',
                    EC: -1,
                    EM: 'Your phone number or email isnt exist!'
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

const checkValidatePhoneNumber = async (phoneNumber) => {
    try {
        let isValid = true;
        let user = await db.User.findOne({
            where: {
                phoneNumber: phoneNumber,
            },
            raw: true
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

const checkValidateEmail = async (email) => {
    try {
        let isValid = true;
        let user = await db.User.findOne({
            where: {
                email: email,
            }, raw: true
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



const hashPasswordService = async (password) => {
    let hashPassword = '';

    hashPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })

    return hashPassword;
}


const registerService = async (data) => {
    try {
        if (!data || !data.password || !data.email || !data.firstName || !data.lastName || !data.phoneNumber) {
            return {
                DT: "",
                EC: -1,
                EM: 'Missing parameter!'
            }
        }
        else {
            if (await checkValidateEmail(data.email) === false || await checkValidatePhoneNumber(data.phoneNumber) === false) {
                return {
                    DT: "",
                    EC: -1,
                    EM: ' Your email or phone number is exist!'
                }
            }
            else {
                let hashPassword = '';
                hashPassword = await hashPasswordService(data.password);
                let user = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                    gender: data.gender,
                    groupId: data.groupId ? data.groupId : 3,
                    password: hashPassword,
                    avatar: data.avatar
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
    createUserService, getUserService, registerService, loginService
}
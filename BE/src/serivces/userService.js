import db from "../models"
import _ from 'lodash'
import bcrypt from 'bcryptjs';
import { Op } from "sequelize";
import JWTservice from '../middleware/JWTservice.js'
const fs = require('fs');

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
                data = await db.User.findAll({
                    include: [{
                        model: db.Address,
                    },],
                    nested: true
                });
                return {
                    DT: data,
                    EC: 0,
                    EM: 'Get user completed!'
                }
            }
            else {
                data = await db.User.findOne({
                    where: { id: userId },
                    include: [{
                        model: db.Address,
                    },],
                    nested: true

                });
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
                include: [{
                    model: db.Address,
                    attributes: ['id', 'provinceId', 'districtId', 'wardId', 'note'],
                    // nested: true,

                }],



            });
            if (!_.isEmpty(user)) {
                let checkPassword = bcrypt.compareSync(password, user.password);
                if (checkPassword === true) {
                    let base64String = new Buffer(user.avatar, 'base64').toString('binary');


                    let data = {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        gender: user.gender,
                        avatar: base64String,
                        birthDay: user.birthDay,
                        address: {
                            provinceId: user.Addresses[0].provinceId ? user.Addresses[0].provinceId : 0,
                            districtId: user.Addresses[0].districtId ? user.Addresses[0].districtId : 0,
                            wardId: user.Addresses[0].wardId ? user.Addresses[0].wardId : 0,
                            note: user.Addresses[0].note ? user.Addresses[0].note : 0
                        },
                        groupId: user.groupId ? user.groupId : 3,
                    }
                    let dataForVertify = {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        address: user.address,
                        gender: user.gender,
                        groupId: user.groupId ? user.groupId : 3,
                    }

                    let token = JWTservice.createJwtTokenService(dataForVertify);

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
                    address: '',
                    gender: data.gender,
                    groupId: data.groupId ? data.groupId : 3,
                    password: hashPassword,
                    avatar: data.avatar
                }
                let userRes = await db.User.create(user);
                console.log('user res', userRes);
                let address = {
                    userId: userRes.id,
                    provinceId: 0,
                    districtId: 0,
                    wardId: 0,
                    note: '',
                }
                await db.Address.create(address);
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

const updateUserService = async (userData) => {
    try {
        if (!userData || !userData.id || !userData.address || !userData.firstName || !userData.lastName
            || !userData.gender || !userData.groupId || !userData.email || !userData.phoneNumber
        ) {
            return {
                DT: "",
                EC: -1,
                EM: 'Missing parameter!'
            }
        }
        else {
            let user = await db.User.update(
                {
                    id: userData.id,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    phoneNumber: userData.phoneNumber,
                    gender: userData.gender,
                    avatar: userData.avatar,
                    birthDay: userData.birthDay,
                    groupId: userData.groupId ? userData.groupId : 3
                }
                ,
                { where: { id: userData.id } }
            )

            let address = await db.Address.update({

                provinceId: userData.address.provinceId,
                districtId: userData.address.districtId,
                wardId: userData.address.wardId,
                note: userData.address.note

            },
                { where: { userId: userData.id } }
            )
            if (user && address) {
                return {
                    DT: "",
                    EC: 0,
                    EM: 'Update completed!'
                }
            }
            else {
                return {
                    DT: "",
                    EC: -1,
                    EM: 'Err from sever update user service!'
                }
            }
        }
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {
    createUserService, getUserService, registerService, loginService, updateUserService
}
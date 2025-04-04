import jwt from 'jsonwebtoken';
import db from '../models';
import { RAW } from 'sequelize/lib/query-types';

const exceptionPath = ['/', '/api/user/login', '/api/user/register',
    '/api/account', '/api/clothes/get', '/api/hooks/payment', '/api/review/get', '/socket.io/',
    '/api/openAI/get'
];

const createJwtTokenService = (data) => {

    try {
        let key = process.env.JWT_SECRET;
        let expIn = process.env.JWT_EXPIRES_IN;

        let token = '';

        if (data) {
            token = jwt.sign(data, key, { expiresIn: expIn });
        }

        return token;
    }
    catch (e) {
        console.log(e);
    }
}

const verifyTokenService = (token) => {
    try {

        let key = process.env.JWT_SECRET;
        var decoded = jwt.verify(token, key);

        if (decoded) {
            return decoded;
        }

    }
    catch (e) {
        console.log(e);
    }
}


const checkCookieService = (req, res, next) => {
    try {
        let path = req.path;
        // console.log('path', req.headers.origin)
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("full", fullUrl)
        let isValid = exceptionPath.includes(path)

        if (path === '/api/account') {
            isValid = false;
        }

        if (isValid === true) {
            next();
        }
        else {
            let cookie = req.cookies.user;
            if (cookie) {

                let decoded = verifyTokenService(cookie);
                if (decoded) {
                    req.user = decoded;
                    next();
                }
                else {
                    return res.status(401).json({
                        DT: '',
                        EC: 401,
                        EM: 'Token has been expired!'
                    })
                }
            }
            else {
                return res.status(404).json({
                    DT: '',
                    EC: 404,
                    EM: 'Cookie not found!'
                })
            }
        }

    }
    catch (e) {
        console.log(e);
        return res.status(404).json({
            DT: '',
            EC: 404,
            EM: 'Cookie not found!'
        })
    }
}

const authenticateCookieService = async (req, res, next) => {
    try {

        let path = req.path;
        console.log('path', path)
        if (exceptionPath.includes(path) === true) {
            next();
        }
        else {
            let isValid = await checkUserPermission(req.user, path)
            if (isValid === true) {
                next();
            }
            else {
                return res.status(403).json({
                    DT: '',
                    EC: 404,
                    EM: 'Your dont have permission to access this resource!'
                })
            }
        }

    }
    catch (e) {
        console.log(e);
    }
}

const checkUserPermission = async (user, path) => {
    try {

        let isValid = false;
        let result = await db.Group.findOne({
            where: { id: user.groupId },
            include: [{
                model: db.Role,
                attributes: ['id', 'url', 'description'],
                through: {
                    attributes: { exclude: ['GroupId', 'sizeId'] },

                },

            }],
        })

        isValid = result.Roles.some(item => item.url === path)

        return isValid;

    }
    catch (e) {
        console.log(e)
    }
}

module.exports = {
    createJwtTokenService, verifyTokenService, checkCookieService, authenticateCookieService
}
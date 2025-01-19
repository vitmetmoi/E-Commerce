import jwt from 'jsonwebtoken';
import userService from '../serivces/userService';

const exceptionPath = ['/', '/api/user/login', '/api/user/register', '/api/account'];

const createJwtTokenService = (data) => {
    try {
        // let key = process.env.JWT_SECRET;
        // let expIn = process.env.JWT_EXPIRES_IN;

        // let token = '';

        // if (data) {
        //     token = jwt.sign(data, key, { expiresIn: expIn });
        // }

        // return token;
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
        let cookie = req.cookie.user;
        console.log('check1');
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
    catch (e) {

    }
}

const authenticateCookieService = (req, res, next) => {
    try {
        let path = req.path;
        console.log('path', path)
        if (exceptionPath.find(path) === true) {
            next();
        }
        else {
            let isValid = userService.checkUserPermission(req.user, path)
            if (isValid === true) {
                console.log('test1');
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


module.exports = {
    verifyTokenService, checkCookieService, authenticateCookieService, createJwtTokenService
}
import jwt from 'jsonwebtoken'

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

    }
    catch (e) {

    }
}

const authenticateCookieService = (req, res, next) => {
    try {

    }
    catch (e) {

    }
}


module.exports = {
    createJwtTokenService, verifyTokenService
}
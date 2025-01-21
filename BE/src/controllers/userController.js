import userService from '../serivces/userService'

const handleCreateUser = async (req, res) => {
    try {
        let data = req.body;
        let response = await userService.createUserService(data);
        if (response) {
            return res.status(200).json({
                DT: response.DT,
                EC: response.EC,
                EM: response.EM
            })
        }
        else {
            return res.status(200).json({
                DT: '',
                EC: -1,
                EM: "err from sever controller..."
            })
        }
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            DT: '',
            EC: -1,
            EM: "err from sever..."
        })
    }
}

const handleGetUser = async (req, res) => {
    try {
        let type = req.query.type;
        let userId = req.query.id;
        let response = await userService.getUserService(type, userId);
        if (response) {
            return res.status(200).json({
                DT: response.DT,
                EC: response.EC,
                EM: response.EM
            })
        }
        else {
            return res.status(200).json({
                DT: '',
                EC: -1,
                EM: "err from sever controller..."
            })
        }
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            DT: '',
            EC: -1,
            EM: "err from sever..."
        })
    }
}

const handleRegister = async (req, res) => {
    try {
        let data = req.body;
        let response = await userService.registerService(data);
        if (response) {
            return res.status(200).json({
                DT: response.DT,
                EC: response.EC,
                EM: response.EM
            })
        }
        else {
            return res.status(200).json({
                DT: '',
                EC: -1,
                EM: "err from sever controller..."
            })
        }
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            DT: '',
            EC: -1,
            EM: "err from sever..."
        })
    }
}

const handleLogin = async (req, res) => {
    try {
        let loginAcc = req.query.loginAcc;
        let password = req.query.password;

        let response = await userService.loginService(loginAcc, password);
        if (response) {
            //    res.clearCookie("user");
            res.cookie('user', response.DT.token);
            return res.status(200).json({
                DT: response.DT.data,
                EC: response.EC,
                EM: response.EM
            })
        }
        else {
            return res.status(200).json({
                DT: '',
                EC: -1,
                EM: "err from sever controller..."
            })
        }
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            DT: '',
            EC: -1,
            EM: "err from sever..."
        })
    }
}

const handleCreateItem = async (req, res) => {
    try {
        console.log('create completed');
        return res.status(200).json({
            DT: '',
            EC: -0,
            EM: "Create conpleted..."
        })

    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            DT: '',
            EC: -1,
            EM: "err from sever..."
        })
    }
}

module.exports = {
    handleCreateUser, handleGetUser, handleRegister, handleLogin, handleCreateItem
}
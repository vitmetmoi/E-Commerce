import userService from '../serivces/userService'
import { v4 as uuidv4 } from 'uuid';



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
        let response;

        response = await userService.registerService(data);

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

            console.log('res', response.DT.token);
            res.cookie("user", response.DT.token, { secure: false }).status(200).json({
                DT: response.DT.data,
                EC: response.EC,
                EM: response.EM
            });


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

const handleAccount = async (req, res) => {
    try {

        return res.status(200).json({
            DT: '',
            EC: 0,
            EM: "Check account completed!"
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

const handleUpdateUser = async (req, res) => {
    try {
        let data = req.body;
        let response = await userService.updateUserService(data);
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

const handleGetRoomId = () => {
    const randomGenUniqueName = uuidv4();
    return res.status(200).json({
        roomUrl: randomGenUniqueName
    });
}

module.exports = {
    handleGetUser, handleRegister, handleLogin, handleCreateItem,
    handleAccount, handleUpdateUser, handleGetRoomId
}
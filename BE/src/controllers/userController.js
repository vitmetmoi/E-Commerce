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
            return req.status(200).json({
                DT: '',
                EC: -1,
                EM: "err from sever controller..."
            })
        }
    }
    catch (e) {
        console.log(e);
        return req.status(200).json({
            DT: '',
            EC: -1,
            EM: "err from sever..."
        })
    }
}

module.exports = {
    handleCreateUser
}
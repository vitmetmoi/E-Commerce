import clothesService from '../serivces/clothesService'

const handleCreateClothes = async (req, res) => {
    try {
        let data = req.body;

        let response = await clothesService.createClothesService(data);

        if (response) {
            return res.status(200).json({
                DT: response.DT,
                EC: response.EC,
                EM: response.EM
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


const handleGetClothes = async (req, res) => {
    try {
        let type = req.query.type;
        let id = req.query.id;
        let response = await clothesService.getClothesService(type, id);

        if (response) {
            return res.status(200).json({
                DT: response.DT,
                EC: response.EC,
                EM: response.EM
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

const handleUpdateClothes = async (req, res) => {
    try {
        let type = req.body.type;
        let data = req.body.data;
        let response = await clothesService.getClothesService(type, data);
        if (response) {
            return res.status(200).json({
                DT: response.DT,
                EC: response.EC,
                EM: response.EM
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

const handleDeleteClothes = async (req, res) => {
    try {
        let id = req.query.id;
        console.log('id', id)
        let response = await clothesService.deleteClothesService(id);

        if (response) {
            return res.status(200).json({
                DT: response.DT,
                EC: response.EC,
                EM: response.EM
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
module.exports = {
    handleCreateClothes, handleGetClothes, handleUpdateClothes, handleDeleteClothes
}
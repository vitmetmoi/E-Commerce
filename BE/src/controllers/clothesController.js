import clothesService from '../serivces/clothesService'

const handleCreateClothes = async (req, res) => {
    try {
        let data = req.body;
        console.log('data', data)
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

module.exports = {
    handleCreateClothes
}
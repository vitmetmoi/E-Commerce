import webHookService from '../serivces/webHookService'

const handleGetPayment = async (req, res) => {
    try {
        let webHookData = req.body;
        let response = await webHookService.getPaymentWebHookService(webHookData);


        return res.status(200).json({
            DT: response.DT,
            EC: response.EC,
            EM: response.EM
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
    handleGetPayment
}
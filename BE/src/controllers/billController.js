import billService from '../serivces/billService'

const handleCreateBill = async (req, res) => {
    try {
        let billData = req.body;
        let response = await billService.createBillService(billData);

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


const handleUpdateBill = async (req, res) => {
    try {
        let billData = req.body;
        let response = billService.updateBillService(billData);

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


const handleGetBill = async (req, res) => {
    try {
        let type = req.query.type;
        let billId = req.query.billId
        let response = billService.getBillService(type, billId);

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


const handleDeleteBill = async (req, res) => {
    try {
        let webHookData = req.body;
        let response = webHookService.getPaymentWebHookService(webHookData);

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
    handleCreateBill, handleDeleteBill, handleGetBill, handleUpdateBill
}
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
        console.log('bil', billData)
        let response = await billService.updateBillService(billData);

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
        let billId = req.query.id;
        let page = req.query.page;
        let pageSize = req.query.pageSize;
        let userId = req.query.userId;
        let status = req.query.status ? req.query.status.split(',') : '';
        let response = await billService.getBillService(type, billId, page, pageSize, userId, status);

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
        let id = req.query.id;
        let response = await billService.deleteBillService(id);

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
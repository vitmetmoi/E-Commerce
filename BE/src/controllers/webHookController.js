const handleGetPayment = async (req, res) => {
    try {


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
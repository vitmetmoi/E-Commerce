import reviewService from '../serivces/reviewService'

const handleCreateReview = async (req, res) => {
    try {
        let reviewData = req.body;
        let response = await reviewService.createReviewService(reviewData);

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


const handleUpdateReview = async (req, res) => {
    try {
        let reviewData = req.body;
        console.log('bil', reviewData)
        let response = await reviewService.updateReviewService(reviewData);

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


const handleGetReview = async (req, res) => {
    try {
        let type = req.query.type;
        let reviewId = req.query.id;
        let page = req.query.page;
        let pageSize = req.query.pageSize;
        let clothesId = req.query.clothesId;
        let userId = req.query.userId;
        let star = req.query.star;
        let size = req.query.size;
        let response = await reviewService.getReviewService(type, reviewId, page, pageSize, clothesId, userId, size, star);

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


const handleDeleteReview = async (req, res) => {
    try {
        let id = req.query.id;
        let response = await reviewService.deleteReviewService(id);

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
    handleCreateReview, handleDeleteReview, handleGetReview, handleUpdateReview
}
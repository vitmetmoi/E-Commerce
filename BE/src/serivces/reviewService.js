import { includes } from "lodash";
import db from "../models"
import { Op, where } from "sequelize";
import { convertClothesImgArray } from './clothesService'
import color_size from "../models/color_size";

const checkValidReview = async (userId, clothesId) => {
    let review = await db.Review.findOne({
        where: { userId: userId, clothesId: clothesId }
    })
    if (review && review.userId && review.comment) {
        return false;
    }
    else {
        return true;
    }
}

const createReviewService = async (reviewData) => {
    try {
        if (!reviewData || !reviewData.star || !reviewData.userId || !reviewData.clothesId || !reviewData.comment) {
            return {
                DT: '',
                EC: -1,
                EM: 'Err from review service: missing parameter!'
            }
        }
        else {
            let isValid = await checkValidReview(reviewData.userId, reviewData.clothesId);
            if (isValid === false) {
                return {
                    DT: '',
                    EC: -1,
                    EM: 'You have rated this product before!'
                }
            }
            else {
                let review = await db.Review.create({
                    star: reviewData.star,
                    userId: reviewData.userId,
                    clothesId: reviewData.clothesId,
                    comment: reviewData.comment
                })

                let reviewArr = []

                reviewData.imgArr.map(item => {
                    let obj = {}
                    obj.reviewId = review.id;
                    obj.image = item;
                    reviewArr.push(obj)
                })

                await db.ReviewImage.bulkCreate(reviewArr)


                return {
                    DT: review.id,
                    EC: 0,
                    EM: 'Create review completed!'
                }
            }



        }
    }
    catch (e) {
        console.log(e);
        return {
            DT: '',
            EC: -1,
            EM: 'Err from review service!'
        }
    }
}


const updateReviewService = async (reviewData) => {
    try {
        if (!reviewData || !reviewData.amount) {
            return {
                DT: '',
                EC: -1,
                EM: 'Err from review service: missing parameter!'
            }
        }
        else {

            let review = await db.Review.findOne({
                where: { id: reviewData.id },

            })

            if (review) {

                review.status = reviewData.status;
                review.amount = reviewData.amount;
                review.bankName = reviewData.bankName;
                review.accountNumber = reviewData.accountNumber;
                review.note = reviewData.note;

                await review.save();

                return {
                    DT: review.id,
                    EC: 0,
                    EM: 'Updata review completed!'
                }
            }

        }
    }
    catch (e) {
        console.log(e);
        return {
            DT: '',
            EC: -1,
            EM: 'Err from review service!'
        }
    }
}

const getReviewService = async (type, reviewId, page, pageSize, clothesId) => {
    try {
        if (!type) {
            return {
                DT: '',
                EC: -1,
                EM: 'Err from review service: missing parameter!'
            }
        }
        else {
            if (type === 'ALL') {
                let review = await db.Review.findAll({})


                return {
                    DT: review,
                    EC: 0,
                    EM: 'Get review completed!'
                }

            }
            else if (type === 'PAGINATION') {

                const { count, rows } = await db.Review.findAndCountAll({
                    offset: (+page) * (+pageSize),
                    limit: +pageSize,
                    distinct: true,
                    include: [
                        {
                            model: db.ReviewImage,
                            order: [['createdAt', 'DESC']],
                        },
                        {
                            model: db.User,
                            order: [['createdAt', 'DESC']],
                            attributes: {
                                exclude: ['password', 'createdAt', 'updatedAt']
                            }
                        },

                    ],
                })



                return {
                    DT: {
                        rowCount: count,
                        data: rows
                    },
                    EC: 0,
                    EM: 'Get review completed!'
                }

            }

            else {
                let review = await db.Review.findOne({
                    where: { clothesId: clothesId },
                })


                return {
                    DT: review,
                    EC: 0,
                    EM: 'Get review completed!'
                }

            }



        }
    }
    catch (e) {
        console.log(e);
        return {
            DT: '',
            EC: -1,
            EM: 'Err from review service!'
        }
    }
}

const deleteReviewService = async (id) => {
    try {
        if (!id) {
            return {
                DT: '',
                EC: -1,
                EM: 'Err from review service: missing parameter!'
            }
        }
        else {

            await db.Review.destroy({ where: { id: id } })

            return {
                DT: '',
                EC: 0,
                EM: 'Delete review completed!'
            }
        }
    }
    catch (e) {
        console.log(e);
        return {
            DT: '',
            EC: -1,
            EM: 'Err from review service!'
        }
    }
}
module.exports = {
    createReviewService, getReviewService, updateReviewService, deleteReviewService
}
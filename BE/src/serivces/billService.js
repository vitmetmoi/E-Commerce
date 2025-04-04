import { includes } from "lodash";
import db from "../models"
import { Op, where } from "sequelize";
import { convertClothesImgArray } from './clothesService'
import color_size from "../models/color_size";

const createBillService = async (billData) => {
    try {
        if (!billData || !billData.time || !billData.userId || !billData.amount) {
            return {
                DT: '',
                EC: -1,
                EM: 'Err from bill service: missing parameter!'
            }
        }
        else {
            console.log('billdata', billData)

            let bill = await db.Bill.create({
                status: billData.type === 'RECEIVED' ? 'Ordering' : 'Pending',
                time: billData.time,
                userId: billData.userId,
                amount: billData.amount,
                bankName: '',
                accountNumber: '',
                note: billData.note ? billData.note : ''
            })

            if (billData && billData.colorSizeData) {
                billData.colorSizeData.map(item => {
                    item.billId = bill.id;
                    return item;
                })
            }


            await db.ShoppingCart.bulkCreate(billData.colorSizeData)

            if (billData.type !== 'RECEIVED') {
                setTimeout(async () => {

                    bill.status = 'EXPIRED';
                    await bill.save();

                }, 300000);
            }



            return {
                DT: bill.id,
                EC: 0,
                EM: 'Create bill completed!'
            }


        }
    }
    catch (e) {
        console.log(e);
        return {
            DT: '',
            EC: -1,
            EM: 'Err from bill service!'
        }
    }
}


const updateBillService = async (billData) => {
    try {
        if (!billData || !billData.amount) {
            return {
                DT: '',
                EC: -1,
                EM: 'Err from bill service: missing parameter!'
            }
        }
        else {

            let bill = await db.Bill.findOne({
                where: { id: billData.id },

            })

            if (bill) {

                bill.status = billData.status;
                bill.amount = billData.amount;
                bill.bankName = billData.bankName;
                bill.accountNumber = billData.accountNumber;
                bill.note = billData.note;

                await bill.save();

                return {
                    DT: bill.id,
                    EC: 0,
                    EM: 'Updata bill completed!'
                }
            }

        }
    }
    catch (e) {
        console.log(e);
        return {
            DT: '',
            EC: -1,
            EM: 'Err from bill service!'
        }
    }
}

const getBillService = async (type, billId, page, pageSize, userId, status) => {
    try {
        if (!type) {
            return {
                DT: '',
                EC: -1,
                EM: 'Err from bill service: missing parameter!'
            }
        }
        else {
            if (type === 'ALL') {
                let bill = await db.Bill.findAll({
                    where: {
                        status: 'Done'
                    }
                })


                return {
                    DT: bill,
                    EC: 0,
                    EM: 'Get bill completed!'
                }

            }
            else if (type === 'PAGINATION') {

                const { count, rows } = await db.Bill.findAndCountAll({
                    offset: (+page) * (+pageSize),
                    limit: +pageSize,
                    distinct: true,
                    order: [["id", "DESC"]],

                    include: [
                        {
                            model: db.ShoppingCart,
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
                    EM: 'Get bill completed!'
                }

            }

            else if (type === 'SCROLL') {

                let billData = await db.Bill.findAll({
                    offset: (+page) * (+pageSize),
                    limit: +pageSize,
                    distinct: true,
                    where: {
                        userId: userId,
                        status: status ? status : { [Op.ne]: 'EXPIRED' },
                    },
                    order: [["id", "DESC"]],
                    include: [
                        {
                            model: db.ShoppingCart,
                            order: [['createdAt', 'DESC']],
                            include: [
                                {
                                    model: db.Color_Size,
                                    include: [{
                                        model: db.Clothes,
                                        include: [{
                                            model: db.Discount
                                        },
                                        {
                                            model: db.RelevantImage
                                        }

                                        ]

                                    }]
                                }
                            ]
                        },

                    ],
                })

                // console.log('colorSize', billData)
                billData.map(item1 => {
                    item1.ShoppingCarts.map(item2 => {

                        item2.Color_Size.Clothe = convertClothesImgArray(item2.Color_Size.Clothe);
                        return item2
                    })
                    return item1;
                })

                return {
                    DT: billData,
                    EC: 0,
                    EM: 'Get bill scroll completed!',
                }

            }
            else {
                let bill = await db.Bill.findOne({
                    where: { id: billId },
                })


                return {
                    DT: bill,
                    EC: 0,
                    EM: 'Get bill completed!'
                }

            }



        }
    }
    catch (e) {
        console.log(e);
        return {
            DT: '',
            EC: -1,
            EM: 'Err from bill service!'
        }
    }
}

const deleteBillService = async (id) => {
    try {
        if (!id) {
            return {
                DT: '',
                EC: -1,
                EM: 'Err from bill service: missing parameter!'
            }
        }
        else {

            await db.Bill.destroy({ where: { id: id } })

            return {
                DT: '',
                EC: 0,
                EM: 'Delete bill completed!'
            }
        }
    }
    catch (e) {
        console.log(e);
        return {
            DT: '',
            EC: -1,
            EM: 'Err from bill service!'
        }
    }
}
module.exports = {
    createBillService, getBillService, updateBillService, deleteBillService
}
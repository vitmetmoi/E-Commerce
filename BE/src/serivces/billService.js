import db from "../models"
import { Op, where } from "sequelize";

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
        if (!billData || !billData.amount || !billData.bankName || !billData.accountNumber) {
            return {
                DT: '',
                EC: -1,
                EM: 'Err from bill service: missing parameter!'
            }
        }
        else {

            let bill = await db.Bill.findOne({ where: { id: billData.id } })

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

const getBillService = async (type, billId, page, pageSize) => {
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
                let bill = await db.Bill.findAll({})


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
                    attributes: {
                        exclude: ['colorSizeId']
                    }
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
            else {
                let bill = await db.Bill.findOne({
                    where: { id: billId },
                    attributes: {
                        exclude: ['colorSizeId']
                    }
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

module.exports = {
    createBillService, getBillService, updateBillService
}
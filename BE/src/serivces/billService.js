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

            let bill = await db.Bill.create({
                status: 'Pending',
                time: billData.time,
                userId: billData.userId,
                amount: billData.amount,
                bankName: '',
                accountNumber: '',
                note: billData.note ? billData.note : ''
            })


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

const getBillService = async (type, billId) => {
    try {
        if (!type || !billId) {
            return {
                DT: '',
                EC: -1,
                EM: 'Err from bill service: missing parameter!'
            }
        }
        else {
            if (type === 'ALL') {
                let bill = await db.Bill.findAll({})

                if (bill) {
                    return {
                        DT: bill,
                        EC: 0,
                        EM: 'Get bill completed!'
                    }
                }
            }
            else {
                let bill = await db.Bill.findOne({
                    where: { id: billId }
                })

                if (bill) {
                    return {
                        DT: bill,
                        EC: 0,
                        EM: 'Get bill completed!'
                    }
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
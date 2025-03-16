import db from "../models"
import { Op, where } from "sequelize";

const getPaymentWebHookService = async (webHookData) => {
    try {
        if (!webHookData || !webHookData.gateway || !webHookData.accountNumber || !webHookData.transferAmount) {
            return {
                DT: '',
                EC: -1,
                EM: 'Err from webhook service: missing parameter!'
            }
        }
        else {
            await console.log('webhook', webHookData)
            let description = webHookData.description;

            let productDes = description.split(' ')[1];
            let productCode = productDes.slice(2);
            console.log('pr', productCode)


            let bill = await db.Bill.findOne({
                where: { id: productCode },
                // include: [
                //     { model: db.ShoppingCart } ,
                // ]
                attributes: {
                    exclude: ['colorSizeId']
                }
            })

            bill.set({
                status: 'Done',
                bankName: webHookData.gateway,
                accountNumber: webHookData.accountNumber
            })

            await bill.save();

            return {
                DT: '',
                EC: 0,
                EM: '!'
            }
        }
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {
    getPaymentWebHookService
}
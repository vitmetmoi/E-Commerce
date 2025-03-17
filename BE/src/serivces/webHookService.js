import _ from "lodash";
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
                attributes: {
                    exclude: ['colorSizeId']
                },
                include: [
                    {
                        model: db.ShoppingCart,
                        attributes: ['billId', 'colorSizeId', 'total'],

                    }

                ],

            })


            if (webHookData.transferType === 'in'

                // && _.isEqual(webHookData.transferAmount, +bill.amount) === true

            ) {
                bill.set({
                    status: 'Done',
                    bankName: webHookData.gateway,
                    accountNumber: webHookData.accountNumber
                })



                bill.ShoppingCarts.map(async (item, index) => {

                    let product = await db.Color_Size.findOne({
                        where: { id: item.colorSizeId }
                    })
                    console.log('product', product)

                    product.set({
                        stock: product.stock - (+item.total)
                    })

                    await product.save();
                })


                await bill.save();

                return {
                    DT: '',
                    EC: 0,
                    EM: '!'
                }
            }

            else {


                return {
                    DT: '',
                    EC: 0,
                    EM: '!'
                }
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
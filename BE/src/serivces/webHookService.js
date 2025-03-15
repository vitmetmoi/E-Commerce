import db from "../models"
import { Op, where } from "sequelize";

const getPaymentWebHookService = (webHookData) => {
    try {
        if (!webHookData || !webHookData.gateway || !webHookData.accountNumber || !webHookData.code || !webHookData.transferAmount) {
            return {
                DT: '',
                EC: -1,
                EM: 'Err from webhook service: missing parameter!'
            }
        }
        else {
            console.log('webhook', webHookData)
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
import { raw } from "body-parser";
import db from "../models";

const createClothesService = async (data) => {
    try {

        if (
            !data || !data.category || !data.contentMarkdown || !data.discount
            || !data.stockData || !data.imgArray || !data.name || !data.type
            || !data.price
        ) {
            return {
                DT: "",
                EC: -1,
                EM: 'Missing parameter!'
            }
        }
        else {
            // let clothes = "test"

            let clothes = await db.Clothes.create({
                name: data.name,
                category: data.category,
                type: data.type,
                price: data.price
            });


            if (clothes && clothes.dataValues && clothes.dataValues.id) {

                let clothes_id = clothes.dataValues.id

                await db.Markdown.create({
                    clothesId: clothes_id,
                    contentMarkdown: data.contentMarkdown
                })

                await db.Discount.create({
                    clothesId: clothes_id,
                    value: data.discount
                })

                let imgArray = data.imgArray;
                let imgDataToStore = []

                imgArray.map(item => {
                    let obj = {}
                    obj.clothes_Id = clothes_id;
                    obj.image = item;
                    imgDataToStore.push(obj)
                })

                await db.RelevantImage.bulkCreate(imgDataToStore);

                return {
                    DT: "",
                    EC: 0,
                    EM: 'Create clothes completed!'
                }
            }
            else {
                return {
                    DT: "",
                    EC: -1,
                    EM: 'Err from clothes service!'
                }
            }

        }
    }
    catch (e) {
        console.log(e);
        return {
            DT: "",
            EC: -1,
            EM: 'Err from sever service...'
        }
    }
}

module.exports = {
    createClothesService
}
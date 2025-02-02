import { raw } from "body-parser";
import db from "../models";
import _ from "lodash"
import { where } from "sequelize";
import Op from "sequelize";
const validateClothes = async (name) => {
    let isValid = true;
    let clothes = await db.Clothes.findOne({
        where: { name: name },
        raw: true
    })
    console.log(clothes);
    if (clothes && !_.isEmpty(clothes)) {
        isValid = false;
    }
    return isValid;
}

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
            let isValid = await validateClothes(data.name);

            if (isValid === false) {
                return {
                    DT: "",
                    EC: -1,
                    EM: 'Product name is exist!'
                }
            }
            else {

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
                        obj.clothesId = clothes_id;
                        obj.image = item;
                        imgDataToStore.push(obj)
                    })

                    await db.RelevantImage.bulkCreate(imgDataToStore);

                    let stockDataToStore = [];
                    let stockData = data.stockData;

                    stockData.map((item) => {
                        console.log(item);
                        let obj = {}
                        obj.clothesId = clothes_id;
                        obj.color = item.color;
                        obj.size = item.size;
                        obj.stock = item.stock;
                        stockDataToStore.push(obj);
                    })

                    await db.Color_Size.bulkCreate(stockDataToStore);

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

const convertClothesImgArray = (clothesArr) => {
    if (clothesArr && clothesArr.length > 0) {
        let data = [];
        clothesArr.map((item) => {
            let child = item;
            child.RelevantImages.map((item) => {
                let base64String = new Buffer(item.image, 'base64').toString('binary');
                item.image = base64String;
                return item;
            })
            data.push(child);
        })
        return data;
    }
    else {
        return '';
    }
}

const getClothesService = async (type, id) => {
    try {
        console.log('ok');
        if (!type) {
            return {
                DT: "",
                EC: -1,
                EM: 'Missing parameter!'
            }
        }
        else {
            let data = '';
            if (type === 'ALL') {
                data = await db.Clothes.findAll({
                    include: [{
                        model: db.Discount,
                        attributes: ['id', 'value'],

                    },
                    {
                        model: db.Markdown,
                        attributes: ['id', 'contentMarkdown'],

                    },
                    {
                        model: db.RelevantImage,
                        attributes: ['id', 'image'],

                    },
                    {
                        model: db.Color_Size,
                        attributes: ['id', 'color', 'size', 'stock'],

                    }
                    ]
                })
            }

            else if (type === 'NEW') {
                data = await db.Clothes.findAll({
                    limit: 8,
                    order: [['createdAt', 'DESC']],
                    raw: true,
                    include: [{
                        model: db.Discount,
                        attributes: ['id', 'value'],

                    },
                    {
                        model: db.Markdown,
                        attributes: ['id', 'contentMarkdown'],

                    },
                    {
                        model: db.RelevantImage,
                        attributes: ['id', 'image'],

                    },
                    {
                        model: db.Color_Size,
                        attributes: ['id', 'color', 'size', 'stock'],

                    }
                    ]

                })
                data.reverse();
            }
            else {
                data = db.Clothes.findOne({
                    where: { id: id }
                })
            }

            if (data) {
                let clothesData = convertClothesImgArray(data);
                return {
                    DT: clothesData,
                    EC: 0,
                    EM: 'Done!'
                }
            }

            else {
                return {
                    DT: "",
                    EC: -1,
                    EM: 'Err from sever service...'
                }
            }

        }
    } catch (e) {
        console.log(e);
        return {
            DT: "",
            EC: -1,
            EM: 'Err from sever service...'
        }
    }
}

module.exports = {
    createClothesService, getClothesService
}
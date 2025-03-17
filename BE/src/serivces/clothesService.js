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
    if (clothesArr && _.isArray(clothesArr)) {
        let data = [];
        clothesArr.map((item) => {
            let child = item;
            child.RelevantImages && child.RelevantImages.map((item) => {
                let base64String = new Buffer(item.image, 'base64').toString('binary');
                item.image = base64String;
                return item;
            })
            data.push(child);
        })
        return data;
    }
    else if (_.isObject(clothesArr)) {
        clothesArr.RelevantImages.map((item) => {
            let base64String = new Buffer(item.image, 'base64').toString('binary');
            item.image = base64String;
            return item;
        })
        return clothesArr;
    }
    else {
        return '';
    }
}

const getClothesService = async (type, id, page, pageSize) => {
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
            console.log('p', type);

            let paginationData = {
                rowCount: 0,
                data: ''
            };

            let data = '';


            if (type === 'ALL') {
                data = await db.Clothes.findAll({
                    include: [{
                        model: db.Discount,
                        attributes: ['id', 'value'],
                        order: [['createdAt', 'DESC']],

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

            else if (type === 'PAGINATION') {
                const { count, rows } = await db.Clothes.findAndCountAll({
                    offset: (+page) * (+pageSize),
                    limit: +pageSize,
                    distinct: true,
                    include: [{
                        model: db.Discount,
                        attributes: ['id', 'value'],
                        order: [['createdAt', 'DESC']],

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
                    ],
                })

                paginationData.data = rows;
                paginationData.rowCount = count;

            }
            else if (type === 'ONE') {
                data = await db.Clothes.findOne({
                    where: { id: id },
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
            else {
                return {
                    DT: '',
                    EC: -1,
                    EM: 'Type is not exist!'
                }
            }

            if (type === 'PAGINATION') {
                paginationData.data = convertClothesImgArray(paginationData.data);

                return {
                    DT: paginationData,
                    EC: 0,
                    EM: 'Done!'
                }
            }


            else {
                let clothesData = convertClothesImgArray(data);

                return {
                    DT: clothesData,
                    EC: 0,
                    EM: 'Done!'
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

const updateClothesService = async (type, data) => {
    try {
        if (!data || !type || !data.id
            // || !data.id || !data.category || !data.contentMarkdown || !data.discount
            // || !data.stockData || !data.imgArray || !data.name || !data.type
            // || !data.price
        ) {
            return {
                DT: "",
                EC: -1,
                EM: 'Missing parameter!'
            }
        }
        else {
            if (type === 'OTHER') {
                let clothes = await db.Clothes.findOne({
                    where: { id: data.id }
                })

                if (clothes && clothes.id) {
                    await clothes.set({
                        name: data.name,
                        type: data.type,
                        category: data.category,
                        price: data.price
                    })

                    await clothes.save();

                    if (data.color_size) {
                        await db.Color_Size.destroy({ where: { clothesId: data.id } })

                        let stockData = data.color_size.map(item => {
                            item.clothesId = data.id;
                            return item;
                        })

                        await db.Color_Size.bulkCreate(stockData);

                        let discount = await db.Discount.findOne({ where: { clothesId: data.id } })
                        if (discount && discount.id) {

                            discount.value = data.discount;
                            await discount.save();

                            let markdown = await db.Markdown.findOne({ where: { clothesId: data.id } });

                            if (markdown && markdown.id) {
                                markdown.contentMarkdown = data.contentMarkdown;
                                await markdown.save();

                                return {
                                    DT: "",
                                    EC: 0,
                                    EM: 'Completed!'
                                }

                            }
                            else {
                                return {
                                    DT: "",
                                    EC: -1,
                                    EM: 'Cant not find markdown value!'
                                }
                            }
                        }
                        else {
                            return {
                                DT: "",
                                EC: -1,
                                EM: 'Cant not find discount value!'
                            }
                        }
                    }

                    else {
                        return {
                            DT: "",
                            EC: -1,
                            EM: 'Cant not find stock data!'
                        }
                    }

                }
                else {
                    return {
                        DT: "",
                        EC: -1,
                        EM: 'Can not find clothes!'
                    }
                }
            }


            else if (type === 'IMG') {

                await db.RelevantImage.destroy({ where: { clothesId: data.id } })

                let imgArrToStore = []

                if (data && data.imageArr) {
                    data.imageArr.map(item => {
                        let obj = {
                            clothesId: data.id,
                            image: item
                        }
                        imgArrToStore.push(obj)
                    })
                }

                await db.RelevantImage.bulkCreate(imgArrToStore);


                return {
                    DT: "",
                    EC: 0,
                    EM: 'Completed!'
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

const deleteClothesService = async (id) => {
    try {
        if (!id) {
            return {
                DT: "",
                EC: -1,
                EM: 'Missing parameter!'
            }
        }
        else {

            let clothes = await db.Clothes.findOne({ where: { id: id } });

            if (clothes && clothes.id) {
                await db.Clothes.destroy({ where: { id: id } })
                await db.Discount.destroy({ where: { id: id } })
                await db.RelevantImage.destroy({ where: { id: id } })
                await db.Color_Size.destroy({ where: { id: id } })

                return {
                    DT: "",
                    EC: 0,
                    EM: 'Delete clothes completed!'
                }
            }
            else {
                return {
                    DT: "",
                    EC: -1,
                    EM: 'Can not find clothes!'
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
    createClothesService, getClothesService, updateClothesService, deleteClothesService
}
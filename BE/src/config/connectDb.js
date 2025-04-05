const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DIALECT,

    dialectOptions:
        process.env.DATABASE_SSL === true ?
            {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
            :
            {}
    ,
});

const connectToDataBase = async () => {
    console.log(process.env.DATABASE_HOST, process.env.DATABASE_SSL)
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}





export default connectToDataBase;
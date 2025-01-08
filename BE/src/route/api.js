import express from "express";
import homeController from "../controller/homeController"
import userController from '../controller/userController'
import JWTservice from '../middleware/JWTservice'
const router = express.Router();

/**
 * 
 * @param {*} app :express app
 */



const initApiRoutes = (app) => {

    return app.use("/api", router)
}

export default initApiRoutes;
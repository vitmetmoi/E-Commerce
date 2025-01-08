import express from "express";
import homeController from "../controller/homeController";
import JWTservice from '../middleware/JWTservice';
const router = express.Router();

/**
 * 
 * @param {*} app :express app
 */



const initWebRoutes = (app) => {
    router.all('*', JWTservice.checkUserJWT, JWTservice.checkUserPermission);

    return app.use("/", router)
}

export default initWebRoutes;
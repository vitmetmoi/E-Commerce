import express from "express";
import homeController from "../controllers/homeController";
import JWTservice from '../middleware/JWTservice';
const router = express.Router();

/**
 * 
 * @param {*} app :express app
 */



const initWebRoutes = (app) => {
    // router.all('*', JWTservice.checkUserJWT, JWTservice.checkUserPermission);
    router.get("/", homeController.handleHelloWorld)
    return app.use("/", router)
}

export default initWebRoutes;
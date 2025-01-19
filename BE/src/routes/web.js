import express from "express";
import homeController from "../controllers/homeController";
import JWTservice from '../middleware/JWTservice';
const router = express.Router();

/**
 * 
 * @param {*} app :express app
 */



const initWebRoutes = (app) => {
    // router.all('*', JWTservice.checkCookieService, JWTservice.authenticateCookieService);

    router.get("/", homeController.handleHelloWorld)
    return app.use("/", router)
}

export default initWebRoutes;
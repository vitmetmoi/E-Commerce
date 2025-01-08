import express from "express";
import homeController from "../controllers/homeController"
import userController from '../controllers/userController'
import JWTservice from '../middleware/JWTservice'
const router = express.Router();

/**
 * 
 * @param {*} app :express app
 */



const initApiRoutes = (app) => {
    router.post("/user/create", userController.handleCreateUser)
    return app.use("/api", router)
}

export default initApiRoutes;
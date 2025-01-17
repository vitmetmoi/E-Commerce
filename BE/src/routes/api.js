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
    router.get("/user/login", userController.handleLogin)
    router.post("/user/register", userController.handleRegister)
    router.post("/user/create", userController.handleCreateUser)
    router.get("/user/get", userController.handleGetUser)
    return app.use("/api", router)
}

export default initApiRoutes;
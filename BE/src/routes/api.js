import express from "express";
import homeController from "../controllers/homeController"
import userController from '../controllers/userController'
import clothesController from "../controllers/clothesController"
import JWTservice from '../middleware/JWTservice'
const router = express.Router();

/**
 * 
 * @param {*} app :express app
 */



const initApiRoutes = (app) => {

    app.use(JWTservice.checkCookieService, JWTservice.authenticateCookieService);

    router.get("/account", userController.handleAccount)
    router.post("/item/create", userController.handleCreateItem)
    router.get("/user/login", userController.handleLogin)
    router.post("/user/register", userController.handleRegister)
    router.post("/user/create", userController.handleCreateUser)
    router.get("/user/get", userController.handleGetUser)

    //clothes

    router.post('/clothes/create', clothesController.handleCreateClothes);
    router.get('/clothes/get', clothesController.handleGetClothes);
    router.put('/clothes/update', clothesController.handleUpdateClothes);
    router.delete('/clothes/delete', clothesController.handleDeleteClothes);


    return app.use("/api", router)

}

export default initApiRoutes;
import express from "express";
import homeController from "../controllers/homeController"
import userController from '../controllers/userController'
import clothesController from "../controllers/clothesController"
import webHookController from '../controllers/webHookController'
import JWTservice from '../middleware/JWTservice'
import billController from '../controllers/billController'
const router = express.Router();

/**
 * 
 * @param {*} app :express app
 */



const initApiRoutes = (app) => {

    app.use(JWTservice.checkCookieService, JWTservice.authenticateCookieService);

    //user
    router.get("/account", userController.handleAccount)
    router.post("/item/create", userController.handleCreateItem)
    router.get("/user/login", userController.handleLogin)
    router.post("/user/register", userController.handleRegister)
    router.post("/user/create", userController.handleCreateUser)
    router.get("/user/get", userController.handleGetUser)
    router.put('/user/update', userController.handleUpdateUser)

    //clothes

    router.post('/clothes/create', clothesController.handleCreateClothes);
    router.get('/clothes/get', clothesController.handleGetClothes);
    router.put('/clothes/update', clothesController.handleUpdateClothes);
    router.delete('/clothes/delete', clothesController.handleDeleteClothes);

    //checkout + bill

    router.post('/bill/create', billController.handleCreateBill);
    router.put('/bill/update', billController.handleUpdateBill);
    router.get('/bill/get', billController.handleGetBill);
    router.delete('/bill/delete', billController.handleDeleteBill);

    //webhook
    router.post('/hooks/payment', webHookController.handleGetPayment);




    return app.use("/api", router)

}

export default initApiRoutes;
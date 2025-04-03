import express from "express";
import homeController from "../controllers/homeController"
import userController from '../controllers/userController'
import clothesController from "../controllers/clothesController"
import webHookController from '../controllers/webHookController'
import JWTservice from '../middleware/JWTservice'
import billController from '../controllers/billController'
import reviewController from '../controllers/reviewController'
import implementOpenAIService from '../middleware/OpenAI'
const router = express.Router();

/**
 * 
 * @param {*} app :express app
 */



const initApiRoutes = (app) => {

    app.use(JWTservice.checkCookieService, JWTservice.authenticateCookieService);

    //user
    router.get("/account", userController.handleAccount)
    router.get("/user/login", userController.handleLogin)
    router.post("/user/register", userController.handleRegister)
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

    //Reviews
    router.post('/review/create', reviewController.handleCreateReview);
    router.put('/review/update', reviewController.handleUpdateReview);
    router.get('/review/get', reviewController.handleGetReview);
    router.delete('/review/delete', reviewController.handleDeleteReview);

    //Socket
    router.get('/socket.io', userController.handleGetRoomId)

    //Open AI
    router.get('/openAI/get', implementOpenAIService)

    return app.use("/api", router)

}

export default initApiRoutes;
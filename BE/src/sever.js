import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from './routes/api';
import configCors from './config/cors';
import connectToDataBase from './config/connectDb';
require('dotenv').config();
const app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

//configCors
configCors(app);

//config view engine
configViewEngine(app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

//cookie parse
app.use(cookieParser())
//init web routes
initWebRoutes(app);

//init api routes
initApiRoutes(app);
const PORT = process.env.PORT || 8080;
connectToDataBase();
app.listen(PORT, () => {
    console.log(">>> Backend is running on the port = " + PORT);
})

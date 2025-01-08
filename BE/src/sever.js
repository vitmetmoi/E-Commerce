import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import initApiRoutes from './route/api'
import configCors from './config/cors'
require('dotenv').config();
const app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

//configCors
configCors(app);

//config view engine
configViewEngine(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(">>> Backend is running on the port = " + PORT);
})

import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from './routes/api';
import configCors from './config/cors';
import connectToDataBase from './config/connectDb';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import socketService from './middleware/SocketIO';
require('dotenv').config();
const app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//configCors
configCors(app);

//config view engine
configViewEngine(app);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }))

// parse application/json
app.use(bodyParser.json({ limit: '100mb' }))

//cookie parse
app.use(cookieParser())

//init api routes
initApiRoutes(app);
//init web routes
initWebRoutes(app);


connectToDataBase();

//socketService

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"],
        credentials: true,
        allowEIO3: true
    }
});

socketService(io);

//Connect

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(">>> Backend is running on the port = " + PORT);
});

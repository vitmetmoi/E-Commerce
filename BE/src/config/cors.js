var cors = require('cors');
require('dotenv').config();
const configCors = (app) => {
    const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000',
        'http://127.0.0.1:80', 'http://localhost:80', 'http://localhost',
        'http://' + process.env.HOST_URL + ':80', 'http://' + process.env.HOST_URL];

    app.use(cors({
        credentials: true,
        // origin: [process.env.REACT_URL + ':3000', process.env.REACT_URL + ':80']
        origin: allowedOrigins
    }));
    console.log('cor', process.env.REACT_URL + ':3000')

    app.use(function (req, res, next) {
        console.log('path cors', req.headers.origin)
        const origin = req.headers.origin;
        // Website you wish to allow to connect
        if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }


        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });


}

export default configCors;
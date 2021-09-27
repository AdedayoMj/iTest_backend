"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const logging_1 = __importDefault(require("./config/logging"));
const config_1 = __importDefault(require("./config/config"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const user_1 = __importDefault(require("./routes/user"));
const country_1 = __importDefault(require("./routes/country"));
const cluster_1 = __importDefault(require("cluster"));
const os_1 = require("os");
const process_1 = __importDefault(require("process"));
// const throng = require('throng')
// const WORKERS = process.env.WEB_CONCURRENCY || 1
const numCPUs = (0, os_1.cpus)().length;
if (cluster_1.default.isPrimary) {
    console.log(`Primary ${process_1.default.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}
else {
    const router = (0, express_1.default)();
    dotenv.config();
    /** Server Handling */
    const httpServer = http_1.default.createServer(router);
    /**allow cors */
    router.use((0, cors_1.default)());
    /** Connect to Firebase */
    let serviceAccount = require('./config/serviceAccountKey.json');
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(serviceAccount)
    });
    /** Connect to Mongo */
    mongoose_1.default
        .connect(config_1.default.mongo.url, config_1.default.mongo.options)
        .then((result) => {
        logging_1.default.info('Mongo Connected');
    })
        .catch((error) => {
        logging_1.default.error(error);
    });
    /** Log the request */
    router.use((req, res, next) => {
        logging_1.default.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            logging_1.default.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
        });
        next();
    });
    /** Parse the body of the request */
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    /** Routes */
    router.use('/users', user_1.default);
    router.use('/countries', country_1.default);
    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('Not found');
        res.status(404).json({
            message: error.message
        });
    });
    /** Listen */
    httpServer.listen(process_1.default.env.PORT || 2121, () => logging_1.default.info(`Server is running ${config_1.default.server.host}:${process_1.default.env.PORT}`));
    console.log(`Worker ${process_1.default.pid} started`);
}
//# sourceMappingURL=server.js.map
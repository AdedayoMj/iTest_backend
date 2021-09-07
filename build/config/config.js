"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    mongo: {
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            socketTimeoutMS: 30000,
            keepAlive: true,
            poolSize: 50,
            autoIndex: false
        },
        url: 'mongodb+srv://iTest_Kanon_user:iTest1234@itestkanon.xr42i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    },
    server: {
        host: 'localhost',
        port: process.env.PORT
    }
};
exports.default = config;
//# sourceMappingURL=config.js.map
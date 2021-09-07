"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../config/logging"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const extractFirebaseInfo = (req, res, next) => {
    var _a;
    logging_1.default.info('Validating firebase token');
    /**Bearer token */
    let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token) {
        firebase_admin_1.default
            .auth()
            .verifyIdToken(token)
            .then((result) => {
            if (result) {
                res.locals.firebase = result;
                res.locals.fire_token = token;
                next();
            }
            else {
                logging_1.default.warn('Token invalid, Unauthorized');
                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }
        })
            .catch((error) => {
            logging_1.default.error(error);
            return res.status(401).json({
                error,
                message: 'Unauthorized'
            });
        });
    }
    else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};
exports.default = extractFirebaseInfo;
//# sourceMappingURL=extract_firebase_info.js.map
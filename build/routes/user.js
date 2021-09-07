"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controllers/user"));
const extract_firebase_info_1 = __importDefault(require("../middleware/extract_firebase_info"));
const router = express_1.default.Router();
router.get('/validate', extract_firebase_info_1.default, user_1.default.validate);
router.get('/:userID', user_1.default.read);
router.post('/create', extract_firebase_info_1.default, user_1.default.create);
router.post('/login', extract_firebase_info_1.default, user_1.default.login);
router.post('/register', extract_firebase_info_1.default, user_1.default.register);
router.get('/', user_1.default.readAll);
module.exports = router;
//# sourceMappingURL=user.js.map
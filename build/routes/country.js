"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const country_1 = __importDefault(require("../controllers/country"));
const extract_firebase_info_1 = __importDefault(require("../middleware/extract_firebase_info"));
const router = express_1.default.Router();
router.get('/country/:countryQuery', extract_firebase_info_1.default, country_1.default.getCountryByName);
router.get('/', extract_firebase_info_1.default, country_1.default.getAll);
module.exports = router;
//# sourceMappingURL=country.js.map
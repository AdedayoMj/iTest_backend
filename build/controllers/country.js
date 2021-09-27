"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const logging_1 = __importDefault(require("../config/logging"));
const getAll = (req, res, next) => {
    logging_1.default.info('Getting all countries information from api ...');
    axios_1.default.get('https://restcountries.eu/rest/v2/all')
        .then((country) => {
        return res.status(200).json({
            countries: country.data
        });
        // Code for handling the response
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
        // Code for handling the error
    });
};
const getCountryByName = (req, res, next) => {
    logging_1.default.info('Query coutries route called');
    console.log(req.params);
    const query = req.params.countryQuery;
    axios_1.default.get(`https://restcountries.eu/rest/v2/name/${query}`)
        .then((country) => {
        if (country) {
            return res.status(200).json({
                countries: country.data
            });
        }
        else {
            return res.status(404).json({
                error: 'Country not found.'
            });
        }
        // Code for handling the response
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
        // Code for handling the error
    });
};
exports.default = {
    getCountryByName,
    getAll
};
//# sourceMappingURL=country.js.map
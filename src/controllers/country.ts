import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';


const getAll = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Getting all countries information from api ...');

    axios.get('https://restcountries.eu/rest/v2/all')
        .then((country) => {
            return res.status(200).json({
                countries:  country.data
            });

            // Code for handling the response
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
            // Code for handling the error
        })
};
const getCountryByName = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Query coutries route called');
    console.log(req.params);
    const query = req.params.countryQuery;
    

    axios.get(`https://restcountries.eu/rest/v2/name/${query}`)
        .then((country) => {
            if (country) {
                return res.status(200).json({
                    countries:  country.data
                });
            } else {
                return res.status(404).json({
                    error: 'Country not found.'
                });
            }

            // Code for handling the response
        })
        .catch((error) => {
            logging.error(error.message);

            return res.status(500).json({
                message: error.message
            });
            // Code for handling the error
        })
};
export default {
    getCountryByName,
    getAll
};
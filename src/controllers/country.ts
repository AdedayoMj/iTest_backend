import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';



const getAll = async (req: Request, res: Response, next: NextFunction) => {
    logging.info('Getting all countries information from api ...');

    try {
        let response = await axios.get(`https://api.countrylayer.com/rest/v2/all?access_key=${process.env.COUNTRY_KEY}`,)
  
        return await res.status(200).json({
            countries: response.data
        });
       
    } catch (error: any) {
        logging.error(error.message);

        return res.status(500).json({
            message: error.message
        });

    }
};
const getCountryByName = async (req: Request, res: Response, next: NextFunction) => {
    logging.info('Query coutries route called');
    try {
        const query = req.params.countryQuery;
console.log(query)

        let response = await axios.get(`https://api.countrylayer.com/v2/name/${query}?access_key=${process.env.COUNTRY_KEY}`)

        if (response) {
            return res.status(200).json({
                countries: response.data
            });
        } else {
            return res.status(404).json({
                error: 'Country not found.'
            });
        }

    } catch (error: any) {
        logging.error(error.message);

        return res.status(500).json({
            message: error.message
        });
        // Code for handling the error
    }
};
export default {
    getCountryByName,
    getAll
};
import express from 'express';
import controller from '../controllers/country';
import extractFirebaseInfo from '../middleware/extract_firebase_info';

const router = express.Router();

router.get('/country/:countryQuery',controller.getCountryByName);
router.get('/',controller.getAll);

export = router;

import express from 'express';
import controller from '../controllers/country';
import extractFirebaseInfo from '../middleware/extract_firebase_info';

const router = express.Router();


router.get('/country/:countryQuery',extractFirebaseInfo,controller.getCountryByName);
router.get('/',extractFirebaseInfo,controller.getAll);

export = router;

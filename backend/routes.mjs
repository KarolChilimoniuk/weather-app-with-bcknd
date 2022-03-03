import express from 'express';
import {getLocWeatherData, getRequiredWeatherData} from './controllers.mjs';

const router = express.Router();

router.post('/', getLocWeatherData);
router.post('/reqWeather',getRequiredWeatherData);

export default router;
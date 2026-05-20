import { Router } from 'express';
import { getBirthChart, getCompatibilityMatch } from '../controllers/astrology.controller';

const router = Router();

// Endpoint for calculating complete birth chart predictions
router.post('/chart', getBirthChart);

// Endpoint for Ashtakoot matching between two profiles
router.post('/match', getCompatibilityMatch);

export default router;

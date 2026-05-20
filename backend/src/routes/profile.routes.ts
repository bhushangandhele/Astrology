import { Router } from 'express';
import { saveProfile, getProfiles, deleteProfile } from '../controllers/profile.controller';

const router = Router();

// Save a new birth profile
router.post('/', saveProfile);

// Get list of all saved profiles
router.get('/', getProfiles);

// Delete a saved profile by ID
router.delete('/:id', deleteProfile);

export default router;

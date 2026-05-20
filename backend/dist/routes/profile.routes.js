"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_controller_1 = require("../controllers/profile.controller");
const router = (0, express_1.Router)();
// Save a new birth profile
router.post('/', profile_controller_1.saveProfile);
// Get list of all saved profiles
router.get('/', profile_controller_1.getProfiles);
// Delete a saved profile by ID
router.delete('/:id', profile_controller_1.deleteProfile);
exports.default = router;

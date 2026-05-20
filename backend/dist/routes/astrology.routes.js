"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const astrology_controller_1 = require("../controllers/astrology.controller");
const router = (0, express_1.Router)();
// Endpoint for calculating complete birth chart predictions
router.post('/chart', astrology_controller_1.getBirthChart);
// Endpoint for Ashtakoot matching between two profiles
router.post('/match', astrology_controller_1.getCompatibilityMatch);
exports.default = router;

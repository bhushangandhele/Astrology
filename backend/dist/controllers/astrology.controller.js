"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompatibilityMatch = exports.getBirthChart = void 0;
const chart_1 = require("../engine/chart");
const dasha_1 = require("../engine/dasha");
const compatibility_1 = require("../engine/compatibility");
const interpretations_1 = require("../data/interpretations");
const getBirthChart = async (req, res) => {
    try {
        const { name, dob, tob, latitude, longitude, timezone, place } = req.body;
        if (!name || !dob || !tob || latitude === undefined || longitude === undefined || !timezone) {
            res.status(400).json({ error: 'Missing required parameters. Required: name, dob, tob, latitude, longitude, timezone' });
            return;
        }
        // 1. Calculate Birth Chart
        const chart = (0, chart_1.calculateBirthChart)(name, dob, tob, Number(latitude), Number(longitude), timezone, place || '');
        // 2. Calculate Vimshottari Dashas
        const moonLong = chart.planets.Moon.longitude;
        const dashas = (0, dasha_1.calculateVimshottariDasha)(moonLong, dob, tob);
        // 3. Compile Interpretations & Predictions
        const predictions = {
            ascendant: interpretations_1.LAGNA_INTERPRETATIONS[chart.ascendant.signNumber] || {
                title: `${chart.ascendant.sign} Ascendant`,
                text: 'You have a highly unique and balanced personality corresponding to your Ascendant sign.'
            },
            sunPlacement: interpretations_1.SUN_HOUSE_INTERPRETATIONS[chart.planets.Sun.house] || {
                title: `Sun in House ${chart.planets.Sun.house}`,
                text: 'The Sun represents your core soul essence, health, and status. Its placement sheds light on your path of career and ambition.'
            },
            moonPlacement: interpretations_1.MOON_HOUSE_INTERPRETATIONS[chart.planets.Moon.house] || {
                title: `Moon in House ${chart.planets.Moon.house}`,
                text: 'The Moon represents your emotional nature, mental peace, and nurturing qualities.'
            },
            nakshatra: interpretations_1.NAKSHATRA_INTERPRETATIONS[chart.planets.Moon.nakshatraNumber] || {
                title: `${chart.planets.Moon.nakshatra} Nakshatra`,
                text: 'Your birth Nakshatra determines your basic temperament, instinctive reactions, and major life themes.'
            },
            birthDasha: interpretations_1.DASHA_INTERPRETATIONS[dashas[0].lord] || {
                title: `${dashas[0].lord} Mahadasha`,
                text: 'Your current major Vimshottari planetary period shapes the primary focus and flow of events in your life.'
            }
        };
        res.status(200).json({
            chart,
            dashas,
            predictions
        });
    }
    catch (err) {
        console.error('Error generating birth chart:', err);
        res.status(500).json({ error: 'Failed to generate birth chart calculations', details: err.message });
    }
};
exports.getBirthChart = getBirthChart;
const getCompatibilityMatch = async (req, res) => {
    try {
        const { profileA, profileB } = req.body;
        if (!profileA || !profileB) {
            res.status(400).json({ error: 'Missing profile parameters. Required: profileA and profileB' });
            return;
        }
        // 1. Calculate Moon Longitudes for both profiles
        const chartA = (0, chart_1.calculateBirthChart)(profileA.name, profileA.dob, profileA.tob, Number(profileA.latitude), Number(profileA.longitude), profileA.timezone, profileA.place || '');
        const chartB = (0, chart_1.calculateBirthChart)(profileB.name, profileB.dob, profileB.tob, Number(profileB.latitude), Number(profileB.longitude), profileB.timezone, profileB.place || '');
        const moonLongA = chartA.planets.Moon.longitude;
        const moonLongB = chartB.planets.Moon.longitude;
        // 2. Perform Ashtakoot Gun Milan Matching
        const match = (0, compatibility_1.calculateAshtakootMatch)(moonLongA, moonLongB);
        res.status(200).json({
            profileA: {
                name: chartA.name,
                rashi: chartA.planets.Moon.sign,
                nakshatra: chartA.planets.Moon.nakshatra,
                pada: chartA.planets.Moon.pada
            },
            profileB: {
                name: chartB.name,
                rashi: chartB.planets.Moon.sign,
                nakshatra: chartB.planets.Moon.nakshatra,
                pada: chartB.planets.Moon.pada
            },
            match
        });
    }
    catch (err) {
        console.error('Error in compatibility match:', err);
        res.status(500).json({ error: 'Failed to calculate compatibility score', details: err.message });
    }
};
exports.getCompatibilityMatch = getCompatibilityMatch;

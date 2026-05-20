"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chart_1 = require("./engine/chart");
const dasha_1 = require("./engine/dasha");
const compatibility_1 = require("./engine/compatibility");
console.log('==================================================');
console.log('   VERIFYING ASTROLOGICAL CALCULATIONS ENGINE     ');
console.log('==================================================');
try {
    // Test case: Birth chart for 1st Jan 1980 at 12:00 PM in Delhi, India
    const name = 'Test Profile';
    const dob = '1980-01-01';
    const tob = '12:00';
    const lat = 28.6139;
    const lon = 77.2090;
    const tz = 'Asia/Kolkata';
    console.log(`Calculating Birth Chart for: ${name}`);
    console.log(`Date: ${dob}, Time: ${tob}, Lat: ${lat}°N, Lon: ${lon}°E, TZ: ${tz}`);
    console.log('--------------------------------------------------');
    const chart = (0, chart_1.calculateBirthChart)(name, dob, tob, lat, lon, tz);
    console.log(`Julian Date: ${chart.julianDate.toFixed(4)}`);
    console.log(`Lahiri Ayanamsa: ${chart.ayanamsa.toFixed(4)}°`);
    console.log(`Sidereal Ascendant (Lagna): ${chart.ascendant.sign} (${chart.ascendant.degreeInSign.toFixed(2)}°)`);
    console.log('--------------------------------------------------');
    console.log('Planetary Placements:');
    for (const [pName, p] of Object.entries(chart.planets)) {
        console.log(`- ${pName.padEnd(8)}: Sign: ${p.sign.padEnd(12)} | Degree: ${p.degreeInSign.toFixed(2)}° | Nakshatra: ${p.nakshatra} (Pada ${p.pada}) | House: ${p.house}`);
    }
    console.log('--------------------------------------------------');
    console.log('Calculating Vimshottari Dashas...');
    const dashas = (0, dasha_1.calculateVimshottariDasha)(chart.planets.Moon.longitude, dob, tob);
    console.log(`Birth Mahadasha Lord: ${dashas[0].lord} (Balance remaining: ${dashas[0].subDashas[0].endDate})`);
    console.log(`Next Mahadasha Lord: ${dashas[1].lord} (Starts: ${dashas[1].startDate})`);
    console.log('--------------------------------------------------');
    console.log('Verifying Compatibility Match (Ashtakoot Gun Milan)...');
    // Match with someone born 2nd Jan 1982 at 15:30 in Mumbai, India
    const partnerMoonLong = 45.0; // Say partner Moon is at 45 degrees (Taurus Rohini)
    const match = (0, compatibility_1.calculateAshtakootMatch)(chart.planets.Moon.longitude, partnerMoonLong);
    console.log(`Total Score: ${match.score} / ${match.maxScore}`);
    console.log(`Verdict: ${match.verdict}`);
    console.log('==================================================');
}
catch (err) {
    console.error('Error during engine verification:', err);
}

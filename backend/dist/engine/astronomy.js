"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NAKSHATRAS = exports.RASHIS = void 0;
exports.getPlacementInfo = getPlacementInfo;
exports.RASHIS = [
    { number: 1, name: 'Aries', sanskritName: 'Mesha', ruler: 'Mars', element: 'Fire', quality: 'Cardinal' },
    { number: 2, name: 'Taurus', sanskritName: 'Vrishabha', ruler: 'Venus', element: 'Earth', quality: 'Fixed' },
    { number: 3, name: 'Gemini', sanskritName: 'Mithuna', ruler: 'Mercury', element: 'Air', quality: 'Mutable' },
    { number: 4, name: 'Cancer', sanskritName: 'Karka', ruler: 'Moon', element: 'Water', quality: 'Cardinal' },
    { number: 5, name: 'Leo', sanskritName: 'Simha', ruler: 'Sun', element: 'Fire', quality: 'Fixed' },
    { number: 6, name: 'Virgo', sanskritName: 'Kanya', ruler: 'Mercury', element: 'Earth', quality: 'Mutable' },
    { number: 7, name: 'Libra', sanskritName: 'Tula', ruler: 'Venus', element: 'Air', quality: 'Cardinal' },
    { number: 8, name: 'Scorpio', sanskritName: 'Vrishchika', ruler: 'Mars', element: 'Water', quality: 'Fixed' },
    { number: 9, name: 'Sagittarius', sanskritName: 'Dhanu', ruler: 'Jupiter', element: 'Fire', quality: 'Mutable' },
    { number: 10, name: 'Capricorn', sanskritName: 'Makara', ruler: 'Saturn', element: 'Earth', quality: 'Cardinal' },
    { number: 11, name: 'Aquarius', sanskritName: 'Kumbha', ruler: 'Saturn', element: 'Air', quality: 'Fixed' },
    { number: 12, name: 'Pisces', sanskritName: 'Meena', ruler: 'Jupiter', element: 'Water', quality: 'Mutable' }
];
exports.NAKSHATRAS = [
    { number: 1, name: 'Ashwini', ruler: 'Ketu', startDegree: 0, endDegree: 13.3333 },
    { number: 2, name: 'Bharani', ruler: 'Venus', startDegree: 13.3333, endDegree: 26.6666 },
    { number: 3, name: 'Krittika', ruler: 'Sun', startDegree: 26.6666, endDegree: 40 },
    { number: 4, name: 'Rohini', ruler: 'Moon', startDegree: 40, endDegree: 53.3333 },
    { number: 5, name: 'Mrigashira', ruler: 'Mars', startDegree: 53.3333, endDegree: 66.6666 },
    { number: 6, name: 'Ardra', ruler: 'Rahu', startDegree: 66.6666, endDegree: 80 },
    { number: 7, name: 'Punarvasu', ruler: 'Jupiter', startDegree: 80, endDegree: 93.3333 },
    { number: 8, name: 'Pushya', ruler: 'Saturn', startDegree: 93.3333, endDegree: 106.6666 },
    { number: 9, name: 'Ashlesha', ruler: 'Mercury', startDegree: 106.6666, endDegree: 120 },
    { number: 10, name: 'Magha', ruler: 'Ketu', startDegree: 120, endDegree: 133.3333 },
    { number: 11, name: 'Purva Phalguni', ruler: 'Venus', startDegree: 133.3333, endDegree: 146.6666 },
    { number: 12, name: 'Uttara Phalguni', ruler: 'Sun', startDegree: 146.6666, endDegree: 160 },
    { number: 13, name: 'Hasta', ruler: 'Moon', startDegree: 160, endDegree: 173.3333 },
    { number: 14, name: 'Chitra', ruler: 'Mars', startDegree: 173.3333, endDegree: 186.6666 },
    { number: 15, name: 'Swati', ruler: 'Rahu', startDegree: 186.6666, endDegree: 200 },
    { number: 16, name: 'Vishakha', ruler: 'Jupiter', startDegree: 200, endDegree: 213.3333 },
    { number: 17, name: 'Anuradha', ruler: 'Saturn', startDegree: 213.3333, endDegree: 226.6666 },
    { number: 18, name: 'Jyeshtha', ruler: 'Mercury', startDegree: 226.6666, endDegree: 240 },
    { number: 19, name: 'Mula', ruler: 'Ketu', startDegree: 240, endDegree: 253.3333 },
    { number: 20, name: 'Purva Ashadha', ruler: 'Venus', startDegree: 253.3333, endDegree: 266.6666 },
    { number: 21, name: 'Uttara Ashadha', ruler: 'Sun', startDegree: 266.6666, endDegree: 280 },
    { number: 22, name: 'Shravana', ruler: 'Moon', startDegree: 280, endDegree: 293.3333 },
    { number: 23, name: 'Dhanishta', ruler: 'Mars', startDegree: 293.3333, endDegree: 306.6666 },
    { number: 24, name: 'Shatabhisha', ruler: 'Rahu', startDegree: 306.6666, endDegree: 320 },
    { number: 25, name: 'Purva Bhadrapada', ruler: 'Jupiter', startDegree: 320, endDegree: 333.3333 },
    { number: 26, name: 'Uttara Bhadrapada', ruler: 'Saturn', startDegree: 333.3333, endDegree: 346.6666 },
    { number: 27, name: 'Revati', ruler: 'Mercury', startDegree: 346.6666, endDegree: 360 }
];
/**
 * Maps a sidereal longitude to Sign and Nakshatra placements.
 * @param longitude Longitude in degrees (0 to 360)
 */
function getPlacementInfo(longitude) {
    const normLong = (longitude % 360 + 360) % 360;
    // 1. Calculate Sign (Rashi) Info
    const signNumber = Math.floor(normLong / 30) + 1;
    const degreeInSign = normLong % 30;
    const rashi = exports.RASHIS[signNumber - 1];
    // 2. Calculate Nakshatra Info
    // A Nakshatra is exactly 13 degrees 20 minutes = 13.3333 degrees
    const nakDegreeLength = 360 / 27; // 13.33333333
    const nakIndex = Math.floor(normLong / nakDegreeLength);
    const nakshatraObj = exports.NAKSHATRAS[nakIndex];
    // 3. Calculate Pada (each Nakshatra is divided into 4 padas of 3.3333 degrees each)
    const degreeInNak = normLong % nakDegreeLength;
    const pada = Math.floor(degreeInNak / (nakDegreeLength / 4)) + 1;
    return {
        longitude: normLong,
        sign: rashi.name,
        signNumber: rashi.number,
        sanskritSign: rashi.sanskritName,
        signRuler: rashi.ruler,
        degreeInSign,
        nakshatra: nakshatraObj.name,
        nakshatraNumber: nakshatraObj.number,
        nakshatraRuler: nakshatraObj.ruler,
        pada: pada > 4 ? 4 : pada
    };
}

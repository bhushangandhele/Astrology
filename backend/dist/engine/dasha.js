"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DASHA_CYCLE = void 0;
exports.calculateVimshottariDasha = calculateVimshottariDasha;
const astronomy_1 = require("./astronomy");
exports.DASHA_CYCLE = [
    { name: 'Ketu', years: 7 },
    { name: 'Venus', years: 20 },
    { name: 'Sun', years: 6 },
    { name: 'Moon', years: 10 },
    { name: 'Mars', years: 7 },
    { name: 'Rahu', years: 18 },
    { name: 'Jupiter', years: 16 },
    { name: 'Saturn', years: 19 },
    { name: 'Mercury', years: 17 }
];
/**
 * Helper to add fractional years to a Date object.
 */
function addYears(date, years) {
    const newDate = new Date(date);
    const fullYears = Math.floor(years);
    const fraction = years - fullYears;
    newDate.setFullYear(newDate.getFullYear() + fullYears);
    if (fraction > 0) {
        // Add fraction of a year in milliseconds
        const msInYear = 365.25 * 24 * 60 * 60 * 1000;
        newDate.setTime(newDate.getTime() + fraction * msInYear);
    }
    return newDate;
}
function formatDate(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}
/**
 * Calculates Vimshottari Dasha periods based on Moon's Sidereal Longitude.
 * @param moonLongitude Sidereal longitude of the Moon in degrees
 * @param dobString Date of birth (YYYY-MM-DD)
 * @param tobString Time of birth (HH:MM)
 */
function calculateVimshottariDasha(moonLongitude, dobString, tobString) {
    const birthPlacement = (0, astronomy_1.getPlacementInfo)(moonLongitude);
    const nakNumber = birthPlacement.nakshatraNumber; // 1-27
    const nakDegreeLength = 360 / 27; // 13.33333
    // 1. Determine ruling planet index at birth
    // Nakshatra 1 is ruled by Ketu (index 0). Index = (nakNumber - 1) % 9
    const birthLordIndex = (nakNumber - 1) % 9;
    const birthLord = exports.DASHA_CYCLE[birthLordIndex];
    // 2. Determine balance of birth Dasha
    const startDegreeOfNak = (nakNumber - 1) * nakDegreeLength;
    const degreePassedInNak = moonLongitude - startDegreeOfNak;
    const fractionPassed = degreePassedInNak / nakDegreeLength;
    const fractionRemaining = 1.0 - Math.max(0, Math.min(1, fractionPassed));
    const dashaBalanceYears = fractionRemaining * birthLord.years;
    // 3. Create birth Date object
    let currentDate = new Date(`${dobString}T${tobString}:00`);
    const dashas = [];
    // Generate 120-year cycle starting with the birth dasha
    let lordIdx = birthLordIndex;
    let isFirst = true;
    for (let i = 0; i < 9; i++) {
        const lord = exports.DASHA_CYCLE[lordIdx];
        const duration = isFirst ? dashaBalanceYears : lord.years;
        const startDate = new Date(currentDate);
        const endDate = addYears(currentDate, duration);
        currentDate = endDate;
        // Calculate Antardashas (sub-dashas)
        const subDashas = [];
        let subCurrentDate = new Date(startDate);
        // Antardasha cycle starts with the Mahadasha lord itself
        let subLordIdx = lordIdx;
        for (let j = 0; j < 9; j++) {
            const subLord = exports.DASHA_CYCLE[subLordIdx];
            // Formula: (Mahadasha Years * Antardasha Lord Years) / 120
            // If it is the first Mahadasha, the sub-dashas are scaled proportionally
            const totalMahadashaYears = lord.years;
            const factor = isFirst ? (dashaBalanceYears / totalMahadashaYears) : 1.0;
            const subDuration = ((lord.years * subLord.years) / 120) * factor;
            const subStart = new Date(subCurrentDate);
            const subEnd = addYears(subCurrentDate, subDuration);
            subCurrentDate = subEnd;
            subDashas.push({
                lord: subLord.name,
                startDate: formatDate(subStart),
                endDate: formatDate(subEnd)
            });
            subLordIdx = (subLordIdx + 1) % 9;
        }
        dashas.push({
            lord: lord.name,
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
            subDashas
        });
        isFirst = false;
        lordIdx = (lordIdx + 1) % 9;
    }
    return dashas;
}

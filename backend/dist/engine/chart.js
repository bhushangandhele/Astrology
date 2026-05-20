"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJulianDate = getJulianDate;
exports.getObliquity = getObliquity;
exports.calculateBirthChart = calculateBirthChart;
const astronomy_engine_1 = require("astronomy-engine");
const ayanamsa_1 = require("./ayanamsa");
const astronomy_1 = require("./astronomy");
/**
 * Calculates Julian Date from a UTC Date object.
 */
function getJulianDate(date) {
    const timeMs = date.getTime();
    // Julian Date at J2000.0 is 2451545.0 corresponding to UTC Jan 1.5, 2000
    return 2440587.5 + timeMs / 86400000.0;
}
/**
 * Calculates the true obliquity of date using IAU 1980 formula.
 */
function getObliquity(julianDate) {
    const T = (julianDate - 2451545.0) / 36525.0;
    // Obliquity in degrees
    const eps = 23.4392911 - (46.8150 * T + 0.00059 * T * T - 0.001813 * T * T * T) / 3600;
    return eps;
}
/**
 * Generates a full birth chart.
 */
function calculateBirthChart(name, dob, // YYYY-MM-DD
tob, // HH:MM
latitude, longitude, timezone, place = '') {
    // 1. Parse date and time in local timezone to get UTC Date object
    // Standard format: 'YYYY-MM-DDTHH:MM:00'
    const localDateTimeStr = `${dob}T${tob}:00`;
    // Calculate timezone offset in milliseconds
    // We can also calculate UTC date using standard temporal/offset values if needed,
    // but for simplicity we parse it directly by resolving the offset
    // If we just use new Date(localDateTimeStr), JS parses it in host's timezone.
    // To handle the input timezone properly, we can parse the parts and adjust using
    // a robust timezone converter or standard offset parsing.
    // Determine UTC time offset
    // We can convert the date by creating a Date object and adjusting for the target timezone
    const utcDate = new Date(new Date(localDateTimeStr).toLocaleString('en-US', { timeZone: timezone }));
    const hostDate = new Date(localDateTimeStr);
    const diffMs = hostDate.getTime() - utcDate.getTime();
    const birthDateUTC = new Date(hostDate.getTime() + diffMs);
    // 2. Initialize AstroTime for astronomy-engine
    const time = (0, astronomy_engine_1.MakeTime)(birthDateUTC);
    const jd = getJulianDate(birthDateUTC);
    const ayanamsa = (0, ayanamsa_1.getAyanamsa)(jd);
    // 3. Compute Ascendant (Lagna)
    // Get Greenwich Apparent Sidereal Time (GAST) in hours
    const gastHours = (0, astronomy_engine_1.SiderealTime)(time);
    const gastDeg = gastHours * 15;
    const lst = (gastDeg + longitude % 360 + 360) % 360;
    const eps = getObliquity(jd);
    const LST_rad = lst * Math.PI / 180;
    const eps_rad = eps * Math.PI / 180;
    const lat_rad = latitude * Math.PI / 180;
    const y = Math.cos(LST_rad);
    const x = -(Math.sin(eps_rad) * Math.tan(lat_rad) + Math.cos(eps_rad) * Math.sin(LST_rad));
    let tropicalAsc = Math.atan2(y, x) * 180 / Math.PI;
    tropicalAsc = (tropicalAsc % 360 + 360) % 360;
    const siderealAsc = (0, ayanamsa_1.toSidereal)(tropicalAsc, jd);
    const ascPlacement = (0, astronomy_1.getPlacementInfo)(siderealAsc);
    const ascendant = {
        name: 'Ascendant',
        ...ascPlacement
    };
    // 4. Compute Planetary Positions (Sidereal)
    const planetNames = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];
    const planets = {};
    for (const pName of planetNames) {
        let tropicalLon = 0;
        if (pName === 'Sun') {
            const earthLon = (0, astronomy_engine_1.EclipticLongitude)('Earth', time);
            tropicalLon = (earthLon + 180) % 360;
        }
        else {
            tropicalLon = (0, astronomy_engine_1.EclipticLongitude)(pName, time);
        }
        const siderealLon = (0, ayanamsa_1.toSidereal)(tropicalLon, jd);
        const placement = (0, astronomy_1.getPlacementInfo)(siderealLon);
        planets[pName] = {
            name: pName,
            ...placement
        };
    }
    // 5. Calculate Rahu and Ketu (Mean Nodes)
    // Mean Node formula
    const T_node = (jd - 2451545.0) / 36525.0;
    let tropicalRahu = (125.044522 - 1934.136261 * T_node + 0.002078 * T_node * T_node) % 360;
    if (tropicalRahu < 0)
        tropicalRahu += 360;
    const siderealRahu = (0, ayanamsa_1.toSidereal)(tropicalRahu, jd);
    const siderealKetu = (siderealRahu + 180) % 360;
    planets['Rahu'] = {
        name: 'Rahu',
        ...(0, astronomy_1.getPlacementInfo)(siderealRahu)
    };
    planets['Ketu'] = {
        name: 'Ketu',
        ...(0, astronomy_1.getPlacementInfo)(siderealKetu)
    };
    // 6. Map Houses using Whole Sign System
    // The sign of the Lagna becomes the 1st House.
    const lagnaSignNum = ascendant.signNumber; // 1-12
    const houses = {};
    for (let h = 1; h <= 12; h++) {
        // Determine the sign number for this house (1-based, wrapping around 12)
        const signNum = ((lagnaSignNum - 1 + (h - 1)) % 12) + 1;
        const rashi = astronomy_1.RASHIS[signNum - 1];
        houses[h] = {
            houseNumber: h,
            signName: rashi.name,
            signNumber: rashi.number,
            sanskritSign: rashi.sanskritName,
            signRuler: rashi.ruler,
            planets: []
        };
    }
    // Assign planets to houses based on their sign numbers
    for (const [pName, placement] of Object.entries(planets)) {
        const pSignNum = placement.signNumber;
        // Find house that holds this sign number
        for (let h = 1; h <= 12; h++) {
            if (houses[h].signNumber === pSignNum) {
                houses[h].planets.push(pName);
                // Also add house number to the planet's placement info
                planets[pName].house = h;
                break;
            }
        }
    }
    return {
        name,
        dob,
        tob,
        place,
        latitude,
        longitude,
        timezone,
        julianDate: jd,
        ayanamsa,
        ascendant,
        planets,
        houses
    };
}

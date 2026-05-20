"use strict";
/**
 * Calculations for Lahiri Ayanamsa (Chitra Paksha Ayanamsa)
 * Used to convert Tropical (Western) coordinates to Sidereal (Vedic) coordinates.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAyanamsa = getAyanamsa;
exports.toSidereal = toSidereal;
/**
 * Calculates the Lahiri Ayanamsa in degrees for a given Julian Date.
 * Formula:
 * T = (JD - 2415020.5) / 36525.0 (Centuries since 1900-Jan-0.5)
 * Ayanamsa = 22.460148 + 1.396042 * T + 0.000308 * T^2
 *
 * @param julianDate Julian Date in UTC
 * @returns Ayanamsa in degrees
 */
function getAyanamsa(julianDate) {
    const T = (julianDate - 2415020.5) / 36525.0;
    const ayanamsa = 22.460148 + 1.396042 * T + 0.000308 * T * T;
    return ayanamsa;
}
/**
 * Converts a Tropical ecliptic longitude to Sidereal (Vedic) longitude.
 * @param tropicalLongitude Longitude in degrees (0 to 360)
 * @param julianDate Julian Date
 * @returns Sidereal longitude in degrees (0 to 360)
 */
function toSidereal(tropicalLongitude, julianDate) {
    const ayanamsa = getAyanamsa(julianDate);
    let sidereal = (tropicalLongitude - ayanamsa) % 360;
    if (sidereal < 0) {
        sidereal += 360;
    }
    return sidereal;
}

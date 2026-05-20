"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const astronomy_engine_1 = require("astronomy-engine");
const time = (0, astronomy_engine_1.MakeTime)(new Date());
try {
    console.log('Testing Sun:');
    const sunLon = (0, astronomy_engine_1.EclipticLongitude)('Sun', time);
    console.log('Sun Ecliptic Longitude via EclipticLongitude:', sunLon);
}
catch (e) {
    console.error('Sun EclipticLongitude failed:', e.message);
}
try {
    console.log('Testing Earth:');
    const earthLon = (0, astronomy_engine_1.EclipticLongitude)('Earth', time);
    console.log('Earth Ecliptic Longitude:', earthLon);
    console.log('Geocentric Sun Longitude (Earth + 180):', (earthLon + 180) % 360);
}
catch (e) {
    console.error('Earth EclipticLongitude failed:', e.message);
}

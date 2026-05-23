import { GeoVector, Ecliptic, MakeTime, Body } from 'astronomy-engine';
const d = new Date('1999-11-14T19:00:00Z');
const time = MakeTime(d);
const vec = GeoVector(Body.Moon, time, true);
const ecl = Ecliptic(vec);
console.log('Geocentric Moon Ecliptic Longitude:', ecl.elon);

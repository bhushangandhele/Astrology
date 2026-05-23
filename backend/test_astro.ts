import { GeoVector, EclipticLongitude, MakeTime, Ecliptic } from 'astronomy-engine';
const d = new Date('1999-11-14T19:00:00Z');
const time = MakeTime(d);
const v = GeoVector('Moon', time, false);
console.log('GeoVector:', v);
const ecl = Ecliptic(v);
console.log('Ecliptic (Geocentric):', ecl.lon);
const hl = EclipticLongitude('Moon', time);
console.log('EclipticLongitude func:', hl);

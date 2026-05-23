import { MakeTime, EclipticLongitude } from 'astronomy-engine';
import { getAyanamsa, toSidereal } from './src/engine/ayanamsa';
import { getJulianDate } from './src/engine/chart';
import { getPlacementInfo } from './src/engine/astronomy';

const dob = '1999-11-15';
const tob = '00:30';
const timezone = 'Asia/Kolkata';

const localDateTimeStr = `${dob}T${tob}:00`;
const utcDate = new Date(new Date(localDateTimeStr).toLocaleString('en-US', { timeZone: timezone }));
const hostDate = new Date(localDateTimeStr);
const diffMs = hostDate.getTime() - utcDate.getTime();
const birthDateUTC = new Date(hostDate.getTime() + diffMs);

console.log("Original Time String:", localDateTimeStr);
console.log("Host Date:", hostDate.toISOString());
console.log("UTC Date (Locale):", utcDate.toISOString());
console.log("Diff (hours):", diffMs / 3600000);
console.log("Final Birth Date UTC:", birthDateUTC.toISOString());

const jd = getJulianDate(birthDateUTC);
const time = MakeTime(birthDateUTC);
const tropicalMoonLongitude = EclipticLongitude('Moon' as any, time);
const ayanamsa = getAyanamsa(jd);
const siderealMoonLongitude = toSidereal(tropicalMoonLongitude, jd);

const placement = getPlacementInfo(siderealMoonLongitude);

console.log({
  utcTime: birthDateUTC.toISOString(),
  tropicalMoonLongitude,
  ayanamsa,
  siderealMoonLongitude,
  moonRashi: placement.sign,
  nakshatra: placement.nakshatra
});

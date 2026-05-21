import { MakeTime, EclipticLongitude, SiderealTime } from 'astronomy-engine';
import { toSidereal, getAyanamsa } from './ayanamsa';
import { getPlacementInfo, type PlacementInfo, RASHIS } from './astronomy';

export interface PlanetPlacement extends PlacementInfo {
  name: string;
}

export interface HouseInfo {
  houseNumber: number; // 1-12
  signName: string;
  signNumber: number; // 1-12
  sanskritSign: string;
  signRuler: string;
  planets: string[]; // Names of planets in this house
}

export interface BirthChartResult {
  name: string;
  dob: string;
  tob: string;
  place: string;
  latitude: number;
  longitude: number;
  timezone: string;
  julianDate: number;
  ayanamsa: number;
  ascendant: PlanetPlacement;
  planets: Record<string, PlanetPlacement>;
  houses: Record<number, HouseInfo>;
}

/**
 * Calculates Julian Date from a UTC Date object.
 */
export function getJulianDate(date: Date): number {
  const timeMs = date.getTime();
  // Julian Date at J2000.0 is 2451545.0 corresponding to UTC Jan 1.5, 2000
  return 2440587.5 + timeMs / 86400000.0;
}

/**
 * Calculates the true obliquity of date using IAU 1980 formula.
 */
export function getObliquity(julianDate: number): number {
  const T = (julianDate - 2451545.0) / 36525.0;
  // Obliquity in degrees
  const eps = 23.4392911 - (46.8150 * T + 0.00059 * T * T - 0.001813 * T * T * T) / 3600;
  return eps;
}

/**
 * Generates a full birth chart.
 */
export function calculateBirthChart(
  name: string,
  dob: string, // YYYY-MM-DD
  tob: string, // HH:MM
  latitude: number,
  longitude: number,
  timezone: string,
  place: string = ''
): BirthChartResult {
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
  const time = MakeTime(birthDateUTC);
  const jd = getJulianDate(birthDateUTC);
  const ayanamsa = getAyanamsa(jd);

  // 3. Compute Ascendant (Lagna)
  // Get Greenwich Apparent Sidereal Time (GAST) in hours
  const gastHours = SiderealTime(time);
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

  const siderealAsc = toSidereal(tropicalAsc, jd);
  const ascPlacement = getPlacementInfo(siderealAsc);
  const ascendant: PlanetPlacement = {
    name: 'Ascendant',
    ...ascPlacement
  };

  // 4. Compute Planetary Positions (Sidereal)
  const planetNames = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];
  const planets: Record<string, PlanetPlacement> = {};

  for (const pName of planetNames) {
    let tropicalLon = 0;
    if (pName === 'Sun') {
      const earthLon = EclipticLongitude('Earth' as any, time);
      tropicalLon = (earthLon + 180) % 360;
    } else {
      tropicalLon = EclipticLongitude(pName as any, time);
    }
    const siderealLon = toSidereal(tropicalLon, jd);
    const placement = getPlacementInfo(siderealLon);
    planets[pName] = {
      name: pName,
      ...placement
    };
  }

  // 5. Calculate Rahu and Ketu (Mean Nodes)
  // Mean Node formula
  const T_node = (jd - 2451545.0) / 36525.0;
  let tropicalRahu = (125.044522 - 1934.136261 * T_node + 0.002078 * T_node * T_node) % 360;
  if (tropicalRahu < 0) tropicalRahu += 360;

  const siderealRahu = toSidereal(tropicalRahu, jd);
  const siderealKetu = (siderealRahu + 180) % 360;

  planets['Rahu'] = {
    name: 'Rahu',
    ...getPlacementInfo(siderealRahu)
  };
  planets['Ketu'] = {
    name: 'Ketu',
    ...getPlacementInfo(siderealKetu)
  };

  // 6. Map Houses using Whole Sign System
  // The sign of the Lagna becomes the 1st House.
  const lagnaSignNum = ascendant.signNumber; // 1-12
  const houses: Record<number, HouseInfo> = {};

  for (let h = 1; h <= 12; h++) {
    // Determine the sign number for this house (1-based, wrapping around 12)
    const signNum = ((lagnaSignNum - 1 + (h - 1)) % 12) + 1;
    const rashi = RASHIS[signNum - 1];

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
        (planets[pName] as any).house = h;
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

import { calculateBirthChart } from './src/engine/chart';

try {
  const name = 'Bhushan';
  const dob = '1999-11-15';
  const tob = '00:30';
  const lat = 21.0436;
  const lon = 75.7851;
  const tz = 'Asia/Kolkata';

  console.log(`Calculating Birth Chart for: ${name}`);
  const chart = calculateBirthChart(name, dob, tob, lat, lon, tz);

  console.log(`Ascendant (Lagna): ${chart.ascendant.sign}`);
  console.log(`Moon Sign (Rashi): ${chart.planets.Moon.sign}`);
  console.log(`Sun Sign: ${chart.planets.Sun.sign}`);
  console.log(`Nakshatra: ${chart.planets.Moon.nakshatra} Pada ${chart.planets.Moon.pada}`);
  
  for (const [pName, p] of Object.entries(chart.planets)) {
    console.log(`- ${pName.padEnd(8)}: Sign: ${p.sign.padEnd(12)} | House: ${p.house}`);
  }
} catch (err) {
  console.error(err);
}

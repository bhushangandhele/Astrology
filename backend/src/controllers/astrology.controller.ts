import { Request, Response } from 'express';
import { calculateBirthChart } from '../engine/chart';
import { calculateVimshottariDasha } from '../engine/dasha';
import { calculateAshtakootMatch } from '../engine/compatibility';
import {
  LAGNA_INTERPRETATIONS,
  SUN_HOUSE_INTERPRETATIONS,
  MOON_HOUSE_INTERPRETATIONS,
  NAKSHATRA_INTERPRETATIONS,
  DASHA_INTERPRETATIONS
} from '../data/interpretations';

export const getBirthChart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, dob, tob, latitude, longitude, timezone, place } = req.body;

    if (!name || !dob || !tob || latitude === undefined || longitude === undefined || !timezone) {
      res.status(400).json({ error: 'Missing required parameters. Required: name, dob, tob, latitude, longitude, timezone' });
      return;
    }

    // 1. Calculate Birth Chart
    const chart = calculateBirthChart(
      name,
      dob,
      tob,
      Number(latitude),
      Number(longitude),
      timezone,
      place || ''
    );

    // 2. Calculate Vimshottari Dashas
    const moonLong = chart.planets.Moon.longitude;
    const dashas = calculateVimshottariDasha(moonLong, dob, tob);

    // 3. Compile Interpretations & Predictions
    const predictions = {
      ascendant: LAGNA_INTERPRETATIONS[chart.ascendant.signNumber] || {
        title: `${chart.ascendant.sign} Ascendant`,
        text: 'You have a highly unique and balanced personality corresponding to your Ascendant sign.'
      },
      sunPlacement: SUN_HOUSE_INTERPRETATIONS[chart.planets.Sun.house!] || {
        title: `Sun in House ${chart.planets.Sun.house!}`,
        text: 'The Sun represents your core soul essence, health, and status. Its placement sheds light on your path of career and ambition.'
      },
      moonPlacement: MOON_HOUSE_INTERPRETATIONS[chart.planets.Moon.house!] || {
        title: `Moon in House ${chart.planets.Moon.house!}`,
        text: 'The Moon represents your emotional nature, mental peace, and nurturing qualities.'
      },
      nakshatra: NAKSHATRA_INTERPRETATIONS[chart.planets.Moon.nakshatraNumber] || {
        title: `${chart.planets.Moon.nakshatra} Nakshatra`,
        text: 'Your birth Nakshatra determines your basic temperament, instinctive reactions, and major life themes.'
      },
      birthDasha: DASHA_INTERPRETATIONS[dashas[0].lord] || {
        title: `${dashas[0].lord} Mahadasha`,
        text: 'Your current major Vimshottari planetary period shapes the primary focus and flow of events in your life.'
      }
    };

    res.status(200).json({
      chart,
      dashas,
      predictions
    });
  } catch (err: any) {
    console.error('Error generating birth chart:', err);
    res.status(500).json({ error: 'Failed to generate birth chart calculations', details: err.message });
  }
};

export const getCompatibilityMatch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { profileA, profileB } = req.body;

    if (!profileA || !profileB) {
      res.status(400).json({ error: 'Missing profile parameters. Required: profileA and profileB' });
      return;
    }

    // 1. Calculate Moon Longitudes for both profiles
    const chartA = calculateBirthChart(
      profileA.name,
      profileA.dob,
      profileA.tob,
      Number(profileA.latitude),
      Number(profileA.longitude),
      profileA.timezone,
      profileA.place || ''
    );

    const chartB = calculateBirthChart(
      profileB.name,
      profileB.dob,
      profileB.tob,
      Number(profileB.latitude),
      Number(profileB.longitude),
      profileB.timezone,
      profileB.place || ''
    );

    const moonLongA = chartA.planets.Moon.longitude;
    const moonLongB = chartB.planets.Moon.longitude;

    // 2. Perform Ashtakoot Gun Milan Matching
    const match = calculateAshtakootMatch(moonLongA, moonLongB);

    res.status(200).json({
      profileA: {
        name: chartA.name,
        rashi: chartA.planets.Moon.sign,
        nakshatra: chartA.planets.Moon.nakshatra,
        pada: chartA.planets.Moon.pada
      },
      profileB: {
        name: chartB.name,
        rashi: chartB.planets.Moon.sign,
        nakshatra: chartB.planets.Moon.nakshatra,
        pada: chartB.planets.Moon.pada
      },
      match
    });
  } catch (err: any) {
    console.error('Error in compatibility match:', err);
    res.status(500).json({ error: 'Failed to calculate compatibility score', details: err.message });
  }
};

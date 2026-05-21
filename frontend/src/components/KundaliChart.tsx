import React, { useState } from 'react';
import type { BirthChartResult } from '../engine/chart';
import { PLANETS_MR, SIGNS_MR, HOUSE_NAMES_MR, HOUSE_MEANINGS_MR } from '../utils/i18n';
import { PLANET_IN_HOUSE } from '../utils/interpretations';

interface KundaliChartProps {
  chart: BirthChartResult;
  language?: 'EN' | 'MR';
}

interface SelectedHouseDetail {
  houseNumber: number;
  signName: string;
  signNumber: number;
  sanskritSign: string;
  signRuler: string;
  planets: { name: string; degree: number; nakshatra: string }[];
  meaning: string;
}

const HOUSE_MEANINGS: Record<number, string> = {
  1: 'Lagna (Ascendant): Self, personality, physical body, appearance, overall life path, strengths and weaknesses.',
  2: 'Dhana Bhava: Wealth, liquid assets, family relationships, speech, food intake, values and early education.',
  3: 'Sahaja Bhava: Courage, self-effort, communication, writing, short travels, younger siblings, artistic skills.',
  4: 'Bandhu Bhava: Home, mother, vehicles, land, real estate, domestic peace of mind, heart and emotional roots.',
  5: 'Putra Bhava: Intelligence, creativity, children, speculation, romance, past-life merits (Purva Punya), ancient scriptures.',
  6: 'Ari Bhava: Obstacles, health, daily routines, debt, service, enemies, litigation, pets and critical analysis.',
  7: 'Yuvati Bhava: Marriage, spouse, long-term partnerships, public relations, trade, business relations, foreign travels.',
  8: 'Randhra Bhava: Longevity, transformations, sudden events, deep research, occult sciences, inheritance, secrets.',
  9: 'Dharma Bhava: Fortune, fortune, spirituality, higher education, father, mentors, long-distance travels, philosophy.',
  10: 'Karma Bhava: Profession, career, social status, public honor, government relations, authority, ambitions.',
  11: 'Labha Bhava: Gains of wealth, dreams and desires fulfilled, social networks, elder siblings, friends.',
  12: 'Vyaya Bhava: Expenditures, losses, foreign settlement, isolation, hospitals, ashrams, bed pleasures, deep meditation.'
};

export const KundaliChart: React.FC<KundaliChartProps> = ({ chart, language = 'EN' }) => {
  const [selectedHouse, setSelectedHouse] = useState<number | null>(1);

  const handleHouseClick = (houseNum: number) => {
    setSelectedHouse(houseNum);
  };

  // Positions of Sign Numbers and Planets in North Indian grid
  const housePlacements = [
    { house: 1, signX: 200, signY: 155, planX: 200, planY: 120 },
    { house: 2, signX: 275, signY: 80, planX: 285, planY: 55 },
    { house: 3, signX: 320, signY: 125, planX: 345, planY: 100 },
    { house: 4, signX: 255, signY: 200, planX: 290, planY: 200 },
    { house: 5, signX: 320, signY: 275, planX: 345, planY: 300 },
    { house: 6, signX: 275, signY: 320, planX: 285, planY: 345 },
    { house: 7, signX: 200, signY: 245, planX: 200, planY: 280 },
    { house: 8, signX: 125, signY: 320, planX: 115, planY: 345 },
    { house: 9, signX: 80, signY: 275, planX: 55, planY: 300 },
    { house: 10, signX: 145, signY: 200, planX: 110, planY: 200 },
    { house: 11, signX: 80, signY: 125, planX: 55, planY: 100 },
    { house: 12, signX: 125, signY: 80, planX: 115, planY: 55 }
  ];

  const getHouseDetail = (houseNum: number): SelectedHouseDetail | null => {
    const house = chart.houses[houseNum];
    if (!house) return null;

    const planets = house.planets.map(pName => {
      const p = chart.planets[pName];
      return {
        name: pName,
        degree: p.degreeInSign,
        nakshatra: p.nakshatra
      };
    });

    return {
      houseNumber: houseNum,
      signName: house.signName,
      signNumber: house.signNumber,
      sanskritSign: house.sanskritSign,
      signRuler: house.signRuler,
      planets,
      meaning: HOUSE_MEANINGS[houseNum]
    };
  };

  const activeDetail = selectedHouse ? getHouseDetail(selectedHouse) : null;

  return (
    <div className="grid-2" style={{ gap: '2rem', alignItems: 'stretch' }}>
      {/* 1. SVG Kundali Grid */}
      <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h4 className="title-cosmic" style={{ fontSize: '1.2rem', marginBottom: '1rem', textShadow: '0 0 10px var(--color-gold-glow)' }}>
          North Indian Lagna Kundali (D1)
        </h4>
        <svg
          viewBox="0 0 400 400"
          style={{
            width: '100%',
            maxWidth: '380px',
            background: 'rgba(10, 8, 22, 0.4)',
            borderRadius: '12px',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.15)',
            border: '1px solid rgba(139, 92, 246, 0.2)'
          }}
        >
          {/* Definitions for Glow effects */}
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#fffbeb" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Grid Lines */}
          <g stroke="url(#goldGradient)" strokeWidth="2.5" fill="none">
            {/* Outer Box */}
            <rect x="10" y="10" width="380" height="380" />
            {/* Diagonals */}
            <line x1="10" y1="10" x2="390" y2="390" />
            <line x1="10" y1="390" x2="390" y2="10" />
            {/* Inner Diamond */}
            <line x1="200" y1="10" x2="390" y2="200" />
            <line x1="390" y1="200" x2="200" y2="390" />
            <line x1="200" y1="390" x2="10" y2="200" />
            <line x1="10" y1="200" x2="200" y2="10" />
          </g>

          {/* Interactive invisible clicking areas for each house */}
          {/* House 1 Polygon */}
          <polygon
            points="200,10 300,110 200,200 100,110"
            fill={selectedHouse === 1 ? 'rgba(245, 158, 11, 0.08)' : 'transparent'}
            stroke={selectedHouse === 1 ? '#f59e0b' : 'transparent'}
            strokeWidth="1.5"
            cursor="pointer"
            onClick={() => handleHouseClick(1)}
          />
          {/* House 2 Polygon */}
          <polygon
            points="200,10 300,110 390,10"
            fill={selectedHouse === 2 ? 'rgba(245, 158, 11, 0.08)' : 'transparent'}
            stroke={selectedHouse === 2 ? '#f59e0b' : 'transparent'}
            strokeWidth="1.5"
            cursor="pointer"
            onClick={() => handleHouseClick(2)}
          />
          {/* House 3 Polygon */}
          <polygon
            points="390,10 300,110 390,200"
            fill={selectedHouse === 3 ? 'rgba(245, 158, 11, 0.08)' : 'transparent'}
            stroke={selectedHouse === 3 ? '#f59e0b' : 'transparent'}
            strokeWidth="1.5"
            cursor="pointer"
            onClick={() => handleHouseClick(3)}
          />
          {/* House 4 Polygon */}
          <polygon
            points="390,200 300,110 200,200 300,290"
            fill={selectedHouse === 4 ? 'rgba(245, 158, 11, 0.08)' : 'transparent'}
            stroke={selectedHouse === 4 ? '#f59e0b' : 'transparent'}
            strokeWidth="1.5"
            cursor="pointer"
            onClick={() => handleHouseClick(4)}
          />
          {/* House 5 Polygon */}
          <polygon
            points="390,200 300,290 390,390"
            fill={selectedHouse === 5 ? 'rgba(245, 158, 11, 0.08)' : 'transparent'}
            stroke={selectedHouse === 5 ? '#f59e0b' : 'transparent'}
            strokeWidth="1.5"
            cursor="pointer"
            onClick={() => handleHouseClick(5)}
          />
          {/* House 6 Polygon */}
          <polygon
            points="390,390 300,290 200,390"
            fill={selectedHouse === 6 ? 'rgba(245, 158, 11, 0.08)' : 'transparent'}
            stroke={selectedHouse === 6 ? '#f59e0b' : 'transparent'}
            strokeWidth="1.5"
            cursor="pointer"
            onClick={() => handleHouseClick(6)}
          />
          {/* House 7 Polygon */}
          <polygon
            points="200,200 300,290 200,390 100,290"
            fill={selectedHouse === 7 ? 'rgba(245, 158, 11, 0.08)' : 'transparent'}
            stroke={selectedHouse === 7 ? '#f59e0b' : 'transparent'}
            strokeWidth="1.5"
            cursor="pointer"
            onClick={() => handleHouseClick(7)}
          />
          {/* House 8 Polygon */}
          <polygon
            points="200,390 100,290 10,390"
            fill={selectedHouse === 8 ? 'rgba(245, 158, 11, 0.08)' : 'transparent'}
            stroke={selectedHouse === 8 ? '#f59e0b' : 'transparent'}
            strokeWidth="1.5"
            cursor="pointer"
            onClick={() => handleHouseClick(8)}
          />
          {/* House 9 Polygon */}
          <polygon
            points="10,390 100,290 10,200"
            fill={selectedHouse === 9 ? 'rgba(245, 158, 11, 0.08)' : 'transparent'}
            stroke={selectedHouse === 9 ? '#f59e0b' : 'transparent'}
            strokeWidth="1.5"
            cursor="pointer"
            onClick={() => handleHouseClick(9)}
          />
          {/* House 10 Polygon */}
          <polygon
            points="10,200 100,290 200,200 100,110"
            fill={selectedHouse === 10 ? 'rgba(245, 158, 11, 0.08)' : 'transparent'}
            stroke={selectedHouse === 10 ? '#f59e0b' : 'transparent'}
            strokeWidth="1.5"
            cursor="pointer"
            onClick={() => handleHouseClick(10)}
          />
          {/* House 11 Polygon */}
          <polygon
            points="10,200 100,110 10,10"
            fill={selectedHouse === 11 ? 'rgba(245, 158, 11, 0.08)' : 'transparent'}
            stroke={selectedHouse === 11 ? '#f59e0b' : 'transparent'}
            strokeWidth="1.5"
            cursor="pointer"
            onClick={() => handleHouseClick(11)}
          />
          {/* House 12 Polygon */}
          <polygon
            points="10,10 100,110 200,10"
            fill={selectedHouse === 12 ? 'rgba(245, 158, 11, 0.08)' : 'transparent'}
            stroke={selectedHouse === 12 ? '#f59e0b' : 'transparent'}
            strokeWidth="1.5"
            cursor="pointer"
            onClick={() => handleHouseClick(12)}
          />

          {/* Render Sign Numbers inside each house */}
          {housePlacements.map(hp => {
            const houseData = chart.houses[hp.house];
            if (!houseData) return null;
            return (
              <text
                key={`sign-${hp.house}`}
                x={hp.signX}
                y={hp.signY}
                fill="#f59e0b"
                fontSize="12.5"
                fontFamily="Cinzel"
                fontWeight="700"
                textAnchor="middle"
                pointerEvents="none"
              >
                {houseData.signNumber}
              </text>
            );
          })}

          {/* Render resident planets inside each house */}
          {housePlacements.map(hp => {
            const houseData = chart.houses[hp.house];
            if (!houseData || houseData.planets.length === 0) return null;

            // Draw multiple planets in stacked/formatted lines
            return (
              <g key={`planets-group-${hp.house}`} pointerEvents="none">
                {houseData.planets.map((pName, idx) => {
                  const planet = chart.planets[pName];
                  const yOffset = idx * 13;
                  // Color codes for planets
                  let color = '#e2e8f0';
                  if (pName === 'Sun') color = '#fbbf24'; // yellow
                  if (pName === 'Moon') color = '#38bdf8'; // light blue
                  if (pName === 'Mars') color = '#f87171'; // red
                  if (pName === 'Rahu' || pName === 'Ketu') color = '#a78bfa'; // light purple

                  return (
                    <text
                      key={`planet-${hp.house}-${pName}`}
                      x={hp.planX}
                      y={hp.planY + yOffset}
                      fill={color}
                      fontSize="10"
                      fontFamily="Outfit"
                      fontWeight="600"
                      textAnchor="middle"
                    >
                      {language === 'MR' ? (PLANETS_MR[pName]?.short ?? pName) : pName} {Math.floor(planet.degreeInSign)}°
                    </text>
                  );
                })}
              </g>
            );
          })}
        </svg>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.75rem', fontStyle: 'italic' }}>
          {language === 'MR' ? '* कोणत्याही घरावर क्लिक करा - तपशील पाहण्यासाठी' : '*Click any section/house to view details'}
        </span>
      </div>

      {/* 2. Interactive House Detail Panel */}
      <div className="glass-panel gold-themed" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {activeDetail ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(245, 158, 11, 0.2)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
              <div>
                <h4 className="title-cosmic" style={{ fontSize: '1.5rem', marginBottom: 0 }}>
                  {language === 'MR'
                    ? (HOUSE_NAMES_MR[activeDetail.houseNumber] || `${activeDetail.houseNumber} वे भाव`)
                    : `House ${activeDetail.houseNumber}`}
                </h4>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', fontFamily: 'Cinzel', letterSpacing: '0.05em' }}>
                  {language === 'MR'
                    ? (SIGNS_MR[activeDetail.signName]?.name ?? activeDetail.signName)
                    : activeDetail.signName} ({activeDetail.sanskritSign})
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8' }}>{language === 'MR' ? 'भावेश' : 'House Lord'}</span>
                <span style={{ fontSize: '1rem', color: '#f59e0b', fontWeight: 600 }}>
                  {language === 'MR' ? (PLANETS_MR[activeDetail.signRuler]?.full ?? activeDetail.signRuler) : activeDetail.signRuler}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '1rem', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {language === 'MR'
                ? (HOUSE_MEANINGS_MR[activeDetail.houseNumber] ?? activeDetail.meaning)
                : activeDetail.meaning}
            </p>

            <h5 className="title-cosmic" style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#8b5cf6' }}>
              {language === 'MR' ? 'या भावातील ग्रह:' : 'Resident Planets:'}
            </h5>
            {activeDetail.planets.length === 0 ? (
              <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>
                {language === 'MR' ? 'या भावात कोणताही ग्रह नाही.' : 'No planets reside in this house.'}
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {activeDetail.planets.map(p => {
                  let pColor = '#cbd5e1';
                  if (p.name === 'Sun') pColor = '#f59e0b';
                  if (p.name === 'Moon') pColor = '#38bdf8';
                  if (p.name === 'Mars') pColor = '#f87171';
                  if (p.name === 'Rahu' || p.name === 'Ketu') pColor = '#a78bfa';
                  const displayName = language === 'MR' ? (PLANETS_MR[p.name]?.full ?? p.name) : p.name;
                  const interp = PLANET_IN_HOUSE[p.name]?.[activeDetail.houseNumber];

                  return (
                    <div key={p.name} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${pColor}30`, borderRadius: '10px', overflow: 'hidden' }}>
                      {/* Planet header */}
                      <div style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: interp ? `1px solid ${pColor}20` : 'none' }}>
                        <div>
                          <span style={{ fontWeight: 700, color: pColor, marginRight: '0.5rem', fontSize: '1rem' }}>{displayName}</span>
                          <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                            {language === 'MR' ? `नक्षत्र: ${p.nakshatra}` : `in ${p.nakshatra}`}
                          </span>
                        </div>
                        <span style={{ fontWeight: 600, color: '#fef08a', fontSize: '0.9rem' }}>{p.degree.toFixed(2)}°</span>
                      </div>
                      {/* Interpretation cards */}
                      {interp && (
                        <div style={{ padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                          <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '8px', padding: '0.6rem 0.8rem' }}>
                            <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '0.2rem' }}>💼 {language === 'MR' ? 'करिअर' : 'CAREER'}</div>
                            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.5', margin: 0 }}>{interp.career}</p>
                          </div>
                          <div style={{ background: 'rgba(244,114,182,0.08)', border: '1px solid rgba(244,114,182,0.2)', borderRadius: '8px', padding: '0.6rem 0.8rem' }}>
                            <div style={{ fontSize: '0.7rem', color: '#f472b6', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '0.2rem' }}>❤️ {language === 'MR' ? 'प्रेम/विवाह' : 'LOVE & MARRIAGE'}</div>
                            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.5', margin: 0 }}>{interp.love}</p>
                          </div>
                          <div style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)', borderRadius: '8px', padding: '0.6rem 0.8rem' }}>
                            <div style={{ fontSize: '0.7rem', color: '#a78bfa', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '0.2rem' }}>🔮 {language === 'MR' ? 'जीवन फलादेश' : 'GENERAL LIFE'}</div>
                            <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.5', margin: 0 }}>{interp.general}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8', fontStyle: 'italic' }}>
            {language === 'MR' ? 'कुंडलीतील कोणत्याही भावावर क्लिक करा.' : 'Select a house from the chart to view deep interpretations.'}
          </div>
        )}

        {/* Small Summary footer of Lagna */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '1rem',
            marginTop: '2rem',
            fontSize: '0.85rem',
            color: '#94a3b8',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <span>
            {language === 'MR' ? 'लग्न राशी:' : 'Ascendant Sign:'}{' '}
            <strong style={{ color: '#fff' }}>
              {language === 'MR' ? (SIGNS_MR[chart.ascendant.sign]?.name ?? chart.ascendant.sign) : chart.ascendant.sign}
            </strong>
          </span>
          <span>
            {language === 'MR' ? 'अयनांश सुधारणा:' : 'Ayanamsa Correction:'}{' '}
            <strong style={{ color: '#f59e0b' }}>{chart.ayanamsa.toFixed(2)}°</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

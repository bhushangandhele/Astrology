import React from 'react';
import type { MatchResult } from '../engine/compatibility';
import { SIGNS_MR, NAKSHATRAS_MR, KOOTAS_MR } from '../utils/i18n';

interface PartnerInfo {
  name: string;
  rashi: string;
  nakshatra: string;
  pada: number;
}

interface CompatibilityCardProps {
  partnerA: PartnerInfo;
  partnerB: PartnerInfo;
  matchResult: MatchResult;
  language?: 'EN' | 'MR';
}

export const CompatibilityCard: React.FC<CompatibilityCardProps> = ({
  partnerA,
  partnerB,
  matchResult,
  language = 'EN'
}) => {
  const { score, maxScore, verdict, kootas } = matchResult;

  // Color determination based on score
  let scoreColor = '#ef4444'; // Red
  if (score >= 25) scoreColor = '#10b981'; // Green
  else if (score >= 18) scoreColor = '#f59e0b'; // Gold
  else if (score >= 12) scoreColor = '#3b82f6'; // Blue

  const rashiName = (r: string) => language === 'MR' ? (SIGNS_MR[r]?.name ?? r) : r;
  const nakName = (n: string) => language === 'MR' ? (NAKSHATRAS_MR[n] ?? n) : n;

  return (
    <div className="glass-panel gold-themed" style={{ padding: '2rem' }}>
      <h3 className="title-cosmic" style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '2rem' }}>
        {language === 'MR' ? 'अष्टकूट (गुण मिलन) जुळणी गुणपत्रिका' : 'Ashtakoot (Gun Milan) Match Scorecard'}
      </h3>

      {/* 1. Partner Profile Row */}
      <div
        className="grid-2"
        style={{
          gap: '1.5rem',
          borderBottom: '1px solid rgba(245, 158, 11, 0.15)',
          paddingBottom: '1.5rem',
          marginBottom: '2rem'
        }}
      >
        {/* Bride */}
        <div style={{ textAlign: 'center', background: 'rgba(245, 158, 11, 0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.08)' }}>
          <span style={{ fontSize: '0.8rem', color: '#f59e0b', letterSpacing: '0.1em', fontFamily: 'Cinzel', fontWeight: 600 }}>
            {language === 'MR' ? 'वधू प्रोफाईल' : 'BRIDE PROFILE'}
          </span>
          <h4 style={{ fontSize: '1.3rem', color: '#fff', margin: '0.25rem 0' }}>{partnerA.name}</h4>
          <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
            {language === 'MR' ? 'चंद्र राशी: ' : 'Moon Sign: '}<strong style={{ color: '#fff' }}>{rashiName(partnerA.rashi)}</strong>
          </div>
          <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
            {language === 'MR' ? 'नक्षत्र: ' : 'Nakshatra: '}<strong style={{ color: '#fff' }}>{nakName(partnerA.nakshatra)}</strong> ({language === 'MR' ? 'पाद' : 'Pada'} {partnerA.pada})
          </div>
        </div>

        {/* Groom */}
        <div style={{ textAlign: 'center', background: 'rgba(139, 92, 246, 0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(139, 92, 246, 0.08)' }}>
          <span style={{ fontSize: '0.8rem', color: '#8b5cf6', letterSpacing: '0.1em', fontFamily: 'Cinzel', fontWeight: 600 }}>
            {language === 'MR' ? 'वर प्रोफाईल' : 'GROOM PROFILE'}
          </span>
          <h4 style={{ fontSize: '1.3rem', color: '#fff', margin: '0.25rem 0' }}>{partnerB.name}</h4>
          <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
            {language === 'MR' ? 'चंद्र राशी: ' : 'Moon Sign: '}<strong style={{ color: '#fff' }}>{rashiName(partnerB.rashi)}</strong>
          </div>
          <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
            {language === 'MR' ? 'नक्षत्र: ' : 'Nakshatra: '}<strong style={{ color: '#fff' }}>{nakName(partnerB.nakshatra)}</strong> ({language === 'MR' ? 'पाद' : 'Pada'} {partnerB.pada})
          </div>
        </div>
      </div>

      {/* 2. Score Meter Circular Ring */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div
          style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            border: `6px solid rgba(255, 255, 255, 0.05)`,
            borderTopColor: scoreColor,
            borderRightColor: score >= 18 ? scoreColor : 'rgba(255, 255, 255, 0.05)',
            borderBottomColor: score >= 25 ? scoreColor : 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: `0 0 25px ${scoreColor}30`,
            marginBottom: '1rem',
            position: 'relative'
          }}
        >
          <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff' }}>{score}</span>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.1)', width: '60%', textAlign: 'center', paddingTop: '0.15rem' }}>
            {language === 'MR' ? `${maxScore} पैकी` : `out of ${maxScore}`}
          </span>
        </div>
        <h4 style={{ fontSize: '1.25rem', color: scoreColor, fontWeight: 700, textAlign: 'center' }}>
          {verdict}
        </h4>
      </div>

      {/* 3. Detailed Koota Breakdown Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <h4 className="title-cosmic" style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#8b5cf6' }}>
          {language === 'MR' ? '८ कूट विभाजन तपशील:' : '8 Koota Parameter Breakdown:'}
        </h4>
        
        {Object.entries(kootas).map(([kName, kValue]) => {
          const hasDosha = kValue.score === 0 && (kName === 'Nadi' || kName === 'Bhakoot');
          const displayKoota = language === 'MR' ? (KOOTAS_MR[kName]?.name ?? kName) : kName;
          return (
            <div
              key={kName}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: hasDosha ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(139, 92, 246, 0.1)',
                borderRadius: '8px',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: hasDosha ? '0 0 10px rgba(239, 68, 68, 0.05)' : 'none'
              }}
            >
              <div>
                <strong style={{ fontSize: '1rem', color: hasDosha ? '#ef4444' : '#fff' }}>
                  {displayKoota} {language === 'MR' ? '' : 'Koota'}
                </strong>
                {hasDosha && (
                  <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#f87171', fontWeight: 700 }}>
                    ⚠ {kName === 'Nadi' ? (language === 'MR' ? 'नाडी दोष' : 'Nadi Dosha') : (language === 'MR' ? 'भकूट दोष' : 'Bhakoot Dosha')}
                  </span>
                )}
                <span style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.15rem' }}>
                  {kValue.description}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: kValue.score === kValue.max ? '#10b981' : kValue.score > 0 ? '#f59e0b' : '#ef4444' }}>
                  {kValue.score}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}> / {kValue.max}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: '2rem',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          padding: '1rem',
          borderRadius: '8px',
          fontSize: '0.85rem',
          color: '#94a3b8',
          lineHeight: '1.5'
        }}
      >
        {language === 'MR' ? (
          <>
            <strong>वैदिक मिलन मार्गदर्शिका:</strong> जर गुण मिलन <strong>१८/३६</strong> पेक्षा जास्त असेल तर विवाह सुसंगत मानला जातो. <strong>नाडी दोष</strong> (नाडी मध्ये ०/८) असेल तर विशेष उपाय आवश्यक आहेत.
          </>
        ) : (
          <>
            <strong>Vedic Matching Guide:</strong> A compatibility score above <strong>18/36</strong> is traditionally considered good and acceptable for a harmonious marriage, representing strong physical, emotional, and social alignment. A score below 18 requires remedies or caution, particularly if a <strong>Nadi Dosha</strong> (0/8 score in Nadi) occurs.
          </>
        )}
      </div>
    </div>
  );
};

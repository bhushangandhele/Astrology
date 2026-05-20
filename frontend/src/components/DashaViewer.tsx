import React, { useState } from 'react';
import type { Mahadasha } from '../../../backend/src/engine/dasha';
import { PLANETS_MR } from '../utils/i18n';

interface DashaViewerProps {
  dashas: Mahadasha[];
  language?: 'EN' | 'MR';
}

export const DashaViewer: React.FC<DashaViewerProps> = ({ dashas, language = 'EN' }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const isCurrentDasha = (startDateStr: string, endDateStr: string): boolean => {
    const now = new Date();
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);
    return now >= start && now <= end;
  };

  const lordName = (name: string) =>
    language === 'MR' ? (PLANETS_MR[name]?.full ?? name) : name;

  return (
    <div className="glass-panel" style={{ padding: '2rem' }}>
      <h3 className="title-cosmic" style={{ fontSize: '1.4rem', borderBottom: '1px solid rgba(139, 92, 246, 0.2)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
        {language === 'MR' ? 'विंशोत्तरी दशा कालरेषा (१२० वर्षांचे चक्र)' : 'Vimshottari Dasha Timeline (120 Years Cycle)'}
      </h3>
      <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
        {language === 'MR'
          ? 'वैदिक ज्योतिषशास्त्रात विंशोत्तरी दशा ग्रहकालावधींचा उपयोग जीवनातील महत्त्वाच्या घटना मोजण्यासाठी होतो. महादशेवर क्लिक करा आणि ९ अंतर्दशा पाहा.'
          : 'Vedic astrology uses Vimshottari Dasha planetary periods to map major life events. Click on a Mahadasha below to view its 9 nested sub-periods (Antardashas).'}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {dashas.map((dasha, idx) => {
          const isCurrent = isCurrentDasha(dasha.startDate, dasha.endDate);
          const isExpanded = expandedIndex === idx;

          return (
            <div
              key={dasha.lord}
              style={{
                border: isCurrent ? '1px solid #f59e0b' : '1px solid rgba(139, 92, 246, 0.15)',
                borderRadius: '10px',
                background: isCurrent ? 'rgba(245, 158, 11, 0.03)' : 'rgba(10, 8, 22, 0.5)',
                boxShadow: isCurrent ? '0 0 15px rgba(245, 158, 11, 0.1)' : 'none',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Mahadasha Header */}
              <div
                style={{
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  background: isCurrent ? 'rgba(245, 158, 11, 0.05)' : 'none'
                }}
                onClick={() => toggleExpand(idx)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: isCurrent ? '#f59e0b' : 'transparent',
                      boxShadow: isCurrent ? '0 0 8px #f59e0b' : 'none'
                    }}
                  />
                  <strong style={{ fontSize: '1.1rem', color: isCurrent ? '#f59e0b' : '#fff' }}>
                    {lordName(dasha.lord)} {language === 'MR' ? 'महादशा' : 'Mahadasha'}
                  </strong>
                  {isCurrent && (
                    <span
                      style={{
                        background: '#78350f',
                        color: '#fef08a',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px',
                        border: '1px solid rgba(245, 158, 11, 0.3)'
                      }}
                    >
                      {language === 'MR' ? 'सक्रिय' : 'ACTIVE PERIOD'}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                  <span>{dasha.startDate} {language === 'MR' ? 'ते' : 'to'} {dasha.endDate}</span>
                  <span style={{ fontSize: '1.1rem', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                    ▼
                  </span>
                </div>
              </div>

              {/* Antardashas Sub-List */}
              {isExpanded && (
                <div
                  style={{
                    padding: '1rem 1.5rem',
                    background: 'rgba(255, 255, 255, 0.01)',
                    borderTop: '1px solid rgba(139, 92, 246, 0.1)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '0.75rem'
                  }}
                >
                  {dasha.subDashas.map((sub, sIdx) => {
                    const isSubCurrent = isCurrentDasha(sub.startDate, sub.endDate);
                    return (
                      <div
                        key={`${sub.lord}-${sIdx}`}
                        style={{
                          border: isSubCurrent ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.03)',
                          background: isSubCurrent ? 'rgba(139, 92, 246, 0.08)' : 'rgba(255,255,255,0.02)',
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <div>
                          <span style={{ fontWeight: 600, color: isSubCurrent ? '#a78bfa' : '#fff' }}>
                            {lordName(sub.lord)}
                          </span>
                          <span style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8' }}>
                            {language === 'MR' ? 'अंतर्दशा' : 'Antardasha'}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.8rem', color: isSubCurrent ? '#a78bfa' : '#94a3b8', textAlign: 'right' }}>
                          <div>{sub.startDate}</div>
                          <div>{language === 'MR' ? 'ते' : 'to'} {sub.endDate}</div>
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

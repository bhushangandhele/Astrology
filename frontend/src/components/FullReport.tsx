import React from 'react';
import { KundaliChart } from './KundaliChart';
import { DashaViewer } from './DashaViewer';
import type { BirthChartResult } from '../engine/chart';
import type { Mahadasha } from '../engine/dasha';
import { CAREER_BY_10TH_SIGN, LOVE_BY_7TH_SIGN } from '../utils/interpretations';
import { analyzeJobType, analyzeJobSwitches } from '../engine/careerAnalysis';
import { analyzeMarriageType, analyzePartnerMeet, analyzeMangalDosh } from '../engine/marriageAnalysis';
import { SIGNS_MR, NAKSHATRAS_MR } from '../utils/i18n';

interface FullReportProps {
  chartData: BirthChartResult | null;
  dashaData: Mahadasha[] | null;
  localizedPredictions: any;
  language: 'EN' | 'MR';
}

export const FullReport: React.FC<FullReportProps> = ({ chartData, dashaData, localizedPredictions, language }) => {
  if (!chartData || !localizedPredictions) return null;

  const tenth = chartData.houses[10];
  const careerInfo = tenth ? CAREER_BY_10TH_SIGN[tenth.signName] : null;
  const jobTypePred = analyzeJobType(chartData);
  const jobSwitchPred = analyzeJobSwitches(chartData);

  const seventh = chartData.houses[7];
  const loveInfo = seventh ? LOVE_BY_7TH_SIGN[seventh.signName] : null;
  const marriagePrediction = analyzeMarriageType(chartData);
  const partnerMeetPrediction = analyzePartnerMeet(chartData);
  const mangalDoshPrediction = analyzeMangalDosh(chartData);

  return (
    <div id="full-print-report" className="print-only" style={{ color: '#000', background: '#fff', padding: '2rem', fontFamily: 'sans-serif' }}>
      
      {/* Header Page */}
      <div style={{ textAlign: 'center', marginBottom: '3rem', borderBottom: '2px solid #333', paddingBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 1rem 0' }}>{language === 'MR' ? 'संपूर्ण जन्म कुंडली अहवाल' : 'Comprehensive Astrological Report'}</h1>
        <h2 style={{ fontSize: '1.8rem', color: '#444', margin: '0 0 1rem 0' }}>{chartData.name}</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '1.2rem', color: '#555' }}>
          <div><strong>{language === 'MR' ? 'जन्म तारीख:' : 'Date of Birth:'}</strong> {chartData.dob}</div>
          <div><strong>{language === 'MR' ? 'वेळ:' : 'Time:'}</strong> {chartData.tob}</div>
          <div><strong>{language === 'MR' ? 'ठिकाण:' : 'Place:'}</strong> {chartData.place}</div>
        </div>
      </div>

      {/* Basic Highlights */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '3rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{language === 'MR' ? 'लग्न राशी' : 'Ascendant'}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{language === 'MR' ? SIGNS_MR[chartData.ascendant.sign]?.name || chartData.ascendant.sign : chartData.ascendant.sign}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{language === 'MR' ? 'जन्म राशी' : 'Moon Sign'}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{language === 'MR' ? SIGNS_MR[chartData.planets['Moon'].sign]?.name || chartData.planets['Moon'].sign : chartData.planets['Moon'].sign}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{language === 'MR' ? 'नक्षत्र' : 'Nakshatra'}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{language === 'MR' ? NAKSHATRAS_MR[chartData.planets['Moon'].nakshatra] || chartData.planets['Moon'].nakshatra : chartData.planets['Moon'].nakshatra}</div>
        </div>
      </div>

      {/* 1. Kundali Chart */}
      <div className="page-break-after" style={{ marginBottom: '4rem' }}>
        <h3 style={{ fontSize: '1.5rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>1. {language === 'MR' ? 'जन्म कुंडली' : 'Birth Chart (Kundali)'}</h3>
        <div style={{ maxWidth: '600px', margin: '0 auto', border: '1px solid #eee', padding: '1rem', borderRadius: '8px' }}>
          <KundaliChart chart={chartData} language={language} />
        </div>
      </div>

      {/* 2. Predictions */}
      <div className="page-break-after" style={{ marginBottom: '4rem' }}>
        <h3 style={{ fontSize: '1.5rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>2. {language === 'MR' ? 'व्यक्तिमत्व आणि जीवन फलादेश' : 'Personality & Life Predictions'}</h3>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{localizedPredictions.ascendant.title}</h4>
          <p style={{ lineHeight: '1.6' }}>{localizedPredictions.ascendant.text}</p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{localizedPredictions.sunPlacement.title}</h4>
          <p style={{ lineHeight: '1.6' }}>{localizedPredictions.sunPlacement.text}</p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{localizedPredictions.moonPlacement.title}</h4>
          <p style={{ lineHeight: '1.6' }}>{localizedPredictions.moonPlacement.text}</p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{localizedPredictions.nakshatra.title}</h4>
          <p style={{ lineHeight: '1.6' }}>{localizedPredictions.nakshatra.text}</p>
        </div>
      </div>

      {/* 3. Career */}
      {careerInfo && (
        <div className="page-break-after" style={{ marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '1.5rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>3. {language === 'MR' ? 'करिअर आणि व्यवसाय' : 'Career & Profession'}</h3>
          
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{language === 'MR' ? careerInfo.textMR : careerInfo.textEN}</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px', background: '#f8fafc' }}>
              <strong>{language === 'MR' ? 'करिअर प्रकार' : 'Career Type'}:</strong>
              <div style={{ marginTop: '0.5rem' }}>{language === 'MR' ? jobTypePred.MR : jobTypePred.EN}</div>
            </div>
            <div style={{ border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px', background: '#f8fafc' }}>
              <strong>{language === 'MR' ? 'नोकरी बदलण्याची शक्यता' : 'Job Switches'}:</strong>
              <div style={{ marginTop: '0.5rem' }}>{language === 'MR' ? jobSwitchPred.MR : jobSwitchPred.EN}</div>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <strong>{language === 'MR' ? 'शिफारस केलेले क्षेत्रे:' : 'Recommended Fields:'} </strong>
            {(language === 'MR' ? careerInfo.fieldsMR : careerInfo.fieldsEN).join(', ')}
          </div>
        </div>
      )}

      {/* 4. Love & Marriage */}
      {loveInfo && (
        <div className="page-break-after" style={{ marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '1.5rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>4. {language === 'MR' ? 'प्रेम आणि विवाह' : 'Love & Marriage'}</h3>
          
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{language === 'MR' ? loveInfo.textMR : loveInfo.textEN}</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px', background: '#f8fafc' }}>
              <strong>{language === 'MR' ? 'जोडीदाराचे गुण' : 'Spouse Traits'}:</strong>
              <div style={{ marginTop: '0.5rem' }}>{language === 'MR' ? loveInfo.spouseTraitsMR : loveInfo.spouseTraitsEN}</div>
            </div>
            <div style={{ border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px', background: '#f8fafc' }}>
              <strong>{language === 'MR' ? 'विवाह कालावधी' : 'Marriage Timing'}:</strong>
              <div style={{ marginTop: '0.5rem' }}>{language === 'MR' ? loveInfo.timingMR : loveInfo.timingEN}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px', background: '#f8fafc' }}>
              <strong>{language === 'MR' ? 'विवाहाचा प्रकार (Love / Arranged)' : 'Marriage Type Prediction'}:</strong>
              <div style={{ marginTop: '0.5rem' }}>{language === 'MR' ? marriagePrediction.MR : marriagePrediction.EN}</div>
            </div>
            <div style={{ border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px', background: '#f8fafc' }}>
              <strong>{language === 'MR' ? 'जोडीदाराची भेट कुठे होईल?' : 'Where Will You Meet Your Partner?'}:</strong>
              <div style={{ marginTop: '0.5rem' }}>{language === 'MR' ? partnerMeetPrediction.MR : partnerMeetPrediction.EN}</div>
            </div>
            <div style={{ border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px', background: '#f8fafc' }}>
              <strong>{language === 'MR' ? 'मंगळ दोष विचार' : 'Mangal Dosh Analysis'}:</strong>
              <div style={{ marginTop: '0.5rem', color: mangalDoshPrediction.hasDosh ? '#ef4444' : 'inherit' }}>
                <strong>{language === 'MR' ? mangalDoshPrediction.statusMR : mangalDoshPrediction.statusEN}</strong><br/>
                {language === 'MR' ? mangalDoshPrediction.adviceMR : mangalDoshPrediction.adviceEN}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Dashas */}
      {dashaData && (
        <div style={{ marginBottom: '4rem' }}>
          <h3 style={{ fontSize: '1.5rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>5. {language === 'MR' ? 'विंशोत्तरी दशा' : 'Vimshottari Dasha'}</h3>
          <p style={{ marginBottom: '1rem' }}>
             <strong>{language === 'MR' ? 'सध्याची तुमची महादशा:' : 'Current Active Period:'}</strong> {localizedPredictions.birthDasha.title}
          </p>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
            <DashaViewer dashas={dashaData} language={language} chartData={chartData} />
          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { StarryBackground } from './components/StarryBackground';
import { ProfileForm, type BirthProfileData } from './components/ProfileForm';
import { KundaliChart } from './components/KundaliChart';
import { DashaViewer } from './components/DashaViewer';
import { CompatibilityCard } from './components/CompatibilityCard';
import type { BirthChartResult } from './engine/chart';
import type { Mahadasha } from './engine/dasha';
import type { MatchResult } from './engine/compatibility';
import { calculateBirthChart } from './engine/chart';
import { calculateVimshottariDasha } from './engine/dasha';
import { calculateAshtakootMatch } from './engine/compatibility';
import {
  LAGNA_INTERPRETATIONS,
  SUN_HOUSE_INTERPRETATIONS,
  MOON_HOUSE_INTERPRETATIONS,
  NAKSHATRA_INTERPRETATIONS,
  DASHA_INTERPRETATIONS
} from './data/interpretations';
import { UI_TRANSLATIONS, PLANETS_MR, SIGNS_MR, NAKSHATRAS_MR, PREDICTIONS_MR } from './utils/i18n';
import { CAREER_BY_10TH_SIGN, LOVE_BY_7TH_SIGN } from './utils/interpretations';
import { analyzeMarriageType, analyzePartnerMeet } from './engine/marriageAnalysis';

interface Prediction {
  title: string;
  text: string;
}

interface PredictionsData {
  ascendant: Prediction;
  sunPlacement: Prediction;
  moonPlacement: Prediction;
  nakshatra: Prediction;
  birthDasha: Prediction;
}

export const App: React.FC = () => {
  // Language Selection
  const [language, setLanguage] = useState<'EN' | 'MR'>('EN');

  // Navigation / Tabs
  const [activeTab, setActiveTab] = useState<'predictions' | 'chart' | 'dasha' | 'career' | 'love' | 'matching'>('predictions');

  // Astrological Data State
  const [chartData, setChartData] = useState<BirthChartResult | null>(null);
  const [dashaData, setDashaData] = useState<Mahadasha[] | null>(null);
  const [predictionsData, setPredictionsData] = useState<PredictionsData | null>(null);
  
  // Loading & Error States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Matching Profile State
  const [isMatchingLoading, setIsMatchingLoading] = useState(false);
  const [partnerDetails, setPartnerDetails] = useState<BirthProfileData | null>(null);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [partnerRashiData, setPartnerRashiData] = useState<any | null>(null);

  // Localized predictions computation
  const getLocalizedPredictions = () => {
    if (!chartData || !predictionsData) return null;

    if (language === 'EN') {
      return predictionsData;
    }

    // Translate to Marathi
    const signNum = chartData.ascendant.signNumber;
    const sunHouse = chartData.planets.Sun.house!;
    const moonHouse = chartData.planets.Moon.house!;
    const nakshatraName = chartData.planets.Moon.nakshatra;
    const dashaLord = dashaData ? dashaData[0].lord : 'Mercury';

    const asc = PREDICTIONS_MR.ascendant[signNum] || {
      title: `${SIGNS_MR[chartData.ascendant.sign]?.name || chartData.ascendant.sign} लग्न`,
      text: predictionsData.ascendant.text
    };

    const sunPl = PREDICTIONS_MR.sun[sunHouse] || {
      title: `${sunHouse} व्या स्थानात सूर्य`,
      text: predictionsData.sunPlacement.text
    };

    const moonPl = PREDICTIONS_MR.moon[moonHouse] || {
      title: `${moonHouse} व्या स्थानात चंद्र`,
      text: predictionsData.moonPlacement.text
    };

    const nakNameMR = NAKSHATRAS_MR[nakshatraName] || nakshatraName;
    const nakLordMR = PLANETS_MR[chartData.planets.Moon.nakshatraRuler]?.full || chartData.planets.Moon.nakshatraRuler;
    const nak = {
      title: `${nakNameMR} नक्षत्र (स्वामी: ${nakLordMR})`,
      text: `तुमचा जन्म ${nakNameMR} नक्षत्रात झाला आहे. वैदिक ज्योतिषशास्त्रानुसार, हे नक्षत्र तुमच्या स्वभावातील संवेदनशीलता, कल्पकता आणि ज्ञानाची सखोल आवड दर्शवते. या नक्षत्राचे गुणधर्म तुम्हाला आयुष्यात चांगली यशप्राप्ती करून देतील.`
    };

    const dashaMR = PREDICTIONS_MR.dasha[dashaLord] || {
      title: `${PLANETS_MR[dashaLord]?.full || dashaLord} महादशा`,
      text: predictionsData.birthDasha.text
    };

    return {
      ascendant: asc,
      sunPlacement: sunPl,
      moonPlacement: moonPl,
      nakshatra: nak,
      birthDasha: dashaMR
    };
  };

  const localizedPredictions = getLocalizedPredictions();

  // Trigger main birth chart calculation
  const handleCalculateChart = async (profile: BirthProfileData) => {
    setIsLoading(true);
    setError(null);
    setMatchResult(null); // Clear previous match
    setPartnerDetails(null);

    try {
      // 1. Calculate Birth Chart client-side
      const chart = calculateBirthChart(
        profile.name,
        profile.dob,
        profile.tob,
        Number(profile.latitude),
        Number(profile.longitude),
        profile.timezone,
        profile.place || ''
      );

      // 2. Calculate Vimshottari Dashas client-side
      const moonLong = chart.planets.Moon.longitude;
      const dashas = calculateVimshottariDasha(moonLong, profile.dob, profile.tob);

      // 3. Compile Interpretations & Predictions client-side
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

      setChartData(chart);
      setDashaData(dashas);
      setPredictionsData(predictions);
      setActiveTab('predictions'); // Focus on predictions on successful load
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during calculations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger compatibility matching calculation
  const handleCalculateMatch = async (partnerProfile: BirthProfileData) => {
    if (!chartData) return;
    setIsMatchingLoading(true);
    setError(null);

    try {
      const brideProfile = {
        name: chartData.name,
        dob: chartData.dob,
        tob: chartData.tob,
        latitude: chartData.latitude,
        longitude: chartData.longitude,
        timezone: chartData.timezone
      };

      // 1. Calculate Moon Longitudes for both profiles client-side
      const chartA = calculateBirthChart(
        brideProfile.name,
        brideProfile.dob,
        brideProfile.tob,
        Number(brideProfile.latitude),
        Number(brideProfile.longitude),
        brideProfile.timezone,
        chartData.place || ''
      );

      const chartB = calculateBirthChart(
        partnerProfile.name,
        partnerProfile.dob,
        partnerProfile.tob,
        Number(partnerProfile.latitude),
        Number(partnerProfile.longitude),
        partnerProfile.timezone,
        partnerProfile.place || ''
      );

      const moonLongA = chartA.planets.Moon.longitude;
      const moonLongB = chartB.planets.Moon.longitude;

      // 2. Perform Ashtakoot Gun Milan Matching client-side
      const match = calculateAshtakootMatch(moonLongA, moonLongB);

      setPartnerDetails(partnerProfile);
      setPartnerRashiData({
        name: chartB.name,
        rashi: chartB.planets.Moon.sign,
        nakshatra: chartB.planets.Moon.nakshatra,
        pada: chartB.planets.Moon.pada
      });
      setMatchResult(match);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to calculate matching score.');
    } finally {
      setIsMatchingLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Twilight Animated Starfield Background */}
      <StarryBackground />

      {/* Main Header navigation */}
      <header>
        <div className="header-content">
          <div className="logo-section" style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '1.8rem' }}>🌌</span>
            <h1 className="logo-text">{UI_TRANSLATIONS[language].astrologyTitle}</h1>
            
            {/* Language Switcher */}
            <div className="language-switcher" style={{ marginLeft: 'auto', display: 'flex', gap: '0.25rem', background: 'rgba(255,255,255,0.05)', padding: '3px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <button 
                type="button"
                onClick={() => setLanguage('EN')}
                style={{
                  background: language === 'EN' ? 'linear-gradient(135deg, #fbbf24, #d97706)' : 'transparent',
                  color: language === 'EN' ? '#0c0a1e' : '#cbd5e1',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '4px 12px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                EN
              </button>
              <button 
                type="button"
                onClick={() => setLanguage('MR')}
                style={{
                  background: language === 'MR' ? 'linear-gradient(135deg, #fbbf24, #d97706)' : 'transparent',
                  color: language === 'MR' ? '#0c0a1e' : '#cbd5e1',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '4px 12px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                मराठी
              </button>
            </div>
          </div>
          {chartData && (
            <div className="nav-links">
              <button
                className={`nav-button ${activeTab === 'predictions' ? 'active' : ''}`}
                onClick={() => setActiveTab('predictions')}
              >
                {UI_TRANSLATIONS[language].lifePredictionsTab}
              </button>
              <button
                className={`nav-button ${activeTab === 'chart' ? 'active' : ''}`}
                onClick={() => setActiveTab('chart')}
              >
                {UI_TRANSLATIONS[language].birthChartTab}
              </button>
              <button
                className={`nav-button ${activeTab === 'dasha' ? 'active' : ''}`}
                onClick={() => setActiveTab('dasha')}
              >
                {UI_TRANSLATIONS[language].vimshottariDashaTab}
              </button>
              <button
                className={`nav-button ${activeTab === 'career' ? 'active' : ''}`}
                onClick={() => setActiveTab('career')}
                style={{ color: activeTab === 'career' ? undefined : '#10b981' }}
              >
                {language === 'MR' ? '💼 करिअर' : '💼 Career'}
              </button>
              <button
                className={`nav-button ${activeTab === 'love' ? 'active' : ''}`}
                onClick={() => setActiveTab('love')}
                style={{ color: activeTab === 'love' ? undefined : '#f472b6' }}
              >
                {language === 'MR' ? '❤️ प्रेम/विवाह' : '❤️ Love & Marriage'}
              </button>
              <button
                className={`nav-button ${activeTab === 'matching' ? 'active' : ''}`}
                onClick={() => setActiveTab('matching')}
              >
                {UI_TRANSLATIONS[language].gunMilanMatchingTab}
              </button>
            </div>
          )}
        </div>
      </header>
 
       {/* Primary Application Workspace */}
       <main className="main-content">
         <div className={chartData ? "workspace-layout" : "workspace-layout welcome"}>
           
           {/* Left Column: DOB Entry Form */}
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
             <ProfileForm onSubmit={handleCalculateChart} isLoading={isLoading} language={language} />
             
             {chartData && (
               <div className="glass-panel" style={{ padding: '1.25rem 1.5rem', background: 'rgba(25, 20, 53, 0.4)' }}>
                 <span style={{ fontSize: '0.8rem', color: '#94a3b8', letterSpacing: '0.05em' }}>
                   {language === 'MR' ? 'मोजणी केलेले प्रोफाईल:' : 'CALCULATING CHART FOR'}
                 </span>
                 <h4 style={{ fontSize: '1.2rem', color: '#f59e0b', margin: '0.15rem 0' }}>{chartData.name}</h4>
                 <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.4' }}>
                   {language === 'MR' ? (
                     <>
                       जन्मतारीख: {chartData.dob} वेळ: {chartData.tob} वा.<br />
                       ठिकाण: {chartData.place}
                     </>
                   ) : (
                     <>
                       Born on {chartData.dob} at {chartData.tob}<br />
                       in {chartData.place}
                     </>
                   )}
                 </p>
               </div>
             )}
           </div>

          {/* Right Column: Calculations & Interpretations Display */}
          <div>
            {error && (
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid #ef4444',
                  color: '#fca5a5',
                  padding: '1rem 1.5rem',
                  borderRadius: '12px',
                  marginBottom: '1.5rem',
                  fontSize: '0.95rem'
                }}
              >
                ⚠️ <strong>Error:</strong> {error}
              </div>
            )}

            {chartData ? (
              <div>
                {/* 1. Life Predictions Tab */}
                {activeTab === 'predictions' && localizedPredictions && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Onboarding Guide Callout */}
                    <div 
                      className="glass-panel" 
                      style={{ 
                        borderLeft: '4px solid var(--color-gold)', 
                        background: 'rgba(245, 158, 11, 0.03)', 
                        padding: '1rem 1.25rem', 
                        borderRadius: '0 12px 12px 0' 
                      }}
                    >
                      <h4 style={{ color: 'var(--color-gold)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        🔭 {language === 'MR' ? 'कसे वाचायचे:' : 'How to Read Your Predictions:'}
                      </h4>
                      <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
                        {language === 'MR'
                          ? 'या विभागात तुमचे लग्न (Ascendant), सूर्य-चंद्र स्थिती आणि जन्म नक्षत्राचे फलादेश दिले आहेत. हे तुमच्या संपूर्ण व्यक्तिमत्त्व आणि मूळ स्वभावधर्माचे विश्लेषण करते.'
                          : 'This section details your core characteristics based on your Ascendant (personality), Sun placement (career/soul), Moon placement (mind/emotions), Nakshatra (temperament), and active Dasha period.'}
                      </p>
                    </div>

                    {/* Prominent Ascendant and Moon Badges */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ flex: '1 1 250px', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.1))', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ fontSize: '2.5rem' }}>🌅</div>
                        <div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f59e0b', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
                            {language === 'MR' ? 'लग्न राशी (Ascendant)' : 'ASCENDANT (Lagna)'}
                          </div>
                          <div style={{ fontSize: '1.4rem', fontWeight: 600, color: '#fff' }}>
                            {language === 'MR' ? SIGNS_MR[chartData.ascendant.sign]?.name || chartData.ascendant.sign : chartData.ascendant.sign}
                          </div>
                        </div>
                      </div>
                      <div style={{ flex: '1 1 250px', background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(14, 165, 233, 0.1))', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '12px', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ fontSize: '2.5rem' }}>🌙</div>
                        <div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
                            {language === 'MR' ? 'जन्म राशी (Moon Sign)' : 'MOON SIGN (Rashi)'}
                          </div>
                          <div style={{ fontSize: '1.4rem', fontWeight: 600, color: '#fff' }}>
                            {language === 'MR' ? SIGNS_MR[chartData.planets['Moon'].sign]?.name || chartData.planets['Moon'].sign : chartData.planets['Moon'].sign}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="glass-panel gold-themed">
                      <h3 className="title-cosmic" style={{ fontSize: '1.5rem', borderBottom: '1px solid rgba(245, 158, 11, 0.2)', paddingBottom: '0.5rem' }}>
                        {localizedPredictions.ascendant.title}
                      </h3>
                      <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#cbd5e1' }}>
                        {localizedPredictions.ascendant.text}
                      </p>
                    </div>

                    <div className="grid-2">
                      <div className="glass-panel">
                        <h4 className="title-cosmic" style={{ fontSize: '1.2rem', color: '#cbd5e1' }}>
                          {localizedPredictions.sunPlacement.title}
                        </h4>
                        <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#94a3b8' }}>
                          {localizedPredictions.sunPlacement.text}
                        </p>
                      </div>

                      <div className="glass-panel">
                        <h4 className="title-cosmic" style={{ fontSize: '1.2rem', color: '#cbd5e1' }}>
                          {localizedPredictions.moonPlacement.title}
                        </h4>
                        <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#94a3b8' }}>
                          {localizedPredictions.moonPlacement.text}
                        </p>
                      </div>
                    </div>

                    <div className="glass-panel">
                      <h4 className="title-cosmic" style={{ fontSize: '1.25rem', color: '#8b5cf6' }}>
                        {localizedPredictions.nakshatra.title}
                      </h4>
                      <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#cbd5e1' }}>
                        {localizedPredictions.nakshatra.text}
                      </p>
                    </div>

                    <div className="glass-panel gold-themed">
                      <h4 className="title-cosmic" style={{ fontSize: '1.25rem' }}>
                        {language === 'MR' ? 'सक्रिय विंशोत्तरी दशा: ' : 'Active Vimshottari period: '}{localizedPredictions.birthDasha.title}
                      </h4>
                      <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#cbd5e1' }}>
                        {localizedPredictions.birthDasha.text}
                      </p>
                    </div>
                  </div>
                )}

                {/* 2. Interactive SVG Birth Chart Tab */}
                {activeTab === 'chart' && (
                  <KundaliChart chart={chartData} language={language} />
                )}

                {/* 3. Vimshottari Dasha Tree Tab */}
                {activeTab === 'dasha' && dashaData && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div 
                      className="glass-panel" 
                      style={{ 
                        borderLeft: '4px solid #a855f7', 
                        background: 'rgba(168, 85, 247, 0.05)', 
                        padding: '1rem 1.25rem', 
                        borderRadius: '0 12px 12px 0' 
                      }}
                    >
                      <h4 style={{ color: '#c084fc', fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        ⏳ {language === 'MR' ? 'विंशोत्तरी दशा म्हणजे काय?' : 'What is Vimshottari Dasha?'}
                      </h4>
                      <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                        {language === 'MR'
                          ? 'विंशोत्तरी दशा हे १२० वर्षांचे ग्रहांचे चक्र आहे. "महादशा" (Major Period) तुमच्या आयुष्यातील प्रमुख घटना आणि प्रवृत्ती ठरवते, तर "अंतर्दशा" (Sub Period) त्या काळात घडणाऱ्या विशिष्ट घटनांना चालना देते. खालील तक्त्यामध्ये तुमच्या आयुष्यात कोणत्या ग्रहाचा काळ कधी सुरू होतो आणि संपतो हे दिले आहे.'
                          : 'Vimshottari Dasha is a 120-year planetary timeline. The Mahadasha (Major Period) indicates the overarching theme of your life, while the Antardasha (Sub-period) triggers specific events. The dates below show exactly when each planet\'s influence begins and ends.'}
                      </p>
                    </div>
                    <DashaViewer dashas={dashaData} language={language} />
                  </div>
                )}

                {/* 5. Career Tab */}
                {activeTab === 'career' && (() => {
                  const tenth = chartData.houses[10];
                  const careerInfo = tenth ? CAREER_BY_10TH_SIGN[tenth.signName] : null;
                  const planets10 = tenth?.planets ?? [];
                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div className="glass-panel" style={{ border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.04)', padding: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(16,185,129,0.15)', paddingBottom: '1rem' }}>
                          <span style={{ fontSize: '2.5rem' }}>💼</span>
                          <div>
                            <h3 className="title-cosmic" style={{ fontSize: '1.6rem', color: '#10b981', marginBottom: '0.2rem' }}>
                              {language === 'MR' ? 'करिअर आणि व्यवसाय' : 'Career & Profession'}
                            </h3>
                            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                              {language === 'MR' ? '१० वे भाव (कर्म स्थान):' : '10th House (Karma Bhava):'} <strong style={{ color: '#10b981' }}>{tenth?.signName}</strong>
                            </div>
                          </div>
                        </div>
                        {/* Onboarding Guide Callout */}
                        <div 
                          style={{ 
                            borderLeft: '4px solid #10b981', 
                            background: 'rgba(16, 185, 129, 0.05)', 
                            padding: '0.85rem 1.15rem', 
                            borderRadius: '0 8px 8px 0',
                            marginBottom: '1.5rem',
                            fontSize: '0.85rem',
                            lineHeight: '1.5',
                            color: '#cbd5e1'
                          }}
                        >
                          <strong>💡 {language === 'MR' ? 'करिअर मार्गदर्शन:' : 'Career Guide:'}</strong> {language === 'MR' 
                            ? 'कुंडलीतील १० वे स्थान (कर्म भाव) आणि त्यातील ग्रह तुमच्या व्यावसायिक यश, अधिकार आणि सर्वोत्तम करिअर क्षेत्रांबद्दल अचूक माहिती देतात.'
                            : 'The 10th house determines your professional status, workspace success, leadership, and public influence. Check the recommended fields and planet influences below.'}
                        </div>
                        {careerInfo && (
                          <>
                            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#cbd5e1', marginBottom: '1.5rem' }}>{careerInfo.text}</p>
                            <div style={{ marginBottom: '1.5rem' }}>
                              <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                                {language === 'MR' ? 'शिफारस केलेले क्षेत्रे / व्यवसाय:' : 'RECOMMENDED CAREER FIELDS:'}
                              </div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {careerInfo.fields.map(f => (
                                  <span key={f} style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>{f}</span>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                        {planets10.length > 0 && (
                          <div>
                            <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                              {language === 'MR' ? '१० व्या भावातील ग्रह (करिअरवर प्रभाव):' : 'PLANETS IN 10TH HOUSE (Career Influencers):'}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                              {planets10.map(pName => {
                                const p = chartData.planets[pName];
                                const pColor = pName === 'Sun' ? '#f59e0b' : pName === 'Moon' ? '#38bdf8' : pName === 'Mars' ? '#f87171' : pName === 'Jupiter' ? '#fbbf24' : pName === 'Venus' ? '#f472b6' : '#a78bfa';
                                return (
                                  <div key={pName} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${pColor}30`, borderRadius: '10px', padding: '0.75rem 1rem' }}>
                                    <div style={{ fontWeight: 700, color: pColor, marginBottom: '0.25rem' }}>
                                      {language === 'MR' ? PLANETS_MR[pName]?.full ?? pName : pName} — {p?.degreeInSign?.toFixed(1)}° {language === 'MR' ? `${SIGNS_MR[p?.sign]?.name ?? p?.sign} मध्ये` : `in ${p?.sign}`} ({language === 'MR' ? NAKSHATRAS_MR[p?.nakshatra] ?? p?.nakshatra : p?.nakshatra})
                                    </div>
                                    <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                                      {language === 'MR' ? 'हा ग्रह करिअरमध्ये शक्तिशाली प्रभाव टाकतो.' : 'This planet powerfully influences your 10th house career direction.'}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {/* 6. Love & Marriage Tab */}
                {activeTab === 'love' && (() => {
                  const seventh = chartData.houses[7];
                  const loveInfo = seventh ? LOVE_BY_7TH_SIGN[seventh.signName] : null;
                  const planets7 = seventh?.planets ?? [];
                  const venus = chartData.planets['Venus'];
                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div className="glass-panel" style={{ border: '1px solid rgba(244,114,182,0.3)', background: 'rgba(244,114,182,0.04)', padding: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(244,114,182,0.15)', paddingBottom: '1rem' }}>
                          <span style={{ fontSize: '2.5rem' }}>❤️</span>
                          <div>
                            <h3 className="title-cosmic" style={{ fontSize: '1.6rem', color: '#f472b6', marginBottom: '0.2rem' }}>
                              {language === 'MR' ? 'प्रेम आणि विवाह' : 'Love & Marriage'}
                            </h3>
                            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                              {language === 'MR' ? '७ वे भाव (जाया स्थान):' : '7th House (Yuvati Bhava):'} <strong style={{ color: '#f472b6' }}>{seventh?.signName}</strong>
                            </div>
                          </div>
                        </div>
                        {/* Onboarding Guide Callout */}
                        <div 
                          style={{ 
                            borderLeft: '4px solid #f472b6', 
                            background: 'rgba(244, 114, 182, 0.05)', 
                            padding: '0.85rem 1.15rem', 
                            borderRadius: '0 8px 8px 0',
                            marginBottom: '1.5rem',
                            fontSize: '0.85rem',
                            lineHeight: '1.5',
                            color: '#cbd5e1'
                          }}
                        >
                          <strong>💡 {language === 'MR' ? 'विवाह मार्गदर्शन:' : 'Relationship Guide:'}</strong> {language === 'MR' 
                            ? 'कुंडलीतील ७ वे स्थान (जाया भाव) तुमच्या वैवाहिक जोडीदाराचा स्वभाव, विवाहाचे सुख आणि विवाहाचा काळ दर्शवते. शुक्राची स्थिती प्रेमाचा सखोल फलादेश देते.'
                            : 'The 7th house governs marriage, partnerships, and spouse characteristics. Venus indicates how you express and receive love. Check your spouse qualities and timings below.'}
                        </div>
                        {loveInfo && (
                          <>
                            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#cbd5e1', marginBottom: '1.5rem' }}>{loveInfo.text}</p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                              <div style={{ background: 'rgba(244,114,182,0.07)', border: '1px solid rgba(244,114,182,0.2)', borderRadius: '10px', padding: '1rem' }}>
                                <div style={{ fontSize: '0.75rem', color: '#f472b6', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '0.5rem' }}>✨ {language === 'MR' ? 'जोडीदाराचे गुण' : 'SPOUSE TRAITS'}</div>
                                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', margin: 0, lineHeight: '1.6' }}>{loveInfo.spouseTraits}</p>
                              </div>
                              <div style={{ background: 'rgba(244,114,182,0.07)', border: '1px solid rgba(244,114,182,0.2)', borderRadius: '10px', padding: '1rem' }}>
                                <div style={{ fontSize: '0.75rem', color: '#f472b6', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '0.5rem' }}>💍 {language === 'MR' ? 'विवाह कालावधी' : 'MARRIAGE TIMING'}</div>
                                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', margin: 0, lineHeight: '1.6' }}>{loveInfo.timing}</p>
                              </div>
                            </div>
                            
                            {/* NEW: Love vs Arranged Marriage & Partner Meet Details */}
                            {(() => {
                              const marriagePrediction = analyzeMarriageType(chartData);
                              const partnerMeetPrediction = analyzePartnerMeet(chartData);
                              return (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                  <div style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(219, 39, 119, 0.05))', border: '1px solid rgba(236, 72, 153, 0.3)', borderRadius: '10px', padding: '1.25rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                      <span style={{ fontSize: '1.2rem' }}>{marriagePrediction.type === 'Love' ? '💖' : marriagePrediction.type === 'Arranged' ? '🤝' : '💕'}</span>
                                      <div style={{ fontSize: '0.9rem', color: '#f472b6', fontWeight: 700, letterSpacing: '0.05em' }}>
                                        {language === 'MR' ? 'विवाहाचा प्रकार (Love / Arranged)' : 'MARRIAGE TYPE PREDICTION'}
                                      </div>
                                    </div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem' }}>
                                      {marriagePrediction.type === 'Love' ? (language === 'MR' ? 'प्रेम विवाह (Love Marriage)' : 'Love Marriage') : marriagePrediction.type === 'Arranged' ? (language === 'MR' ? 'ठरवून केलेले लग्न (Arranged Marriage)' : 'Arranged Marriage') : (language === 'MR' ? 'प्रेम-कम-अरेंज मॅरेज' : 'Love-cum-Arranged Marriage')}
                                    </div>
                                    <p style={{ fontSize: '0.95rem', color: '#cbd5e1', margin: 0, lineHeight: '1.6' }}>
                                      {language === 'MR' ? marriagePrediction.MR : marriagePrediction.EN}
                                    </p>
                                  </div>

                                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '1.25rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                      <span style={{ fontSize: '1.2rem' }}>📍</span>
                                      <div style={{ fontSize: '0.9rem', color: '#f472b6', fontWeight: 700, letterSpacing: '0.05em' }}>
                                        {language === 'MR' ? 'जोडीदाराशी भेट कशी होईल?' : 'HOW WILL YOU MEET YOUR PARTNER?'}
                                      </div>
                                    </div>
                                    <p style={{ fontSize: '0.95rem', color: '#cbd5e1', margin: 0, lineHeight: '1.6' }}>
                                      {language === 'MR' ? partnerMeetPrediction.MR : partnerMeetPrediction.EN}
                                    </p>
                                  </div>
                                </div>
                              );
                            })()}
                          </>
                        )}
                        {venus && (
                          <div style={{ background: 'rgba(244,114,182,0.05)', border: '1px solid rgba(244,114,182,0.15)', borderRadius: '10px', padding: '1rem', marginBottom: '1rem' }}>
                            <div style={{ fontSize: '0.75rem', color: '#f472b6', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '0.5rem' }}>🌹 {language === 'MR' ? 'शुक्र ग्रह स्थिती (प्रेमाचा कारक)' : 'VENUS POSITION (Planet of Love)'}</div>
                            <p style={{ fontSize: '0.9rem', color: '#cbd5e1', margin: 0, lineHeight: '1.6' }}>
                              {language === 'MR'
                                ? `शुक्र ग्रह ${venus.sign} राशीमध्ये, ${venus.house} व्या भावात ${venus.nakshatra} नक्षत्रात आहे. शुक्र हा प्रेम, सौंदर्य आणि विवाह सुखाचा कारक ग्रह आहे.`
                                : `Venus is placed in ${venus.sign} in the ${venus.house}th house in ${venus.nakshatra} nakshatra. Venus governs love, beauty, and marital happiness.`}
                            </p>
                          </div>
                        )}
                        {planets7.length > 0 && (
                          <div>
                            <div style={{ fontSize: '0.75rem', color: '#f472b6', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                              {language === 'MR' ? '७ व्या भावातील ग्रह (विवाहावर प्रभाव):' : 'PLANETS IN 7TH HOUSE (Marriage Influencers):'}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                              {planets7.map(pName => {
                                const p = chartData.planets[pName];
                                const pColor = pName === 'Sun' ? '#f59e0b' : pName === 'Moon' ? '#38bdf8' : pName === 'Mars' ? '#f87171' : pName === 'Jupiter' ? '#fbbf24' : pName === 'Venus' ? '#f472b6' : '#a78bfa';
                                return (
                                  <div key={pName} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${pColor}30`, borderRadius: '10px', padding: '0.75rem 1rem' }}>
                                    <div style={{ fontWeight: 700, color: pColor, marginBottom: '0.25rem' }}>
                                      {language === 'MR' ? PLANETS_MR[pName]?.full ?? pName : pName} — {p?.degreeInSign?.toFixed(1)}° {language === 'MR' ? `${SIGNS_MR[p?.sign]?.name ?? p?.sign} मध्ये` : `in ${p?.sign}`} ({language === 'MR' ? NAKSHATRAS_MR[p?.nakshatra] ?? p?.nakshatra : p?.nakshatra})
                                    </div>
                                    <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                                      {language === 'MR' ? 'हा ग्रह तुमच्या विवाह आणि प्रेम जीवनावर प्रभाव टाकतो.' : 'This planet directly influences your marriage and love life.'}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {/* 4. Ashtakoot Compatibility Matching Tab */}
                {activeTab === 'matching' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {matchResult && partnerDetails && partnerRashiData ? (
                      <div>
                        <CompatibilityCard
                          partnerA={{
                            name: chartData.name,
                            rashi: chartData.planets.Moon.sign,
                            nakshatra: chartData.planets.Moon.nakshatra,
                            pada: chartData.planets.Moon.pada
                          }}
                          partnerB={{
                            name: partnerDetails.name,
                            rashi: partnerRashiData.rashi,
                            nakshatra: partnerRashiData.nakshatra,
                            pada: partnerRashiData.pada
                          }}
                          matchResult={matchResult}
                          language={language}
                        />
                        <button
                          className="btn-cosmic secondary"
                          style={{ marginTop: '1.5rem', width: '100%' }}
                          onClick={() => setMatchResult(null)}
                        >
                          {UI_TRANSLATIONS[language].matchAnother}
                        </button>
                      </div>
                    ) : (
                      <div className="glass-panel">
                        <h3 className="title-cosmic" style={{ fontSize: '1.4rem', borderBottom: '1px solid rgba(139, 92, 246, 0.2)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                          {UI_TRANSLATIONS[language].gunMilanTitle}
                        </h3>
                        <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                          {language === 'MR' ? (
                            `अष्टकूट पद्धतीनुसार वधू आणि वराची कुंडली जुळवणी करा. वर (मुलगा) चे जन्मतपशील प्रविष्ट करा आणि ${chartData.name} सोबतचे गुण मिलन तपासा (एकूण ३६ गुणांपैकी).`
                          ) : (
                            `Calculate Vedic compatibility (Gun Milan) based on the 8-fold Ashtakoot system. Enter the Groom's birth details below to check their compatibility score against ${chartData.name} (out of 36 points).`
                          )}
                        </p>
                        <ProfileForm
                          onSubmit={handleCalculateMatch}
                          isLoading={isMatchingLoading}
                          submitButtonText={UI_TRANSLATIONS[language].calculateMatch}
                          language={language}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* Landing Card / Welcome Onboarding Instructions & Creator badge */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Presentation Badge */}
                <div className="glass-panel gold-themed animated-float" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: '1rem', filter: 'drop-shadow(0 0 15px var(--color-gold-glow))' }}>🪐</div>
                  <h2 className="title-cosmic" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                    {UI_TRANSLATIONS[language].title}
                  </h2>
                  <div 
                    style={{ 
                      display: 'inline-block',
                      background: 'rgba(245, 158, 11, 0.1)', 
                      border: '1px solid rgba(245, 158, 11, 0.3)', 
                      color: '#f59e0b',
                      padding: '0.25rem 1rem',
                      borderRadius: '50px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      marginBottom: '1rem'
                    }}
                  >
                    {language === 'MR' ? '✨ निर्मिती व रचना: भूषण गंधेले' : '✨ Designed & Developed by Bhushan Gandhele'}
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '0' }}>
                    {UI_TRANSLATIONS[language].subtitle}
                  </p>
                </div>

                {/* Onboarding Guide / Feature Guide */}
                <div className="glass-panel" style={{ padding: '2rem' }}>
                  <h3 className="title-cosmic" style={{ fontSize: '1.3rem', color: '#a78bfa', borderBottom: '1px solid rgba(167, 139, 250, 0.2)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                    {language === 'MR' ? '🌌 मुख्य वैशिष्ट्ये आणि मार्गदर्शिका' : '🌌 Core Features & User Guide'}
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Feature 1 */}
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ fontSize: '1.75rem', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '8px', padding: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>🔭</div>
                      <div>
                        <h4 style={{ color: '#f59e0b', fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                          {language === 'MR' ? '१. जीवन फलादेश (Predictions)' : '1. Life Predictions'}
                        </h4>
                        <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.5', margin: 0 }}>
                          {language === 'MR' 
                            ? 'तुमचे लग्न (Ascendant), सूर्य-चंद्र स्थिती आणि जन्मनक्षत्राच्या आधारे सखोल स्वभाव व जीवन मार्ग जाणण्यासाठी.' 
                            : 'Analyze your Ascendant (Lagna), Sun, Moon, and birth Nakshatra to reveal personality traits and life destiny.'}
                        </p>
                      </div>
                    </div>

                    {/* Feature 2 */}
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ fontSize: '1.75rem', background: 'rgba(167, 139, 250, 0.1)', border: '1px solid rgba(167, 139, 250, 0.2)', borderRadius: '8px', padding: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>🗺️</div>
                      <div>
                        <h4 style={{ color: '#a78bfa', fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                          {language === 'MR' ? '२. परस्परसंवादी जन्म कुंडली (Interactive Kundali)' : '2. Interactive Birth Chart'}
                        </h4>
                        <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.5', margin: 0 }}>
                          {language === 'MR'
                            ? 'अचूक उत्तर भारतीय D1 कुंडली. कोणत्याही भावावर (घरावर) टॅप करून तेथील ग्रह, स्वामी आणि शास्त्रीय अर्थ पहा.'
                            : 'Interactive North Indian D1 Kundali. Tap on any house to instantly check planets, rulers, and expert interpretations.'}
                        </p>
                      </div>
                    </div>

                    {/* Feature 3 */}
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ fontSize: '1.75rem', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '8px', padding: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>📅</div>
                      <div>
                        <h4 style={{ color: '#38bdf8', fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                          {language === 'MR' ? '३. विंशोत्तरी महादशा (Vimshottari Dasha)' : '3. Vimshottari Dasha Tree'}
                        </h4>
                        <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.5', margin: 0 }}>
                          {language === 'MR'
                            ? 'तुमच्या संपूर्ण १२० वर्षांच्या महादशा आणि अंतर्दशा कालावधीचे अचूक झाड (Dasha Tree) तपासा.'
                            : 'View a detailed 120-year Mahadasha and Antardasha tree calculated client-side to the exact second.'}
                        </p>
                      </div>
                    </div>

                    {/* Feature 4 */}
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ fontSize: '1.75rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '8px', padding: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>💼</div>
                      <div>
                        <h4 style={{ color: '#10b981', fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                          {language === 'MR' ? '४. करिअर आणि व्यवसाय मार्गदर्शन (Career)' : '4. Career Path Analysis'}
                        </h4>
                        <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.5', margin: 0 }}>
                          {language === 'MR'
                            ? '१० व्या कर्म स्थानाचा सखोल अभ्यास करून तुमच्यासाठी शिफारस केलेले सर्वोत्तम व्यावसायिक क्षेत्र शोधा.'
                            : 'Analyzes the 10th house (Karma Bhava) and planets to suggest optimal professional paths and business success.'}
                        </p>
                      </div>
                    </div>

                    {/* Feature 5 */}
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ fontSize: '1.75rem', background: 'rgba(244, 114, 182, 0.1)', border: '1px solid rgba(244, 114, 182, 0.2)', borderRadius: '8px', padding: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>❤️</div>
                      <div>
                        <h4 style={{ color: '#f472b6', fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                          {language === 'MR' ? '५. प्रेम आणि विवाह भविष्य (Love & Marriage)' : '5. Love & Marriage Placements'}
                        </h4>
                        <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.5', margin: 0 }}>
                          {language === 'MR'
                            ? '७ व्या स्थानाचा आणि शुक्र ग्रहाचा अभ्यास करून वैवाहिक सुख, जोडीदाराचा स्वभाव आणि विवाह काळ पहा.'
                            : 'Examines the 7th house and Venus (planet of love) to reveal spouse traits, timing, and marital harmony.'}
                        </p>
                      </div>
                    </div>

                    {/* Feature 6 */}
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ fontSize: '1.75rem', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '8px', padding: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>🔮</div>
                      <div>
                        <h4 style={{ color: '#8b5cf6', fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                          {language === 'MR' ? '६. अष्टकूट कुंडली गुण मिलन (Gun Milan)' : '6. Gun Milan Compatibility'}
                        </h4>
                        <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.5', margin: 0 }}>
                          {language === 'MR'
                            ? 'वधू-वरांच्या नक्षत्रांचे अष्टकूट जुळवून ३६ गुणांपैकी अचूक स्कोअर आणि नाडी दोषादी मिलन तपासा.'
                            : 'Enter groom details to check traditional 8-fold compatibility matching score out of 36 points.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Privacy Badge */}
                <div style={{ textAlign: 'center', color: '#64748b', fontSize: '0.8rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <span>🛡️ {language === 'MR' ? '१००% खाजगी आणि गोपनीय (स्थानिक गणिते)' : '100% Private (Calculations run on device)'}</span>
                  <span>⚡ {language === 'MR' ? 'झटपट खगोलीय आकडेमोड' : 'Computed instantly'}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer>
        <p>{UI_TRANSLATIONS[language].copyright}</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#a78bfa' }}>
          {language === 'MR' ? 'निर्मिती व रचना: भूषण गंधेले' : 'Designed & Developed by Bhushan Gandhele'}
        </p>
      </footer>
    </div>
  );
};

export default App;

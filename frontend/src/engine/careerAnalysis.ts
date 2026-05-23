import type { BirthChartResult } from './chart';

export interface JobPrediction {
  type: 'Government' | 'Private' | 'Business';
  EN: string;
  MR: string;
}

export interface JobSwitchPrediction {
  frequency: 'High' | 'Low' | 'Moderate';
  EN: string;
  MR: string;
}

export function analyzeJobType(chart: BirthChartResult): JobPrediction {
  const house10 = chart.houses[10];
  const planets10 = house10?.planets || [];
  const sunPlacement = chart.planets['Sun']?.house;
  const saturnPlacement = chart.planets['Saturn']?.house;
  const mercuryPlacement = chart.planets['Mercury']?.house;

  let govtScore = 0;
  let privateScore = 0;
  let businessScore = 0;

  // Government Indicators (Sun, Jupiter)
  if (planets10.includes('Sun')) govtScore += 3;
  if (planets10.includes('Jupiter')) govtScore += 2;
  if (sunPlacement === 1 || sunPlacement === 9 || sunPlacement === 11) govtScore += 1;

  // Private Corporate Indicators (Saturn, Mars)
  if (planets10.includes('Saturn')) privateScore += 3;
  if (planets10.includes('Mars')) privateScore += 2;
  if (saturnPlacement === 6 || saturnPlacement === 11) privateScore += 1;

  // Business Indicators (Mercury, Venus)
  if (planets10.includes('Mercury') || planets10.includes('Venus')) businessScore += 3;
  if (mercuryPlacement === 7 || mercuryPlacement === 11) businessScore += 2;

  if (govtScore >= 3 && govtScore >= privateScore && govtScore >= businessScore) {
    return {
      type: 'Government',
      EN: "Your chart shows strong Sun and Jupiter influences in your career houses. You have an extremely high chance of securing a Government Job, an administrative authority position, or working in the public sector.",
      MR: "तुमच्या कुंडलीत कर्म स्थानावर सूर्य आणि गुरूचा प्रबळ प्रभाव आहे. तुम्हाला सरकारी नोकरी (Government Job), प्रशासकीय अधिकारी पद किंवा सार्वजनिक क्षेत्रात काम मिळण्याची दाट शक्यता आहे."
    };
  } else if (businessScore > privateScore && businessScore >= govtScore) {
    return {
      type: 'Business',
      EN: "Your chart shows strong Mercury and Venus influences. You have excellent entrepreneurial skills and are highly likely to succeed in your own Business, Trade, or independent consultancy rather than a traditional job.",
      MR: "तुमच्या कुंडलीत बुध आणि शुक्राचा प्रबळ प्रभाव आहे. तुमच्याकडे उत्तम व्यावसायिक कौशल्ये आहेत आणि पारंपारिक नोकरीऐवजी स्वतःचा व्यवसाय (Business) किंवा स्वतंत्र सल्लागार म्हणून तुम्हाला खूप यश मिळेल."
    };
  } else {
    return {
      type: 'Private',
      EN: "Your chart shows a strong Saturn and Mars influence, indicating a successful career in the Private/Corporate sector. You will rise to top management or specialized roles through hard work, technical skills, and persistence.",
      MR: "तुमच्या कुंडलीत शनी आणि मंगळाचा प्रभाव आहे, जे खाजगी किंवा कॉर्पोरेट (Private/Corporate) क्षेत्रात यशस्वी करिअर दर्शवते. कठोर परिश्रम आणि तांत्रिक कौशल्यांच्या जोरावर तुम्ही उच्च व्यवस्थापन पदावर पोहोचू शकता."
    };
  }
}

export function analyzeJobSwitches(chart: BirthChartResult): JobSwitchPrediction {
  const lord10 = chart.houses[10]?.signRuler;
  const lord10PlacementSign = chart.planets[lord10]?.sign;

  // Movable Signs: Aries, Cancer, Libra, Capricorn
  const movableSigns = ['Aries', 'Cancer', 'Libra', 'Capricorn'];
  // Fixed Signs: Taurus, Leo, Scorpio, Aquarius
  const fixedSigns = ['Taurus', 'Leo', 'Scorpio', 'Aquarius'];

  if (lord10PlacementSign && movableSigns.includes(lord10PlacementSign)) {
    return {
      frequency: 'High',
      EN: "The lord of your career house is placed in a 'Movable' sign. You are likely to have frequent job switches, career changes, or roles that require constant travel and dynamic environments.",
      MR: "तुमच्या कर्म स्थानाचा स्वामी 'चर' राशीत आहे. तुमच्या आयुष्यात वारंवार नोकरी बदलणे (Job Switches), करिअरमध्ये बदल होणे किंवा सतत प्रवास आणि नवीन आव्हाने असणाऱ्या नोकऱ्या मिळण्याची शक्यता आहे."
    };
  } else if (lord10PlacementSign && fixedSigns.includes(lord10PlacementSign)) {
    return {
      frequency: 'Low',
      EN: "The lord of your career house is placed in a 'Fixed' sign. You are likely to stick to one organization or field for a very long time. You prefer stability over frequent job hopping.",
      MR: "तुमच्या कर्म स्थानाचा स्वामी 'स्थिर' राशीत आहे. तुम्ही एकाच कंपनीत किंवा क्षेत्रात दीर्घकाळ काम करण्याची शक्यता जास्त आहे. तुम्हाला नोकरी बदलण्यापेक्षा स्थिरतेची जास्त आवड आहे."
    };
  } else {
    return {
      frequency: 'Moderate',
      EN: "The lord of your career house is placed in a 'Dual' sign. You will have a moderate number of job changes, usually shifting when you need to learn something new or upgrade your skills.",
      MR: "तुमच्या कर्म स्थानाचा स्वामी 'द्विस्वभाव' राशीत आहे. तुम्ही वेळेनुसार आणि नवीन कौशल्ये शिकण्यासाठी नोकरीत मध्यम स्वरूपाचे बदल (Job Switches) कराल."
    };
  }
}

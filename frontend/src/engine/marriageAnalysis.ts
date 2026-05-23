import type { BirthChartResult } from './chart';

export interface MarriagePrediction {
  type: 'Love' | 'Arranged' | 'Love-cum-Arranged';
  EN: string;
  MR: string;
}

export interface PartnerMeetPrediction {
  EN: string;
  MR: string;
}

export function analyzeMarriageType(chart: BirthChartResult): MarriagePrediction {
  // Logic to determine Love vs Arranged Marriage
  // 5th house = Romance, 7th house = Marriage
  const house5 = chart.houses[5];
  const house7 = chart.houses[7];
  
  const lord5 = house5.signRuler;
  const lord7 = house7.signRuler;

  // Find where Lord 5 and Lord 7 are placed
  const lord5Placement = chart.planets[lord5]?.house;
  const lord7Placement = chart.planets[lord7]?.house;

  let loveScore = 0;
  let arrangedScore = 0;

  // Rule 1: 5th Lord and 7th Lord are in the same house (Strong Love indicator)
  if (lord5Placement === lord7Placement) {
    loveScore += 2;
  }

  // Rule 2: 5th lord in 7th, or 7th lord in 5th
  if (lord5Placement === 7 || lord7Placement === 5) {
    loveScore += 2;
  }

  // Rule 3: Venus (Planet of Love) in 1st, 5th, 7th, or 11th
  const venusPlacement = chart.planets['Venus']?.house;
  if (venusPlacement !== undefined && [1, 5, 7, 11].includes(venusPlacement)) {
    loveScore += 1;
  }

  // Rule 4: Rahu (Unconventional) in 7th house indicates Love/Unconventional marriage
  if (chart.planets['Rahu']?.house === 7) {
    loveScore += 1;
  }

  // Rule 5: Jupiter (Tradition) in 7th or aspecting 7th leans towards Arranged
  const jupiterPlacement = chart.planets['Jupiter']?.house;
  if (jupiterPlacement !== undefined && [1, 3, 7, 11].includes(jupiterPlacement)) {
    arrangedScore += 1;
  }

  // Rule 6: No connection between 5th and 7th usually means Arranged
  if (loveScore === 0) {
    arrangedScore += 2;
  }

  if (loveScore > arrangedScore + 1) {
    return {
      type: 'Love',
      EN: "Astrologically, there is a very strong connection between your 5th house (Romance) and 7th house (Marriage), or strong influence of Venus/Rahu. This strongly indicates a Love Marriage. You are likely to choose your own partner.",
      MR: "ज्योतिषशास्त्रानुसार, तुमच्या ५ व्या (प्रेम) आणि ७ व्या (विवाह) घरात प्रबळ संबंध आहे किंवा शुक्र/राहूचा प्रभाव आहे. हे प्रबळ 'प्रेम विवाह' (Love Marriage) दर्शवते. तुम्ही तुमचा जोडीदार स्वतः निवडण्याची शक्यता जास्त आहे."
    };
  } else if (arrangedScore > loveScore) {
    return {
      type: 'Arranged',
      EN: "The traditional planets like Jupiter have a strong influence on your marriage house, with little connection to the house of romance. This indicates an Arranged Marriage through family connections or traditional matchmaking.",
      MR: "गुरू सारख्या पारंपारिक ग्रहांचा तुमच्या विवाह घरावर प्रबळ प्रभाव आहे, आणि प्रेमाच्या घराशी फारसा संबंध नाही. हे कुटुंब किंवा पारंपारिक पद्धतीने 'अरेंज मॅरेज' (Arranged Marriage) दर्शवते."
    };
  } else {
    return {
      type: 'Love-cum-Arranged',
      EN: "Your chart shows a mix of traditional and romantic influences. This indicates a 'Love-cum-Arranged' marriage—you may find someone on your own but marry with full family approval, or an arranged meeting may quickly turn into deep romance.",
      MR: "तुमच्या कुंडलीत पारंपारिक आणि प्रेमळ प्रभावांचे मिश्रण आहे. हे 'लव्ह-कम-अरेंज' विवाह दर्शवते—तुम्ही स्वतः जोडीदार शोधू शकता आणि कुटुंबाच्या संमतीने लग्न करू शकता किंवा ठरवून दिलेल्या भेटीचे लवकरच प्रेमात रूपांतर होऊ शकते."
    };
  }
}

export function analyzePartnerMeet(chart: BirthChartResult): PartnerMeetPrediction {
  const lord7 = chart.houses[7].signRuler;
  const placementHouse = chart.planets[lord7]?.house;

  switch (placementHouse) {
    case 1:
      return {
        EN: "Your 7th Lord is in the 1st House. You are likely to meet your partner through your own efforts, or they will come directly to you. It might be someone you already know or someone who approaches you first.",
        MR: "तुमचा ७ वा स्वामी पहिल्या घरात आहे. तुम्ही तुमच्या जोडीदाराला स्वतःच्या प्रयत्नांनी भेटण्याची शक्यता आहे किंवा ते स्वतः तुमच्याकडे येतील. ते तुमच्या ओळखीचे किंवा तुम्हाला आधी विचारणारे असू शकतात."
      };
    case 2:
      return {
        EN: "Your 7th Lord is in the 2nd House. You may meet your partner through family gatherings, traditional matchmaking, financial institutions, or even at a restaurant or food-related event.",
        MR: "तुमचा ७ वा स्वामी दुसऱ्या घरात आहे. तुम्ही तुमच्या जोडीदाराला कौटुंबिक समारंभात, पारंपारिक स्थळांद्वारे, बँकेत किंवा एखाद्या रेस्टॉरंटमध्ये भेटू शकता."
      };
    case 3:
      return {
        EN: "Your 7th Lord is in the 3rd House. You are likely to meet your partner through siblings, neighbors, during a short trip, or through online communication apps and social media.",
        MR: "तुमचा ७ वा स्वामी ३ ऱ्या घरात आहे. तुम्ही तुमच्या जोडीदाराला भावंड, शेजारी, छोट्या प्रवासात किंवा सोशल मीडिया आणि ऑनलाइन ॲप्सद्वारे भेटण्याची दाट शक्यता आहे."
      };
    case 4:
      return {
        EN: "Your 7th Lord is in the 4th House. You may meet your future spouse through your mother, real estate connections, or within your hometown or school network.",
        MR: "तुमचा ७ वा स्वामी ४ थ्या घरात आहे. तुम्हाला तुमचा जोडीदार तुमच्या आईच्या ओळखीने, मूळ गावी किंवा शालेय मित्रमंडळींमधून मिळू शकतो."
      };
    case 5:
      return {
        EN: "Your 7th Lord is in the 5th House. This is a classic placement for meeting at college, during a creative or entertainment event, at a party, or through a romantic connection that blossoms into marriage.",
        MR: "तुमचा ७ वा स्वामी ५ व्या घरात आहे. तुम्ही तुमच्या जोडीदाराला कॉलेजमध्ये, एखाद्या करमणुकीच्या कार्यक्रमात किंवा पार्टीत भेटू शकता. हे प्रेम विवाहाचेही लक्षण आहे."
      };
    case 6:
      return {
        EN: "Your 7th Lord is in the 6th House. You might meet your partner at a workplace, gym, hospital, or during a time when you are solving a conflict or competing.",
        MR: "तुमचा ७ वा स्वामी ६ व्या घरात आहे. तुम्ही तुमच्या जोडीदाराला कामाच्या ठिकाणी (ऑफिस), जिममध्ये, दवाखान्यात किंवा एखाद्या स्पर्धेच्या वेळी भेटू शकता."
      };
    case 7:
      return {
        EN: "Your 7th Lord is in the 7th House. You are likely to meet your partner through public events, direct business partnerships, or formal matchmaking. They will be a very prominent part of your life.",
        MR: "तुमचा ७ वा स्वामी ७ व्या घरात आहे. तुम्ही तुमच्या जोडीदाराला सार्वजनिक कार्यक्रमात, व्यावसायिक भागीदारीत किंवा अधिकृत स्थळ पाहण्याच्या कार्यक्रमात भेटू शकता."
      };
    case 8:
      return {
        EN: "Your 7th Lord is in the 8th House. You may meet your partner in sudden, unexpected circumstances, at a secret gathering, or through research and occult studies.",
        MR: "तुमचा ७ वा स्वामी ८ व्या घरात आहे. तुमची जोडीदारासोबतची भेट अचानक आणि अनपेक्षितपणे होऊ शकते. संशोधन किंवा गूढ शास्त्राच्या ठिकाणीही भेट होऊ शकते."
      };
    case 9:
      return {
        EN: "Your 7th Lord is in the 9th House. You are likely to meet your spouse during long-distance travel, at a university, a religious/spiritual place, or through a mentor or teacher.",
        MR: "तुमचा ७ वा स्वामी ९ व्या घरात आहे. तुम्हाला तुमचा जोडीदार लांबच्या प्रवासात, विद्यापीठात, धार्मिक ठिकाणी किंवा एखाद्या मार्गदर्शकाद्वारे भेटू शकतो."
      };
    case 10:
      return {
        EN: "Your 7th Lord is in the 10th House. You will likely meet your partner through your career, at a professional workplace, or they might be an authority figure or connected to the government.",
        MR: "तुमचा ७ वा स्वामी १० व्या घरात आहे. तुम्हाला तुमचा जोडीदार तुमच्या करिअरच्या ठिकाणी किंवा ऑफिसमध्ये भेटण्याची शक्यता आहे."
      };
    case 11:
      return {
        EN: "Your 7th Lord is in the 11th House. You are likely to meet your spouse through your elder siblings, friend circles, large network gatherings, or professional associations.",
        MR: "तुमचा ७ वा स्वामी ११ व्या घरात आहे. तुम्हाला तुमचा जोडीदार मोठ्या भावंडांद्वारे, मित्रमंडळींमधून किंवा एखाद्या मोठ्या संस्थेच्या कार्यक्रमात भेटू शकतो."
      };
    case 12:
      return {
        EN: "Your 7th Lord is in the 12th House. You may meet your partner in a foreign country, at an ashram or spiritual retreat, a hospital, or in an isolated, quiet place. Online long-distance connection is also possible.",
        MR: "तुमचा ७ वा स्वामी १२ व्या घरात आहे. तुम्ही तुमच्या जोडीदाराला परदेशात, आश्रमात, दवाखान्यात किंवा एखाद्या शांत, एकांत ठिकाणी भेटू शकता. परदेशी किंवा लांबच्या अंतरावरून ऑनलाइन भेटही शक्य आहे."
      };
    default:
      return {
        EN: "Your 7th Lord connects multiple areas. You could meet your partner through mutual friends or an arranged family meeting.",
        MR: "तुमच्या ७ व्या स्वामीचा प्रभाव संमिश्र आहे. तुम्ही तुमच्या जोडीदाराला मित्रांद्वारे किंवा कुटुंबाने ठरवलेल्या भेटीतून भेटू शकता."
      };
  }
}

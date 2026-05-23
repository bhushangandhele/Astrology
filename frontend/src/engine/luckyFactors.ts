import type { BirthChartResult } from './chart';

export interface LuckyFactors {
  luckyColors: { EN: string; MR: string };
  luckyNumbers: string;
  luckyStones: { EN: string; MR: string };
  remedy: { EN: string; MR: string };
}

export function getLuckyFactors(chart: BirthChartResult): LuckyFactors {
  const ascendantSign = chart.houses[1]?.signName; // 1st house is Ascendant
  
  switch (ascendantSign) {
    case 'Aries':
      return {
        luckyColors: { EN: 'Red, Coral', MR: 'लाल, प्रवाळ' },
        luckyNumbers: '9, 18, 27',
        luckyStones: { EN: 'Red Coral (Moonga)', MR: 'पोवळे (Moonga)' },
        remedy: { EN: 'Worship Lord Hanuman and recite Hanuman Chalisa regularly.', MR: 'दररोज हनुमान चालिसाचे पठण करा आणि मारुतीची पूजा करा.' }
      };
    case 'Taurus':
      return {
        luckyColors: { EN: 'White, Silver, Pink', MR: 'पांढरा, चंदेरी, गुलाबी' },
        luckyNumbers: '6, 15, 24',
        luckyStones: { EN: 'Diamond, Opal', MR: 'हिरा, ओपल' },
        remedy: { EN: 'Worship Goddess Durga or Lakshmi. Offer white sweets on Friday.', MR: 'देवी दुर्गा किंवा लक्ष्मीची पूजा करा. शुक्रवारी पांढऱ्या रंगाचा प्रसाद अर्पण करा.' }
      };
    case 'Gemini':
      return {
        luckyColors: { EN: 'Green, Light Green', MR: 'हिरवा, हलका हिरवा' },
        luckyNumbers: '5, 14, 23',
        luckyStones: { EN: 'Emerald (Panna)', MR: 'पाचू (Panna)' },
        remedy: { EN: 'Worship Lord Ganesha and offer Durva grass on Wednesday.', MR: 'बुधवारी गणपतीची पूजा करा आणि दुर्वा वाहा.' }
      };
    case 'Cancer':
      return {
        luckyColors: { EN: 'White, Pearl, Cream', MR: 'पांढरा, मोती, क्रिम' },
        luckyNumbers: '2, 11, 20',
        luckyStones: { EN: 'Pearl (Moti)', MR: 'मोती (Moti)' },
        remedy: { EN: 'Worship Lord Shiva. Offer water or milk to Shivling on Monday.', MR: 'सोमवारी महादेवाची पूजा करा आणि शिवलिंगावर जल किंवा दुधाचा अभिषेक करा.' }
      };
    case 'Leo':
      return {
        luckyColors: { EN: 'Orange, Gold, Ruby', MR: 'नारंगी, सोनेरी, लाल' },
        luckyNumbers: '1, 10, 19, 28',
        luckyStones: { EN: 'Ruby (Manik)', MR: 'माणिक (Manik)' },
        remedy: { EN: 'Offer water (Arghya) to Surya Dev in the morning and recite Aditya Hrudayam.', MR: 'रोज सकाळी सूर्यदेवाला अर्घ्य (पाणी) द्या आणि आदित्य हृदय स्तोत्राचे पठण करा.' }
      };
    case 'Virgo':
      return {
        luckyColors: { EN: 'Green, Emerald', MR: 'हिरवा, पाचू रंग' },
        luckyNumbers: '5, 14, 23',
        luckyStones: { EN: 'Emerald (Panna)', MR: 'पाचू (Panna)' },
        remedy: { EN: 'Worship Lord Ganesha and recite Vishnu Sahasranama.', MR: 'गणपतीची पूजा करा आणि विष्णू सहस्रनामाचे वाचन करा.' }
      };
    case 'Libra':
      return {
        luckyColors: { EN: 'White, Light Blue', MR: 'पांढरा, हलका निळा' },
        luckyNumbers: '6, 15, 24',
        luckyStones: { EN: 'Diamond, White Sapphire', MR: 'हिरा, पांढरा पुष्कराज' },
        remedy: { EN: 'Worship Goddess Lakshmi and respect women.', MR: 'लक्ष्मी देवीची पूजा करा आणि स्त्रियांचा सन्मान करा.' }
      };
    case 'Scorpio':
      return {
        luckyColors: { EN: 'Red, Maroon', MR: 'लाल, मरून' },
        luckyNumbers: '9, 18, 27',
        luckyStones: { EN: 'Red Coral (Moonga)', MR: 'पोवळे (Moonga)' },
        remedy: { EN: 'Worship Lord Hanuman and recite Bajrang Baan.', MR: 'हनुमानाची पूजा करा आणि बजरंग बाणाचे पठण करा.' }
      };
    case 'Sagittarius':
      return {
        luckyColors: { EN: 'Yellow, Gold', MR: 'पिवळा, सोनेरी' },
        luckyNumbers: '3, 12, 21, 30',
        luckyStones: { EN: 'Yellow Sapphire (Pukhraj)', MR: 'पिवळा पुष्कराज (Pukhraj)' },
        remedy: { EN: 'Worship Lord Vishnu and offer yellow sweets on Thursday. Respect elders.', MR: 'गुरुवारी भगवान विष्णूची पूजा करा, पिवळा प्रसाद अर्पण करा आणि ज्येष्ठांचा आदर करा.' }
      };
    case 'Capricorn':
      return {
        luckyColors: { EN: 'Black, Navy Blue', MR: 'काळा, गडद निळा' },
        luckyNumbers: '8, 17, 26',
        luckyStones: { EN: 'Blue Sapphire (Neelam)', MR: 'नीलम (Neelam)' },
        remedy: { EN: 'Worship Lord Shani. Light a mustard oil lamp under a Peepal tree on Saturday.', MR: 'शनिदेवाची पूजा करा. शनिवारी पिंपळाच्या झाडाखाली मोहरीच्या तेलाचा दिवा लावा.' }
      };
    case 'Aquarius':
      return {
        luckyColors: { EN: 'Black, Blue, Purple', MR: 'काळा, निळा, जांभळा' },
        luckyNumbers: '8, 17, 26',
        luckyStones: { EN: 'Blue Sapphire (Neelam)', MR: 'नीलम (Neelam)' },
        remedy: { EN: 'Worship Lord Shiva and Shani. Feed the poor and disabled.', MR: 'महादेव आणि शनिदेवाची पूजा करा. गरीब आणि गरजू लोकांना मदत करा.' }
      };
    case 'Pisces':
      return {
        luckyColors: { EN: 'Yellow, Sea Green', MR: 'पिवळा, हलका समुद्री हिरवा' },
        luckyNumbers: '3, 12, 21',
        luckyStones: { EN: 'Yellow Sapphire (Pukhraj)', MR: 'पिवळा पुष्कराज (Pukhraj)' },
        remedy: { EN: 'Worship Lord Vishnu and donate yellow items (like dal or clothes) on Thursday.', MR: 'भगवान विष्णूची पूजा करा आणि गुरुवारी पिवळ्या वस्तूंचे (डाळ, कपडे) दान करा.' }
      };
    default:
      return {
        luckyColors: { EN: 'White, Light Colors', MR: 'पांढरा, हलके रंग' },
        luckyNumbers: '1, 7',
        luckyStones: { EN: 'Consult an Astrologer', MR: 'ज्योतिषाचा सल्ला घ्या' },
        remedy: { EN: 'Pray daily and do good deeds.', MR: 'दररोज प्रार्थना करा आणि सत्कर्म करा.' }
      };
  }
}

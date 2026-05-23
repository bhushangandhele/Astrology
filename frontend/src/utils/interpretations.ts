// Planet-in-House interpretations for career, love, and general life
export const PLANET_IN_HOUSE: Record<string, Record<number, { career: string; love: string; general: string }>> = {
  Sun: {
    1: { career: 'Natural leader. Excels in government, management, administration.', love: 'Dominant partner. Strong personality attracts attention but needs ego balance.', general: 'Confident, healthy, and self-driven life path.' },
    2: { career: 'Success in banking, finance, family business, and public speaking.', love: 'Family-oriented. Values loyalty and security in relationships.', general: 'Strong family pride and financial acumen.' },
    3: { career: 'Excellent writer, journalist, or communicator. Courageous self-starters.', love: 'Active in expressing feelings. Sibling relationships can affect romance.', general: 'Bold, initiative-driven personality.' },
    4: { career: 'Real estate, education, or psychology. Success grows later in life.', love: 'Home-loving. Nurturing partner who prioritizes family comfort.', general: 'Strong maternal/home connection.' },
    5: { career: 'Creative fields, teaching, stock markets, or politics.', love: 'Romantic and passionate. Strong desire for children and romance.', general: 'Intelligent and creative with strong intuition.' },
    6: { career: 'Medicine, law, military, or service industries. Defeats enemies.', love: 'Reserved in love. Health matters can affect relationships.', general: 'Hard worker who overcomes obstacles through perseverance.' },
    7: { career: 'Business partnerships, law, diplomacy, or public relations.', love: 'Attracts a strong, accomplished spouse. Marriage is important.', general: 'Identity linked to relationships and partnerships.' },
    8: { career: 'Research, occult, insurance, mining, or detective work.', love: 'Deep, intense bonds. Transformative relationships.', general: 'Life involves secrets, sudden changes, and deep transformation.' },
    9: { career: 'Law, philosophy, academia, publishing, or spirituality.', love: 'Seeks wise, cultured partner. Marriage may be to someone from a different background.', general: 'Blessed with good fortune and strong values.' },
    10: { career: 'Peak position — CEOs, politicians, government officers. Massive career success.', love: 'Career-focused. Spouse may also be accomplished.', general: 'Fame and authority are natural outcomes.' },
    11: { career: 'Profits from large organizations, social networks, elder siblings.', love: 'Many admirers. Gains through influential friends.', general: 'Wishes fulfilled through networking.' },
    12: { career: 'Foreign service, hospitals, spirituality, meditation retreats.', love: 'Secretive love life. Possible foreign spouse or long-distance relationship.', general: 'Spiritual liberation and behind-the-scenes success.' }
  },
  Moon: {
    1: { career: 'Public-facing roles, hospitality, nursing, social work.', love: 'Emotional and nurturing. Very caring partner.', general: 'Moody but compassionate personality.' },
    2: { career: 'Finance, food industry, or caretaking roles.', love: 'Strong family bond. Emotionally attached to family.', general: 'Wealth fluctuates but family is strong.' },
    3: { career: 'Writing, media, communications, short travel business.', love: 'Expressive in love. Strong sibling connections.', general: 'Curious, communicative, restless mind.' },
    4: { career: 'Real estate, hospitality, farming, or education at home.', love: 'Deep love of home. Devoted spouse and parent.', general: 'Emotionally connected to roots and homeland.' },
    5: { career: 'Teaching, creativity, arts, childcare, entertainment.', love: 'Romantic and playful. Deeply attached to children.', general: 'Creative and intuitive mind.' },
    6: { career: 'Healthcare, nutrition, service industry, veterinary work.', love: 'Anxious in relationships. Needs reassurance.', general: 'Dedicated to service. Health needs attention.' },
    7: { career: 'Business partnerships, counseling, public relations.', love: 'Marriage is emotionally central. Very devoted spouse.', general: 'Relationship-focused life.' },
    8: { career: 'Psychology, research, occult, insurance.', love: 'Intensely emotional relationships. Past-life connections.', general: 'Deep emotional transformation through life.' },
    9: { career: 'Travel, academia, spiritual teaching, publishing.', love: 'Philosophical partner preferred. Spiritual compatibility matters.', general: 'Fortune from higher learning and travel.' },
    10: { career: 'Politics, public service, hospitality industry, nursing leadership.', love: 'Work may delay marriage. Spouse supports career.', general: 'Gains public fame and respect.' },
    11: { career: 'Gains through groups, friends, large organizations.', love: 'Active social life. Many admirers and good friendships.', general: 'Desires fulfilled through community.' },
    12: { career: 'Hospitals, retreats, foreign countries, spiritual work.', love: 'Hidden or secretive romantic life. Imagination-driven.', general: 'Inner spiritual life is very rich.' }
  },
  Mars: {
    1: { career: 'Military, police, sports, engineering, surgery.', love: 'Passionate and assertive in love. Strong physical attraction.', general: 'Energetic and competitive personality.' },
    2: { career: 'Real estate, construction, banking.', love: 'Outspoken in relationships. Financial disagreements possible.', general: 'Works hard for wealth.' },
    3: { career: 'Sports writing, marketing, military communications.', love: 'Bold in expressing love. Short-tempered at times.', general: 'Courageous, pioneering nature.' },
    4: { career: 'Real estate, construction, property development.', love: 'Protective of family. Home conflicts possible.', general: 'Driven to build a strong home foundation.' },
    5: { career: 'Sports, entertainment, stock trading, military leadership.', love: 'Passionate romances. May have fewer children.', general: 'High energy and competitive spirit.' },
    6: { career: 'Military, surgery, athletics. Defeats all enemies.', love: 'Arguments in relationships. Needs patient partner.', general: 'Strong, resilient fighter who always wins.' },
    7: { career: 'Business partnerships, law, competitive fields.', love: 'May delay marriage. Spouse is energetic and independent.', general: 'Partner-driven success.' },
    8: { career: 'Surgery, occult research, investigation, mining.', love: 'Intense, transformative relationships. Deep passion.', general: 'Powerful life transformations.' },
    9: { career: 'Military command, law, adventure travel, sports.', love: 'Drawn to bold, adventurous partners.', general: 'Action-oriented spiritual seeker.' },
    10: { career: 'Military officer, engineer, surgeon, CEO. Peak career Mars.', love: 'Career takes priority. Strong authoritative spouse.', general: 'Ambitious and achievement-oriented.' },
    11: { career: 'Gains from real estate, technology, group leadership.', love: 'Influential friends. Energetic social circle.', general: 'Fulfills ambitions through determined effort.' },
    12: { career: 'Military abroad, foreign engineering, hospital work.', love: 'Hidden passions. May have secret relationships.', general: 'Energy channeled into spiritual or hidden work.' }
  },
  Mercury: {
    1: { career: 'Writing, IT, accounting, analysis, journalism.', love: 'Witty and communicative partner. Loves intellectual connection.', general: 'Sharp-minded and youthful all life.' },
    4: { career: 'Education, counseling, real estate consulting.', love: 'Communicative family environment. Good domestic harmony.', general: 'Intelligent, educated family background.' },
    5: { career: 'Teaching, writing, programming, stock analysis.', love: 'Flirtatious and playful. Multiple romances possible.', general: 'Creative intelligence and excellent memory.' },
    7: { career: 'Business trade, law, writing, public relations.', love: 'Marries an educated, witty, communicative partner.', general: 'Partnerships built on intellectual compatibility.' },
    10: { career: 'Commerce, media, IT, law, business administration.', love: 'Professional reputation attracts smart partner.', general: 'Success through intelligence and communication.' },
  },
  Jupiter: {
    1: { career: 'Teaching, law, finance, spirituality, medicine.', love: 'Generous and wise partner. Marriage is blessed.', general: 'Fortunate, wise, and respected throughout life.' },
    4: { career: 'Education, counseling, real estate.', love: 'Happy family life. Devoted to home and children.', general: 'Comfortable and spiritually rich home life.' },
    5: { career: 'Academia, spiritual teaching, investment advisory.', love: 'Children bring great fortune. Loving, devoted relationships.', general: 'Past-life merits result in good fortune.' },
    7: { career: 'Law, business partnerships, consulting.', love: 'Excellent marriage partner — wise, generous, spiritual.', general: 'Marriage is a cornerstone of happiness.' },
    9: { career: 'Law, publishing, higher education, spiritual leadership.', love: 'Marriage to wise, cultured partner. Foreign connections.', general: 'Extremely fortunate with strong dharma.' },
    10: { career: 'Judges, professors, finance ministers. Very high status.', love: 'Respected and admired. Spouse is well-accomplished.', general: 'Carries great social responsibility with grace.' },
    11: { career: 'Massive gains through networks, investments, and consulting.', love: 'Influential circle of friends. Children are successful.', general: 'Desires and ambitions fully fulfilled.' },
  },
  Venus: {
    1: { career: 'Arts, beauty, entertainment, fashion, design.', love: 'Very attractive and charming. Early love life is active.', general: 'Beautiful personality, comfort-loving nature.' },
    2: { career: 'Luxury goods, banking, music, acting, jewelry.', love: 'Loving and affectionate family. Beautiful speech.', general: 'Comfortable and wealthy life.' },
    5: { career: 'Arts, entertainment, music, film.', love: 'Strong romantic nature. Many love affairs possible.', general: 'Highly creative and artistically gifted.' },
    7: { career: 'Fashion, entertainment, partnerships in business.', love: 'Beautiful, loving, artistic spouse. Happy marriage.', general: 'Life enriched by love and partnership.' },
    9: { career: 'Arts, travel, spiritual aesthetics, publishing.', love: 'Romantic travel. May marry someone from a different culture.', general: 'Fortune through beauty and culture.' },
    10: { career: 'Entertainment industry, arts administration, luxury brands.', love: 'Career brings social glamour and admiration.', general: 'Success through charm and talent.' },
    11: { career: 'Gains through arts, beauty, entertainment, or luxury products.', love: 'Rich social life. Admired by many friends.', general: 'Fulfills dreams through beauty and creativity.' },
  },
  Saturn: {
    1: { career: 'Disciplined fields — engineering, research, law, labor management.', love: 'Delayed marriage. Serious, responsible partner.', general: 'Life improves steadily with age and discipline.' },
    3: { career: 'Technical writing, hard physical work, systematic communication.', love: 'Reserved in expressing love. Serious relationships.', general: 'Achieves through persistent effort.' },
    7: { career: 'Law, business management, government contracting.', love: 'Late marriage. Spouse is older or very mature.', general: 'Partnerships require patience to flourish.' },
    10: { career: 'Engineering, law, government, administration. Steady rise to top.', love: 'Career first. Responsible and reliable spouse.', general: 'Peak success comes after age 35.' },
    11: { career: 'Steady, consistent income. Long-term financial gains.', love: 'Serious, long-term friendships and social bonds.', general: 'Slow but guaranteed fulfillment of goals.' },
  },
  Rahu: {
    1: { career: 'Unconventional careers — technology, politics, foreign companies.', love: 'Unusual or cross-cultural romantic attractions.', general: 'Larger-than-life ambitions and magnetic personality.' },
    5: { career: 'Media, technology, speculation, creative industries.', love: 'Intense, unconventional romances. Adoptive children possible.', general: 'Karmic creative gifts from past lives.' },
    7: { career: 'Foreign business partnerships, international trade.', love: 'Foreign or unconventional spouse. Non-traditional marriage.', general: 'Transformative partnerships define the life path.' },
    10: { career: 'Politics, technology, media, international organizations. Sudden rise.', love: 'Career-focused. Spouse supports unconventional path.', general: 'Rapid rise in career through unusual means.' },
    11: { career: 'Massive gains through technology, networks, foreign connections.', love: 'Large, diverse social networks. Unusual friendships.', general: 'Unconventional route to fulfilling desires.' },
  },
  Ketu: {
    1: { career: 'Spiritual leadership, research, healing arts.', love: 'Detached in love. Karmic relationships from past lives.', general: 'Past-life wisdom and spiritual gifts are prominent.' },
    5: { career: 'Spiritual teaching, research, occult sciences.', love: 'Karmic romances. Children may come through non-traditional means.', general: 'Deep spiritual intelligence and creativity.' },
    7: { career: 'Counseling, spiritual healing, research partnerships.', love: 'Karmic spouse connection. Detached or spiritual partner.', general: 'Relationship brings spiritual growth, not just worldly joy.' },
    9: { career: 'Spiritual teaching, astrology, philosophy, meditation.', love: 'Drawn to spiritual or philosophical partner.', general: 'Past-life spiritual merit gives wisdom and intuition.' },
    12: { career: 'Monasteries, foreign spiritual work, meditation centers.', love: 'Detached from worldly pleasures. Seeks spiritual union.', general: 'Liberation (Moksha) is the life goal.' },
  }
};

// Career prediction based on 10th house sign
export const CAREER_BY_10TH_SIGN: Record<string, { title: string; textEN: string; textMR: string; fieldsEN: string[]; fieldsMR: string[] }> = {
  Aries: { 
    title: 'Aries in 10th House', 
    textEN: 'Dynamic, pioneering career path. You rise quickly through bold decisions and leadership.', 
    textMR: 'डायनॅमिक आणि पुढाकार घेणारे करिअर. तुम्ही धाडसी निर्णय आणि नेतृत्वाद्वारे वेगाने प्रगती कराल.',
    fieldsEN: ['Military', 'Sports', 'Entrepreneurship', 'Surgery', 'Engineering'],
    fieldsMR: ['लष्कर', 'क्रीडा', 'उद्योग', 'सर्जरी', 'अभियांत्रिकी'] 
  },
  Taurus: { 
    title: 'Taurus in 10th House', 
    textEN: 'Steady, wealth-building career. You thrive in stable, material industries with long-term growth.', 
    textMR: 'स्थिर आणि संपत्ती निर्माण करणारे करिअर. दीर्घकालीन वाढीसह तुम्ही स्थिर उद्योगांमध्ये यशस्वी व्हाल.',
    fieldsEN: ['Banking', 'Agriculture', 'Luxury Goods', 'Music', 'Real Estate'],
    fieldsMR: ['बँकिंग', 'कृषी', 'लक्झरी वस्तू', 'संगीत', 'रिअल इस्टेट'] 
  },
  Gemini: { 
    title: 'Gemini in 10th House', 
    textEN: 'Communications and intellect define your career. Versatility is your greatest asset.', 
    textMR: 'संवाद आणि बुद्धिमत्ता तुमचे करिअर ठरवतात. बहुमुखी प्रतिभा ही तुमची सर्वात मोठी संपत्ती आहे.',
    fieldsEN: ['Journalism', 'IT', 'Marketing', 'Law', 'Teaching'],
    fieldsMR: ['पत्रकारिता', 'आयटी (IT)', 'मार्केटिंग', 'कायदा', 'शिक्षण'] 
  },
  Cancer: { 
    title: 'Cancer in 10th House', 
    textEN: 'Public-facing and nurturing career. Emotional intelligence drives your professional success.', 
    textMR: 'लोकांशी संवाद साधणारे आणि काळजी घेणारे करिअर. भावनिक बुद्धिमत्ता तुमच्या व्यावसायिक यशास चालना देते.',
    fieldsEN: ['Politics', 'Hospitality', 'Nursing', 'Catering', 'Social Work'],
    fieldsMR: ['राजकारण', 'हॉस्पिटॅलिटी', 'नर्सिंग', 'खानपान सेवा', 'समाजसेवा'] 
  },
  Leo: { 
    title: 'Leo in 10th House', 
    textEN: 'Born to be in the spotlight. Leadership, authority, and recognition follow you in career.', 
    textMR: 'स्पॉटलाइटमध्ये राहण्यासाठी जन्म. करिअरमध्ये नेतृत्व, अधिकार आणि ओळख तुम्हाला नक्कीच मिळेल.',
    fieldsEN: ['Politics', 'Acting', 'Management', 'Government', 'Administration'],
    fieldsMR: ['राजकारण', 'अभिनय', 'व्यवस्थापन', 'सरकारी सेवा', 'प्रशासन'] 
  },
  Virgo: { 
    title: 'Virgo in 10th House', 
    textEN: 'Detail-oriented professional excellence. You succeed through precision, analysis, and service.', 
    textMR: 'तपशीलवार व्यावसायिक उत्कृष्टता. अचूकता, विश्लेषण आणि सेवेतून तुम्हाला यश मिळते.',
    fieldsEN: ['Medicine', 'Accounting', 'Research', 'Data Analysis', 'Editing'],
    fieldsMR: ['वैद्यकशास्त्र', 'अकाउंटिंग', 'संशोधन', 'डेटा ॲनालिसिस', 'संपादन'] 
  },
  Libra: { 
    title: 'Libra in 10th House', 
    textEN: 'Diplomacy and aesthetics drive your career. You excel where balance and beauty are valued.', 
    textMR: 'मुत्सद्देगिरी आणि सौंदर्यशास्त्र तुमचे करिअर चालवतात. जिथे समतोल आणि सौंदर्य महत्त्वाचे आहे तिथे तुम्ही सर्वोत्तम आहात.',
    fieldsEN: ['Law', 'Fashion', 'Diplomacy', 'HR', 'Interior Design'],
    fieldsMR: ['कायदा', 'फॅशन', 'मुत्सद्देगिरी', 'मानव संसाधन (HR)', 'इंटेरियर डिझाईन'] 
  },
  Scorpio: { 
    title: 'Scorpio in 10th House', 
    textEN: 'Intense, investigative career. You thrive in high-stakes, transformative fields.', 
    textMR: 'तीव्र, संशोधनात्मक करिअर. अत्यंत जोखीम असलेल्या आणि परिवर्तनात्मक क्षेत्रांमध्ये तुम्ही यशस्वी होता.',
    fieldsEN: ['Investigation', 'Psychology', 'Research', 'Finance', 'Occult Sciences'],
    fieldsMR: ['गुन्हे अन्वेषण', 'मानसशास्त्र', 'संशोधन', 'वित्त', 'गूढ विज्ञान'] 
  },
  Sagittarius: { 
    title: 'Sagittarius in 10th House', 
    textEN: 'Philosophy, expansion, and wisdom define your professional calling.', 
    textMR: 'तत्त्वज्ञान, विस्तार आणि शहाणपण तुमची व्यावसायिक वाटचाल ठरवतात.',
    fieldsEN: ['Teaching', 'Law', 'Publishing', 'Foreign Relations', 'Adventure'],
    fieldsMR: ['शिक्षण', 'कायदा', 'प्रकाशन', 'परराष्ट्र संबंध', 'साहस'] 
  },
  Capricorn: { 
    title: 'Capricorn in 10th House', 
    textEN: 'Capricorn rules the 10th house — career is your life purpose. Steady climb to the very top.', 
    textMR: 'मकर राशीचे १० व्या घरावर राज्य आहे — करिअर हे तुमच्या आयुष्याचे ध्येय आहे. शिखरावर स्थिर चढाई.',
    fieldsEN: ['Administration', 'Engineering', 'Government', 'Business Management', 'Architecture'],
    fieldsMR: ['प्रशासन', 'अभियांत्रिकी', 'सरकारी सेवा', 'व्यवसाय व्यवस्थापन', 'वास्तुकला'] 
  },
  Aquarius: { 
    title: 'Aquarius in 10th House', 
    textEN: 'Innovative and humanitarian career. You pioneer change in your professional field.', 
    textMR: 'नाविन्यपूर्ण आणि मानवतावादी करिअर. तुम्ही तुमच्या व्यावसायिक क्षेत्रात बदलांचे प्रणेते आहात.',
    fieldsEN: ['Technology', 'Science', 'Social Work', 'Aviation', 'Activism'],
    fieldsMR: ['तंत्रज्ञान', 'विज्ञान', 'समाजसेवा', 'एव्हिएशन', 'सामाजिक चळवळ'] 
  },
  Pisces: { 
    title: 'Pisces in 10th House', 
    textEN: 'Spiritual, artistic, and compassionate career. Success comes through intuition and service.', 
    textMR: 'आध्यात्मिक, कलात्मक आणि दयाळू करिअर. अंतर्ज्ञान आणि सेवेतून यश मिळते.',
    fieldsEN: ['Medicine', 'Spiritual Counseling', 'Arts', 'Film', 'Charity'],
    fieldsMR: ['वैद्यकशास्त्र', 'आध्यात्मिक समुपदेशन', 'कला', 'चित्रपट', 'धर्मादाय काम'] 
  }
};

// Marriage / Love prediction based on 7th house sign
export const LOVE_BY_7TH_SIGN: Record<string, { title: string; textEN: string; textMR: string; spouseTraitsEN: string; spouseTraitsMR: string; timingEN: string; timingMR: string }> = {
  Aries: { 
    title: 'Aries in 7th House', 
    textEN: 'Your spouse is energetic, bold, and independent. Marriage brings passion and drive into your life.', 
    textMR: 'तुमचा जोडीदार उत्साही, धाडसी आणि स्वतंत्र आहे. विवाह तुमच्या आयुष्यात आवड आणि उत्साह आणतो.',
    spouseTraitsEN: 'Athletic, assertive, passionate, independent', 
    spouseTraitsMR: 'खेळाडूवृत्ती, ठाम, उत्कट, स्वतंत्र',
    timingEN: 'Marriage tends to happen in mid-20s. Sometimes impulsive decisions.',
    timingMR: 'लग्न साधारणपणे विशीच्या मध्यावर होते. कधीकधी घाईत निर्णय घेतले जातात.'
  },
  Taurus: { 
    title: 'Taurus in 7th House', 
    textEN: 'Your spouse is stable, sensual, and financially responsible. Marriage brings comfort and security.', 
    textMR: 'तुमचा जोडीदार स्थिर, कामुक आणि आर्थिकदृष्ट्या जबाबदार आहे. विवाह सुख आणि सुरक्षितता आणतो.',
    spouseTraitsEN: 'Beautiful, artistic, loyal, wealthy-minded', 
    spouseTraitsMR: 'सुंदर, कलात्मक, एकनिष्ठ, श्रीमंत विचारांचा',
    timingEN: 'Marriage after solid financial foundation. Usually stable and long-lasting.',
    timingMR: 'आर्थिक स्थिरता आल्यानंतर विवाह. सहसा स्थिर आणि दीर्घकाळ टिकणारा असतो.'
  },
  Gemini: { 
    title: 'Gemini in 7th House', 
    textEN: 'Your spouse is witty, communicative, and intellectually stimulating. Marriage thrives on good conversation.', 
    textMR: 'तुमचा जोडीदार चतुर, संवाद साधणारा आणि बौद्धिकदृष्ट्या उत्तेजक आहे. चांगल्या संवादावर विवाह बहरतो.',
    spouseTraitsEN: 'Intelligent, youthful, talkative, versatile', 
    spouseTraitsMR: 'हुशार, तरुण वृत्तीचा, बोलका, बहुमुखी',
    timingEN: 'Multiple romantic connections before settling. Marriage in late 20s.',
    timingMR: 'स्थिरावण्यापूर्वी अनेक रोमँटिक संबंध. विशीच्या शेवटी विवाह.'
  },
  Cancer: { 
    title: 'Cancer in 7th House', 
    textEN: 'Your spouse is nurturing, family-oriented, and emotionally sensitive. A deeply caring marriage.', 
    textMR: 'तुमचा जोडीदार काळजी घेणारा, कुटुंब-केंद्रित आणि भावनिकदृष्ट्या संवेदनशील आहे. अत्यंत प्रेमळ विवाह.',
    spouseTraitsEN: 'Caring, home-loving, protective, emotional', 
    spouseTraitsMR: 'काळजी घेणारा, घरगुती, संरक्षणात्मक, भावनिक',
    timingEN: 'Early emotional attachments. Marriage when family stability is achieved.',
    timingMR: 'लवकर भावनिक जोड. कौटुंबिक स्थिरता आल्यावर विवाह.'
  },
  Leo: { 
    title: 'Leo in 7th House', 
    textEN: 'Your spouse is charismatic, generous, and confident. Marriage has a royal quality to it.', 
    textMR: 'तुमचा जोडीदार करिष्माई, उदार आणि आत्मविश्वासी आहे. विवाहात एक राजेशाही दर्जा असतो.',
    spouseTraitsEN: 'Charming, generous, proud, leadership-oriented', 
    spouseTraitsMR: 'मोहक, उदार, अभिमानी, नेतृत्व-केंद्रित',
    timingEN: 'Attracts prestigious partners. Marriage is a social event. Usually mid-20s to 30s.',
    timingMR: 'प्रतिष्ठित जोडीदार आकर्षित होतात. विवाह एक मोठा सामाजिक कार्यक्रम असतो. सहसा २५ ते ३० च्या दरम्यान.'
  },
  Virgo: { 
    title: 'Virgo in 7th House', 
    textEN: 'Your spouse is analytical, health-conscious, and practical. Marriage is built on shared routines.', 
    textMR: 'तुमचा जोडीदार विश्लेषक, आरोग्याविषयी जागरूक आणि व्यावहारिक आहे. विवाह सामायिक दिनचर्येवर आधारित असतो.',
    spouseTraitsEN: 'Intelligent, service-minded, health-conscious, critical', 
    spouseTraitsMR: 'हुशार, सेवाभावी, आरोग्याविषयी जागरूक, टीकाकार',
    timingEN: 'Delayed marriage is possible. Spouse met through work or daily life.',
    timingMR: 'विवाहास उशीर होण्याची शक्यता आहे. जोडीदार कामाच्या ठिकाणी किंवा दैनंदिन जीवनात भेटतो.'
  },
  Libra: { 
    title: 'Libra in 7th House', 
    textEN: 'Venus rules your 7th house — this is the best placement for marriage. Harmonious, beautiful partnership.', 
    textMR: 'शुक्र तुमच्या ७ व्या घरावर राज्य करतो — विवाहासाठी ही सर्वोत्तम स्थिती आहे. सामंजस्यपूर्ण आणि सुंदर भागीदारी.',
    spouseTraitsEN: 'Beautiful, artistic, balanced, social, charming', 
    spouseTraitsMR: 'सुंदर, कलात्मक, संतुलित, सामाजिक, मोहक',
    timingEN: 'Strong natural desire for marriage. Usually marries at appropriate age.',
    timingMR: 'विवाहाची तीव्र नैसर्गिक इच्छा असते. सहसा योग्य वयात लग्न होते.'
  },
  Scorpio: { 
    title: 'Scorpio in 7th House', 
    textEN: 'Intense, transformative marriage. Deep karmic bond with spouse. Powerful partnership.', 
    textMR: 'तीव्र आणि परिवर्तनात्मक विवाह. जोडीदाराशी खोल कार्मिक संबंध. शक्तिशाली भागीदारी.',
    spouseTraitsEN: 'Magnetic, intense, secretive, deeply loyal once committed', 
    spouseTraitsMR: 'आकर्षक, तीव्र, गुप्तता पाळणारा, वचनबद्ध झाल्यावर अत्यंत एकनिष्ठ',
    timingEN: 'Transformative relationship before marriage. May marry later after deep karmic experience.',
    timingMR: 'विवाहापूर्वी परिवर्तनात्मक संबंध. खोल कार्मिक अनुभवानंतर उशिरा विवाह होऊ शकतो.'
  },
  Sagittarius: { 
    title: 'Sagittarius in 7th House', 
    textEN: 'Your spouse is philosophical, adventurous, and optimistic. Marriage brings freedom and wisdom.', 
    textMR: 'तुमचा जोडीदार तात्विक, साहसी आणि आशावादी आहे. विवाह स्वातंत्र्य आणि शहाणपण आणतो.',
    spouseTraitsEN: 'Educated, adventurous, spiritual, broad-minded', 
    spouseTraitsMR: 'सुशिक्षित, साहसी, आध्यात्मिक, व्यापक विचारांचा',
    timingEN: 'May marry a foreigner or someone from a different background. Usually mid to late 20s.',
    timingMR: 'परदेशी किंवा वेगळ्या पार्श्वभूमीच्या व्यक्तीशी विवाह होऊ शकतो. सहसा विशीच्या मध्यावर किंवा शेवटी.'
  },
  Capricorn: { 
    title: 'Capricorn in 7th House', 
    textEN: 'Marriage is treated seriously and practically. Spouse is mature, responsible, and career-oriented.', 
    textMR: 'विवाहाकडे गांभीर्याने आणि व्यावहारिकतेने पाहिले जाते. जोडीदार प्रौढ, जबाबदार आणि करिअरवर लक्ष केंद्रित करणारा असतो.',
    spouseTraitsEN: 'Disciplined, ambitious, older, professional', 
    spouseTraitsMR: 'शिस्तबद्ध, महत्त्वाकांक्षी, वयाने मोठा, व्यावसायिक',
    timingEN: 'Delayed marriage is very common. Long and stable once committed.',
    timingMR: 'विवाहास उशीर होणे सामान्य आहे. वचनबद्ध झाल्यावर विवाह दीर्घ आणि स्थिर असतो.'
  },
  Aquarius: { 
    title: 'Aquarius in 7th House', 
    textEN: 'Unconventional marriage. Spouse is unique, intellectual, and humanitarian-minded.', 
    textMR: 'अपरंपरागत विवाह. जोडीदार अद्वितीय, बुद्धिमान आणि मानवतावादी विचारांचा आहे.',
    spouseTraitsEN: 'Unique, intellectual, independent, socially conscious', 
    spouseTraitsMR: 'अद्वितीय, बुद्धिमान, स्वतंत्र, सामाजिक जाणीव असलेला',
    timingEN: 'Unusual or unexpected meeting with spouse. Non-traditional relationship style.',
    timingMR: 'जोडीदाराशी असामान्य किंवा अनपेक्षित भेट. पारंपारिक नसलेली संबंध शैली.'
  },
  Pisces: { 
    title: 'Pisces in 7th House', 
    textEN: 'Deeply spiritual and compassionate marriage. A karmic, soulmate-type connection.', 
    textMR: 'अत्यंत आध्यात्मिक आणि दयाळू विवाह. कार्मिक, सोलमेट-प्रकारचा संबंध.',
    spouseTraitsEN: 'Compassionate, artistic, spiritual, dreamy, intuitive', 
    spouseTraitsMR: 'दयाळू, कलात्मक, आध्यात्मिक, स्वप्नाळू, अंतर्ज्ञानी',
    timingEN: 'Idealistic about love. May have multiple spiritual connections before marriage.',
    timingMR: 'प्रेमाबद्दल आदर्शवादी. विवाहापूर्वी अनेक आध्यात्मिक संबंध असू शकतात.'
  }
};

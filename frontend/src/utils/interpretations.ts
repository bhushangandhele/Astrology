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
export const CAREER_BY_10TH_SIGN: Record<string, { title: string; text: string; fields: string[] }> = {
  Aries:       { title: 'Aries in 10th House', text: 'Dynamic, pioneering career path. You rise quickly through bold decisions and leadership.', fields: ['Military', 'Sports', 'Entrepreneurship', 'Surgery', 'Engineering'] },
  Taurus:      { title: 'Taurus in 10th House', text: 'Steady, wealth-building career. You thrive in stable, material industries with long-term growth.', fields: ['Banking', 'Agriculture', 'Luxury Goods', 'Music', 'Real Estate'] },
  Gemini:      { title: 'Gemini in 10th House', text: 'Communications and intellect define your career. Versatility is your greatest asset.', fields: ['Journalism', 'IT', 'Marketing', 'Law', 'Teaching'] },
  Cancer:      { title: 'Cancer in 10th House', text: 'Public-facing and nurturing career. Emotional intelligence drives your professional success.', fields: ['Politics', 'Hospitality', 'Nursing', 'Catering', 'Social Work'] },
  Leo:         { title: 'Leo in 10th House', text: 'Born to be in the spotlight. Leadership, authority, and recognition follow you in career.', fields: ['Politics', 'Acting', 'Management', 'Government', 'Administration'] },
  Virgo:       { title: 'Virgo in 10th House', text: 'Detail-oriented professional excellence. You succeed through precision, analysis, and service.', fields: ['Medicine', 'Accounting', 'Research', 'Data Analysis', 'Editing'] },
  Libra:       { title: 'Libra in 10th House', text: 'Diplomacy and aesthetics drive your career. You excel where balance and beauty are valued.', fields: ['Law', 'Fashion', 'Diplomacy', 'HR', 'Interior Design'] },
  Scorpio:     { title: 'Scorpio in 10th House', text: 'Intense, investigative career. You thrive in high-stakes, transformative fields.', fields: ['Investigation', 'Psychology', 'Research', 'Finance', 'Occult Sciences'] },
  Sagittarius: { title: 'Sagittarius in 10th House', text: 'Philosophy, expansion, and wisdom define your professional calling.', fields: ['Teaching', 'Law', 'Publishing', 'Foreign Relations', 'Adventure'] },
  Capricorn:   { title: 'Capricorn in 10th House', text: 'Capricorn rules the 10th house — career is your life purpose. Steady climb to the very top.', fields: ['Administration', 'Engineering', 'Government', 'Business Management', 'Architecture'] },
  Aquarius:    { title: 'Aquarius in 10th House', text: 'Innovative and humanitarian career. You pioneer change in your professional field.', fields: ['Technology', 'Science', 'Social Work', 'Aviation', 'Activism'] },
  Pisces:      { title: 'Pisces in 10th House', text: 'Spiritual, artistic, and compassionate career. Success comes through intuition and service.', fields: ['Medicine', 'Spiritual Counseling', 'Arts', 'Film', 'Charity'] }
};

// Marriage / Love prediction based on 7th house sign
export const LOVE_BY_7TH_SIGN: Record<string, { title: string; text: string; spouseTraits: string; timing: string }> = {
  Aries:       { title: 'Aries in 7th House', text: 'Your spouse is energetic, bold, and independent. Marriage brings passion and drive into your life.', spouseTraits: 'Athletic, assertive, passionate, independent', timing: 'Marriage tends to happen in mid-20s. Sometimes impulsive decisions.' },
  Taurus:      { title: 'Taurus in 7th House', text: 'Your spouse is stable, sensual, and financially responsible. Marriage brings comfort and security.', spouseTraits: 'Beautiful, artistic, loyal, wealthy-minded', timing: 'Marriage after solid financial foundation. Usually stable and long-lasting.' },
  Gemini:      { title: 'Gemini in 7th House', text: 'Your spouse is witty, communicative, and intellectually stimulating. Marriage thrives on good conversation.', spouseTraits: 'Intelligent, youthful, talkative, versatile', timing: 'Multiple romantic connections before settling. Marriage in late 20s.' },
  Cancer:      { title: 'Cancer in 7th House', text: 'Your spouse is nurturing, family-oriented, and emotionally sensitive. A deeply caring marriage.', spouseTraits: 'Caring, home-loving, protective, emotional', timing: 'Early emotional attachments. Marriage when family stability is achieved.' },
  Leo:         { title: 'Leo in 7th House', text: 'Your spouse is charismatic, generous, and confident. Marriage has a royal quality to it.', spouseTraits: 'Charming, generous, proud, leadership-oriented', timing: 'Attracts prestigious partners. Marriage is a social event. Usually mid-20s to 30s.' },
  Virgo:       { title: 'Virgo in 7th House', text: 'Your spouse is analytical, health-conscious, and practical. Marriage is built on shared routines.', spouseTraits: 'Intelligent, service-minded, health-conscious, critical', timing: 'Delayed marriage is possible. Spouse met through work or daily life.' },
  Libra:       { title: 'Libra in 7th House', text: 'Venus rules your 7th house — this is the best placement for marriage. Harmonious, beautiful partnership.', spouseTraits: 'Beautiful, artistic, balanced, social, charming', timing: 'Strong natural desire for marriage. Usually marries at appropriate age.' },
  Scorpio:     { title: 'Scorpio in 7th House', text: 'Intense, transformative marriage. Deep karmic bond with spouse. Powerful partnership.', spouseTraits: 'Magnetic, intense, secretive, deeply loyal once committed', timing: 'Transformative relationship before marriage. May marry later after deep karmic experience.' },
  Sagittarius: { title: 'Sagittarius in 7th House', text: 'Your spouse is philosophical, adventurous, and optimistic. Marriage brings freedom and wisdom.', spouseTraits: 'Educated, adventurous, spiritual, broad-minded', timing: 'May marry a foreigner or someone from a different background. Usually mid to late 20s.' },
  Capricorn:   { title: 'Capricorn in 7th House', text: 'Marriage is treated seriously and practically. Spouse is mature, responsible, and career-oriented.', spouseTraits: 'Disciplined, ambitious, older, professional', timing: 'Delayed marriage is very common. Long and stable once committed.' },
  Aquarius:    { title: 'Aquarius in 7th House', text: 'Unconventional marriage. Spouse is unique, intellectual, and humanitarian-minded.', spouseTraits: 'Unique, intellectual, independent, socially conscious', timing: 'Unusual or unexpected meeting with spouse. Non-traditional relationship style.' },
  Pisces:      { title: 'Pisces in 7th House', text: 'Deeply spiritual and compassionate marriage. A karmic, soulmate-type connection.', spouseTraits: 'Compassionate, artistic, spiritual, dreamy, intuitive', timing: 'Idealistic about love. May have multiple spiritual connections before marriage.' }
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAshtakootMatch = calculateAshtakootMatch;
const astronomy_1 = require("./astronomy");
// 1. Varna Classification Helper
function getVarna(signNumber) {
    // Brahmin (Water: 4, 8, 12)
    if ([4, 8, 12].includes(signNumber))
        return { name: 'Brahmin (Spiritual)', rank: 4 };
    // Kshatriya (Fire: 1, 5, 9)
    if ([1, 5, 9].includes(signNumber))
        return { name: 'Kshatriya (Ruling)', rank: 3 };
    // Vaishya (Air: 3, 7, 11)
    if ([3, 7, 11].includes(signNumber))
        return { name: 'Vaishya (Commerce)', rank: 2 };
    // Shudra (Earth: 2, 6, 10)
    return { name: 'Shudra (Service)', rank: 1 };
}
// 2. Vashya Classification Helper
function getVashyaGroup(signNumber) {
    // Chatushpada (Quadruped)
    if ([1, 2].includes(signNumber) || (signNumber === 9 && false) || signNumber === 10) {
        return 'Chatushpada';
    }
    // Jalachar (Water)
    if ([4, 12].includes(signNumber) || signNumber === 10) {
        return 'Jalachar';
    }
    // Vanachar (Wild)
    if (signNumber === 5)
        return 'Vanachar';
    // Keeta (Insect)
    if (signNumber === 8)
        return 'Keeta';
    // Manav (Human)
    return 'Manav';
}
// 3. Nakshatra Gana Definitions
const GANA_MAP = {
    1: 'Deva', 2: 'Manushya', 3: 'Manushya', 4: 'Manushya', 5: 'Deva',
    6: 'Manushya', 7: 'Deva', 8: 'Deva', 9: 'Rakshasa', 10: 'Rakshasa',
    11: 'Manushya', 12: 'Manushya', 13: 'Deva', 14: 'Rakshasa', 15: 'Deva',
    16: 'Rakshasa', 17: 'Deva', 18: 'Rakshasa', 19: 'Rakshasa', 20: 'Manushya',
    21: 'Manushya', 22: 'Deva', 23: 'Rakshasa', 24: 'Rakshasa', 25: 'Manushya',
    26: 'Manushya', 27: 'Deva'
};
// 4. Nakshatra Nadi Definitions (Adi=1, Madhya=2, Antya=3)
const NADI_MAP = {
    1: 'Adi', 2: 'Madhya', 3: 'Antya', 4: 'Antya', 5: 'Madhya',
    6: 'Adi', 7: 'Adi', 8: 'Madhya', 9: 'Antya', 10: 'Antya',
    11: 'Madhya', 12: 'Adi', 13: 'Adi', 14: 'Madhya', 15: 'Antya',
    16: 'Antya', 17: 'Madhya', 18: 'Adi', 19: 'Adi', 20: 'Madhya',
    21: 'Antya', 22: 'Antya', 23: 'Madhya', 24: 'Adi', 25: 'Adi',
    26: 'Madhya', 27: 'Antya'
};
// 5. Nakshatra Yoni (Animal) Definitions
const YONI_MAP = {
    1: 'Horse', 2: 'Elephant', 3: 'Sheep', 4: 'Serpent', 5: 'Serpent',
    6: 'Dog', 7: 'Cat', 8: 'Sheep', 9: 'Cat', 10: 'Rat',
    11: 'Rat', 12: 'Cow', 13: 'Buffalo', 14: 'Tiger', 15: 'Buffalo',
    16: 'Tiger', 17: 'Deer', 18: 'Deer', 19: 'Dog', 20: 'Monkey',
    21: 'Mongoose', 22: 'Monkey', 23: 'Lion', 24: 'Lion', 25: 'Lion',
    26: 'Cow', 27: 'Elephant'
};
// Yoni Compatibility Matrix
const YONI_COMPATIBILITY = {
    Horse: { Horse: 4, Elephant: 2, Sheep: 2, Serpent: 1, Dog: 1, Cat: 2, Rat: 1, Cow: 2, Buffalo: 0, Tiger: 1, Deer: 3, Monkey: 3, Mongoose: 2, Lion: 1 },
    Elephant: { Horse: 2, Elephant: 4, Sheep: 3, Serpent: 3, Dog: 2, Cat: 1, Rat: 0, Cow: 2, Buffalo: 2, Tiger: 1, Deer: 2, Monkey: 3, Mongoose: 2, Lion: 1 },
    Sheep: { Horse: 2, Elephant: 3, Sheep: 4, Serpent: 2, Dog: 1, Cat: 2, Rat: 2, Cow: 3, Buffalo: 3, Tiger: 0, Deer: 2, Monkey: 2, Mongoose: 2, Lion: 1 },
    Serpent: { Horse: 1, Elephant: 3, Sheep: 2, Serpent: 4, Dog: 2, Cat: 1, Rat: 1, Cow: 1, Buffalo: 1, Tiger: 2, Deer: 2, Monkey: 2, Mongoose: 0, Lion: 2 },
    Dog: { Horse: 1, Elephant: 2, Sheep: 1, Serpent: 2, Dog: 4, Cat: 0, Rat: 1, Cow: 2, Buffalo: 2, Tiger: 1, Deer: 2, Monkey: 2, Mongoose: 1, Lion: 2 },
    Cat: { Horse: 2, Elephant: 1, Sheep: 2, Serpent: 1, Dog: 0, Cat: 4, Rat: 0, Cow: 2, Buffalo: 2, Tiger: 1, Deer: 2, Monkey: 2, Mongoose: 1, Lion: 2 },
    Rat: { Horse: 1, Elephant: 0, Sheep: 2, Serpent: 1, Dog: 1, Cat: 0, Rat: 4, Cow: 2, Buffalo: 2, Tiger: 1, Deer: 2, Monkey: 2, Mongoose: 2, Lion: 2 },
    Cow: { Horse: 2, Elephant: 2, Sheep: 3, Serpent: 1, Dog: 2, Cat: 2, Rat: 2, Cow: 4, Buffalo: 3, Tiger: 0, Deer: 3, Monkey: 2, Mongoose: 2, Lion: 1 },
    Buffalo: { Horse: 0, Elephant: 2, Sheep: 3, Serpent: 1, Dog: 2, Cat: 2, Rat: 2, Cow: 3, Buffalo: 4, Tiger: 1, Deer: 2, Monkey: 2, Mongoose: 2, Lion: 1 },
    Tiger: { Horse: 1, Elephant: 1, Sheep: 0, Serpent: 2, Dog: 1, Cat: 1, Rat: 1, Cow: 0, Buffalo: 1, Tiger: 4, Deer: 1, Monkey: 2, Mongoose: 2, Lion: 1 },
    Deer: { Horse: 3, Elephant: 2, Sheep: 2, Serpent: 2, Dog: 2, Cat: 2, Rat: 2, Cow: 3, Buffalo: 2, Tiger: 1, Deer: 4, Monkey: 2, Mongoose: 2, Lion: 1 },
    Monkey: { Horse: 3, Elephant: 3, Sheep: 2, Serpent: 2, Dog: 2, Cat: 2, Rat: 2, Cow: 2, Buffalo: 2, Tiger: 2, Deer: 2, Monkey: 4, Mongoose: 1, Lion: 3 },
    Mongoose: { Horse: 2, Elephant: 2, Sheep: 2, Serpent: 0, Dog: 1, Cat: 1, Rat: 2, Cow: 2, Buffalo: 2, Tiger: 2, Deer: 2, Monkey: 1, Mongoose: 4, Lion: 2 },
    Lion: { Horse: 1, Elephant: 1, Sheep: 1, Serpent: 2, Dog: 2, Cat: 2, Rat: 2, Cow: 1, Buffalo: 1, Tiger: 1, Deer: 1, Monkey: 3, Mongoose: 2, Lion: 4 }
};
// 6. Rashi Ruler Friendship Matrix
// Rulers: Sun=0, Moon=1, Mars=2, Mercury=3, Jupiter=4, Venus=5, Saturn=6
const RULER_NAMES = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
const FRIENDSHIP_MATRIX = [
    // Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn
    [5.0, 5.0, 5.0, 4.0, 5.0, 0.0, 0.0], // Sun
    [5.0, 5.0, 4.0, 5.0, 4.0, 4.0, 4.0], // Moon
    [5.0, 5.0, 5.0, 0.0, 5.0, 4.0, 4.0], // Mars
    [4.0, 0.0, 4.0, 5.0, 4.0, 5.0, 4.0], // Mercury
    [5.0, 5.0, 5.0, 0.0, 5.0, 0.0, 4.0], // Jupiter
    [0.0, 0.0, 4.0, 5.0, 4.0, 5.0, 5.0], // Venus
    [0.0, 0.0, 0.0, 5.0, 4.0, 5.0, 5.0] // Saturn
];
function getFriendshipScore(rulerA, rulerB) {
    const idxA = RULER_NAMES.indexOf(rulerA);
    const idxB = RULER_NAMES.indexOf(rulerB);
    if (idxA === -1 || idxB === -1)
        return 3; // default neutral
    return FRIENDSHIP_MATRIX[idxA][idxB];
}
/**
 * Calculates Ashtakoot Compatibility Score out of 36.
 */
function calculateAshtakootMatch(moonLongA, // Bride's Moon Longitude
moonLongB // Groom's Moon Longitude
) {
    const pA = (0, astronomy_1.getPlacementInfo)(moonLongA); // Bride (Profile A)
    const pB = (0, astronomy_1.getPlacementInfo)(moonLongB); // Groom (Profile B)
    const kootas = {};
    let totalScore = 0;
    // 1. Varna Koota (Max: 1)
    const varnaA = getVarna(pA.signNumber);
    const varnaB = getVarna(pB.signNumber);
    let varnaScore = 0;
    if (varnaB.rank >= varnaA.rank) {
        varnaScore = 1;
    }
    kootas['Varna'] = {
        score: varnaScore,
        max: 1,
        description: `Bride: ${varnaA.name}, Groom: ${varnaB.name}`
    };
    totalScore += varnaScore;
    // 2. Vashya Koota (Max: 2)
    const vashyaA = getVashyaGroup(pA.signNumber);
    const vashyaB = getVashyaGroup(pB.signNumber);
    let vashyaScore = 0;
    if (vashyaA === vashyaB) {
        vashyaScore = 2;
    }
    else if ((vashyaA === 'Manav' && vashyaB === 'Chatushpada') || (vashyaA === 'Chatushpada' && vashyaB === 'Jalachar')) {
        vashyaScore = 1;
    }
    else if (vashyaA === 'Vanachar' || vashyaB === 'Keeta') {
        vashyaScore = 0;
    }
    else {
        vashyaScore = 0.5;
    }
    kootas['Vashya'] = {
        score: vashyaScore,
        max: 2,
        description: `Bride: ${vashyaA}, Groom: ${vashyaB}`
    };
    totalScore += vashyaScore;
    // 3. Tara Koota (Max: 3)
    const nakA = pA.nakshatraNumber;
    const nakB = pB.nakshatraNumber;
    const diffAToB = ((nakB - nakA + 27) % 9) || 9;
    const diffBToA = ((nakA - nakB + 27) % 9) || 9;
    const badTarans = [3, 5, 7];
    const taraAFavorable = !badTarans.includes(diffAToB % 9);
    const taraBFavorable = !badTarans.includes(diffBToA % 9);
    let taraScore = 0;
    if (taraAFavorable && taraBFavorable) {
        taraScore = 3;
    }
    else if (taraAFavorable || taraBFavorable) {
        taraScore = 1.5;
    }
    kootas['Tara'] = {
        score: taraScore,
        max: 3,
        description: `Bride-to-Groom distance: ${diffAToB}, Groom-to-Bride distance: ${diffBToA}`
    };
    totalScore += taraScore;
    // 4. Yoni Koota (Max: 4)
    const yoniA = YONI_MAP[nakA];
    const yoniB = YONI_MAP[nakB];
    const yoniScore = YONI_COMPATIBILITY[yoniA]?.[yoniB] ?? 2;
    kootas['Yoni'] = {
        score: yoniScore,
        max: 4,
        description: `Bride Yoni: ${yoniA}, Groom Yoni: ${yoniB}`
    };
    totalScore += yoniScore;
    // 5. Maitri Koota (Max: 5)
    const rulerA = pA.signRuler;
    const rulerB = pB.signRuler;
    const friendshipScore = getFriendshipScore(rulerA, rulerB);
    kootas['Maitri'] = {
        score: friendshipScore,
        max: 5,
        description: `Bride Rashi Lord: ${rulerA}, Groom Rashi Lord: ${rulerB}`
    };
    totalScore += friendshipScore;
    // 6. Gana Koota (Max: 6)
    const ganaA = GANA_MAP[nakA];
    const ganaB = GANA_MAP[nakB];
    let ganaScore = 0;
    if (ganaA === ganaB) {
        ganaScore = 6;
    }
    else if (ganaA === 'Deva' && ganaB === 'Manushya') {
        ganaScore = 5;
    }
    else if (ganaA === 'Manushya' && ganaB === 'Deva') {
        ganaScore = 5;
    }
    else if (ganaA === 'Deva' && ganaB === 'Rakshasa') {
        ganaScore = 1;
    }
    kootas['Gana'] = {
        score: ganaScore,
        max: 6,
        description: `Bride: ${ganaA}, Groom: ${ganaB}`
    };
    totalScore += ganaScore;
    // 7. Bhakoot Koota (Max: 7)
    const signA = pA.signNumber;
    const signB = pB.signNumber;
    // Distance from sign A to B (clockwise)
    const dist = ((signB - signA + 12) % 12) + 1;
    let bhakootScore = 0;
    // Unfavorable pairs: 2/12, 5/9, 6/8
    if ([2, 12, 5, 9, 6, 8].includes(dist)) {
        bhakootScore = 0;
    }
    else {
        bhakootScore = 7;
    }
    // Exceptions where Bhakoot is neutralized (e.g. same ruler)
    if (bhakootScore === 0 && (rulerA === rulerB)) {
        bhakootScore = 7;
    }
    kootas['Bhakoot'] = {
        score: bhakootScore,
        max: 7,
        description: `Sign relationship: ${dist} houses away`
    };
    totalScore += bhakootScore;
    // 8. Nadi Koota (Max: 8)
    const nadiA = NADI_MAP[nakA];
    const nadiB = NADI_MAP[nakB];
    let nadiScore = 0;
    if (nadiA !== nadiB) {
        nadiScore = 8;
    }
    kootas['Nadi'] = {
        score: nadiScore,
        max: 8,
        description: `Bride Nadi: ${nadiA}, Groom Nadi: ${nadiB} ${nadiScore === 0 ? '(Nadi Dosha detected)' : ''}`
    };
    totalScore += nadiScore;
    // Verdict calculation
    let verdict = 'Poor Compatibility';
    if (totalScore >= 25) {
        verdict = 'Excellent Compatibility (Highly Recommended)';
    }
    else if (totalScore >= 18) {
        verdict = 'Good Compatibility (Recommended)';
    }
    else if (totalScore >= 12) {
        verdict = 'Average Compatibility (Medium)';
    }
    return {
        score: totalScore,
        maxScore: 36,
        verdict,
        kootas
    };
}

const memberPhoto = (fileName) => new URL(`../../AICC ML MEMBERS PHOTO/${fileName}`, import.meta.url).href;

// ── 2026-27 AI&ML Members ────────────────────────────────────────────────────
const members2627_AIML = [
  // Secretary
  { name: "Hariharan J", position: "Secretary", image: memberPhoto("HARIHARAN J.jpg"), year: "2026-27" },

  // Additional Secretary
  { name: "Sreenithy S", position: "Additional Secretary", image: memberPhoto("SREENITHY S.png"), year: "2026-27" },

  // Joint Secretary
  { name: "Divyadharshini J", position: "Joint Secretary", image: memberPhoto("DIVYADHARSHINI J.png"), year: "2026-27" },
  { name: "Bharat Hari S", position: "Joint Secretary", image: memberPhoto("BHARAT HARI S.png"), year: "2026-27" },

  // Treasurer
  { name: "Mithra T", position: "Treasurer", image: null, year: "2026-27" },
  { name: "Yalini S", position: "Treasurer", image: memberPhoto("YALINI.png"), year: "2026-27" },

  // Technical Team
  { name: "Harish Sabari P V", position: "Technical Team", image: memberPhoto("Harish Sabari P V.png"), year: "2026-27" },
  { name: "Prem M", position: "Technical Team", image: memberPhoto("PREM.png"), year: "2026-27" },
  { name: "Pavin M", position: "Technical Team", image: memberPhoto("PAVIN M.png"), year: "2026-27" },

  // Multimedia Team
  { name: "Sanjay Ramesh I", position: "Multimedia Team", image: memberPhoto("Sanjay Ramesh I.png"), year: "2026-27" },
  { name: "Ritesh S", position: "Multimedia Team", image: memberPhoto("RITESH.png"), imageFocus: "50% 18%", year: "2026-27" },
  { name: "Mohan K", position: "Multimedia Team", image: memberPhoto("Mohan K.png"), imageFocus: "50% 18%", year: "2026-27" },

  // Executive Members
  { name: "Sevesh S S", position: "Executive Member", image: memberPhoto("SEVESH S S.png"), year: "2026-27" },
  { name: "Abhishek G", position: "Executive Member", image: memberPhoto("Abhishek_G.png"), year: "2026-27" },
  { name: "Durgasri A M", position: "Executive Member", image: memberPhoto("Durgasri.png"), year: "2026-27" },
  { name: "Gobika M", position: "Executive Member", image: memberPhoto("gobika.png"), year: "2026-27" },
];

export const membersData = [
  ...members2627_AIML,
];
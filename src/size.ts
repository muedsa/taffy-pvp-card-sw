export const cardPadding = 5;
export const contentMargin = 3;

export const globalFontColor = "#ffffff";

export const characterImageSize = 256;
export const characterImageX = 0 + cardPadding;
export const characterImageY = 0 + cardPadding;

export const ownerTextFontSize = 16;
export const ownerTextFontColor = globalFontColor;
export const ownerTextX = characterImageX + contentMargin;
export const ownerTextY = characterImageY + contentMargin;

export const characterLevelTextFontSize = 16;
export const characterLevelTextFontColor = globalFontColor;
export const characterLevelTextEndX =
  characterImageX + characterImageSize - contentMargin;
export const characterLevelTextEndY = characterImageY + contentMargin;

export const characterSkillsTextFontSize = 16;
export const characterSkillsTextFontColor = globalFontColor;
export const characterSkillsTextX = characterImageX + contentMargin;
export const characterSkillsTextY =
  characterImageY +
  characterImageSize -
  characterSkillsTextFontSize -
  contentMargin;
characterImageY + characterImageSize - characterSkillsTextFontSize - 3;

export const characterTalentTextFontSize = 16;
export const characterTalentTextFontColor = globalFontColor;
export const characterTalentTextEndX = characterImageX + characterImageSize - 3;
export const characterTalentTextEndY =
  characterImageY + characterImageSize - characterSkillsTextFontSize - 3;

export const characterPropWidth = 156;
export const characterPropHeight = 12;
export const characterPropImageSize = characterPropHeight;
export const characterPropImageX =
  characterImageX + characterImageSize + contentMargin;
export const characterPropImageY = characterImageY;
export const characterPropTextX =
  characterPropImageX + characterPropImageSize + contentMargin;
export const characterPropTextY = characterImageY;
export const characterPropTextEndX =
  cardPadding + characterImageSize + contentMargin + characterPropWidth;
export const characterPropTextEndY = characterPropTextY;
export const characterPropTextFontSize = characterPropHeight;
export const characterPropTextFontColor = globalFontColor;

export const reliquaryInfoHeight = 64 + contentMargin;
export const reliquaryImageSize = reliquaryInfoHeight;
export const reliquaryInfoWidth =
  (characterImageSize + contentMargin + characterPropWidth) / 2;
export const reliquaryX = characterImageX;
export const reliquaryY = characterImageY + characterImageSize + contentMargin;

export const reliquaryImageXList = [
  reliquaryX,
  reliquaryX + reliquaryInfoWidth + contentMargin,
  reliquaryX,
  reliquaryX + reliquaryInfoWidth + contentMargin,
  reliquaryX,
];
export const reliquaryImageYList = [
  reliquaryY,
  reliquaryY,
  reliquaryY + reliquaryInfoHeight + contentMargin,
  reliquaryY + reliquaryInfoHeight + contentMargin,
  reliquaryY + reliquaryInfoHeight * 2 + contentMargin * 2,
];

export const reliquaryMainPropImageSize = reliquaryImageSize / 2 - 2;

export const reliquaryMainPropTextFontSize = 14;
export const reliquaryMainPropTextFontColor = globalFontColor;

export const reliquarySubPropWidth =
  (reliquaryInfoWidth - reliquaryImageSize - contentMargin) / 2;
export const reliquarySubPropHeight = (reliquaryInfoHeight - contentMargin) / 2;
export const reliquarySubPropImageSize =
  reliquarySubPropHeight - contentMargin * 4;
export const reliquarySubPropRX = reliquaryImageSize;
export const reliquarySubPropRY = 0;
export const reliquarySubPropRXList = [
  reliquarySubPropRX,
  reliquarySubPropRX + reliquarySubPropWidth,
  reliquarySubPropRX,
  reliquarySubPropRX + reliquarySubPropWidth,
];
export const reliquarySubPropRYList = [
  reliquarySubPropRY,
  reliquarySubPropRY,
  reliquarySubPropRY + reliquarySubPropHeight + contentMargin,
  reliquarySubPropRY + reliquarySubPropHeight + contentMargin,
];
export const reliquarySubPropTextFontSize =
  reliquarySubPropImageSize - contentMargin;
export const reliquarySubPropTextFontColor = globalFontColor;

export const reliquarySetTextFontSize =
  reliquarySubPropImageSize - contentMargin;
export const reliquarySetEndX =
  cardPadding + characterImageSize + contentMargin + characterPropWidth;
export const reliquarySetEndY =
  cardPadding +
  characterImageSize +
  reliquaryInfoHeight * 3 +
  contentMargin * 2 -
  reliquarySetTextFontSize;
export const reliquarySetTextFontColor = globalFontColor;

export const weaponImageSize = reliquaryInfoHeight;
export const weaponNameTextFontSize = characterPropTextFontSize;

export const weaponNameTextEndX = characterPropImageX + characterPropWidth;
export const weaponNameTextEndY =
  characterImageY + characterImageSize - weaponNameTextFontSize;
export const weaponNameTextFontColor = globalFontColor;

export const weaponImageX = weaponNameTextEndX - weaponImageSize;
export const weaponImageY =
  weaponNameTextEndY - contentMargin - weaponImageSize;

export const weaponPropImageSize = reliquarySubPropImageSize;
export const weaponPropTextFontSize = reliquarySubPropTextFontSize;
export const weaponMainPropImageX =
  weaponImageX - contentMargin - weaponPropImageSize;
export const weaponMainPropImageY =
  weaponImageY + (weaponPropImageSize - weaponPropTextFontSize) / 2;
export const weaponMainPropTextEndX = weaponMainPropImageX - contentMargin;
export const weaponMainPropTextEndY = weaponMainPropImageY;
export const weaponSubPropImageX = weaponMainPropImageX;
export const weaponSubPropImageY =
  weaponMainPropImageY + weaponPropImageSize + contentMargin;
export const weaponSubPropTextEndX = weaponSubPropImageX - contentMargin;
export const weaponSubPropTextEndY = weaponSubPropImageY;
export const weaponPropTextFontColor = globalFontColor;

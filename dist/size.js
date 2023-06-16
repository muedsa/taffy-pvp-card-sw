"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reliquarySubPropRYList = exports.reliquarySubPropRXList = exports.reliquarySubPropRY = exports.reliquarySubPropRX = exports.reliquarySubPropImageSize = exports.reliquarySubPropHeight = exports.reliquarySubPropWidth = exports.reliquaryMainPropTextFontColor = exports.reliquaryMainPropTextFontSize = exports.reliquaryMainPropImageSize = exports.reliquaryImageYList = exports.reliquaryImageXList = exports.reliquaryY = exports.reliquaryX = exports.reliquaryInfoWidth = exports.reliquaryImageSize = exports.reliquaryInfoHeight = exports.characterPropTextFontColor = exports.characterPropTextFontSize = exports.characterPropTextEndY = exports.characterPropTextEndX = exports.characterPropTextY = exports.characterPropTextX = exports.characterPropImageY = exports.characterPropImageX = exports.characterPropImageSize = exports.characterPropHeight = exports.characterPropWidth = exports.characterTalentTextEndY = exports.characterTalentTextEndX = exports.characterTalentTextFontColor = exports.characterTalentTextFontSize = exports.characterSkillsTextY = exports.characterSkillsTextX = exports.characterSkillsTextFontColor = exports.characterSkillsTextFontSize = exports.characterLevelTextEndY = exports.characterLevelTextEndX = exports.characterLevelTextFontColor = exports.characterLevelTextFontSize = exports.ownerTextY = exports.ownerTextX = exports.ownerTextFontColor = exports.ownerTextFontSize = exports.characterImageY = exports.characterImageX = exports.characterImageSize = exports.globalFontColor = exports.contentMargin = exports.cardPadding = void 0;
exports.weaponPropTextFontColor = exports.weaponSubPropTextEndY = exports.weaponSubPropTextEndX = exports.weaponSubPropImageY = exports.weaponSubPropImageX = exports.weaponMainPropTextEndY = exports.weaponMainPropTextEndX = exports.weaponMainPropImageY = exports.weaponMainPropImageX = exports.weaponPropTextFontSize = exports.weaponPropImageSize = exports.weaponImageY = exports.weaponImageX = exports.weaponNameTextFontColor = exports.weaponNameTextEndY = exports.weaponNameTextEndX = exports.weaponNameTextFontSize = exports.weaponImageSize = exports.reliquarySetTextFontColor = exports.reliquarySetEndY = exports.reliquarySetEndX = exports.reliquarySetTextFontSize = exports.reliquarySubPropTextFontColor = exports.reliquarySubPropTextFontSize = void 0;
exports.cardPadding = 5;
exports.contentMargin = 3;
exports.globalFontColor = "#ffffff";
exports.characterImageSize = 256;
exports.characterImageX = 0 + exports.cardPadding;
exports.characterImageY = 0 + exports.cardPadding;
exports.ownerTextFontSize = 16;
exports.ownerTextFontColor = exports.globalFontColor;
exports.ownerTextX = exports.characterImageX + exports.contentMargin;
exports.ownerTextY = exports.characterImageY + exports.contentMargin;
exports.characterLevelTextFontSize = 16;
exports.characterLevelTextFontColor = exports.globalFontColor;
exports.characterLevelTextEndX = exports.characterImageX + exports.characterImageSize - exports.contentMargin;
exports.characterLevelTextEndY = exports.characterImageY + exports.contentMargin;
exports.characterSkillsTextFontSize = 16;
exports.characterSkillsTextFontColor = exports.globalFontColor;
exports.characterSkillsTextX = exports.characterImageX + exports.contentMargin;
exports.characterSkillsTextY = exports.characterImageY +
    exports.characterImageSize -
    exports.characterSkillsTextFontSize -
    exports.contentMargin;
exports.characterImageY + exports.characterImageSize - exports.characterSkillsTextFontSize - 3;
exports.characterTalentTextFontSize = 16;
exports.characterTalentTextFontColor = exports.globalFontColor;
exports.characterTalentTextEndX = exports.characterImageX + exports.characterImageSize - 3;
exports.characterTalentTextEndY = exports.characterImageY + exports.characterImageSize - exports.characterSkillsTextFontSize - 3;
exports.characterPropWidth = 156;
exports.characterPropHeight = 12;
exports.characterPropImageSize = exports.characterPropHeight;
exports.characterPropImageX = exports.characterImageX + exports.characterImageSize + exports.contentMargin;
exports.characterPropImageY = exports.characterImageY;
exports.characterPropTextX = exports.characterPropImageX + exports.characterPropImageSize + exports.contentMargin;
exports.characterPropTextY = exports.characterImageY;
exports.characterPropTextEndX = exports.cardPadding + exports.characterImageSize + exports.contentMargin + exports.characterPropWidth;
exports.characterPropTextEndY = exports.characterPropTextY;
exports.characterPropTextFontSize = exports.characterPropHeight;
exports.characterPropTextFontColor = exports.globalFontColor;
exports.reliquaryInfoHeight = 64 + exports.contentMargin;
exports.reliquaryImageSize = exports.reliquaryInfoHeight;
exports.reliquaryInfoWidth = (exports.characterImageSize + exports.contentMargin + exports.characterPropWidth) / 2;
exports.reliquaryX = exports.characterImageX;
exports.reliquaryY = exports.characterImageY + exports.characterImageSize + exports.contentMargin;
exports.reliquaryImageXList = [
    exports.reliquaryX,
    exports.reliquaryX + exports.reliquaryInfoWidth + exports.contentMargin,
    exports.reliquaryX,
    exports.reliquaryX + exports.reliquaryInfoWidth + exports.contentMargin,
    exports.reliquaryX,
];
exports.reliquaryImageYList = [
    exports.reliquaryY,
    exports.reliquaryY,
    exports.reliquaryY + exports.reliquaryInfoHeight + exports.contentMargin,
    exports.reliquaryY + exports.reliquaryInfoHeight + exports.contentMargin,
    exports.reliquaryY + exports.reliquaryInfoHeight * 2 + exports.contentMargin * 2,
];
exports.reliquaryMainPropImageSize = exports.reliquaryImageSize / 2 - 2;
exports.reliquaryMainPropTextFontSize = 14;
exports.reliquaryMainPropTextFontColor = exports.globalFontColor;
exports.reliquarySubPropWidth = (exports.reliquaryInfoWidth - exports.reliquaryImageSize - exports.contentMargin) / 2;
exports.reliquarySubPropHeight = (exports.reliquaryInfoHeight - exports.contentMargin) / 2;
exports.reliquarySubPropImageSize = exports.reliquarySubPropHeight - exports.contentMargin * 4;
exports.reliquarySubPropRX = exports.reliquaryImageSize;
exports.reliquarySubPropRY = 0;
exports.reliquarySubPropRXList = [
    exports.reliquarySubPropRX,
    exports.reliquarySubPropRX + exports.reliquarySubPropWidth,
    exports.reliquarySubPropRX,
    exports.reliquarySubPropRX + exports.reliquarySubPropWidth,
];
exports.reliquarySubPropRYList = [
    exports.reliquarySubPropRY,
    exports.reliquarySubPropRY,
    exports.reliquarySubPropRY + exports.reliquarySubPropHeight + exports.contentMargin,
    exports.reliquarySubPropRY + exports.reliquarySubPropHeight + exports.contentMargin,
];
exports.reliquarySubPropTextFontSize = exports.reliquarySubPropImageSize - exports.contentMargin;
exports.reliquarySubPropTextFontColor = exports.globalFontColor;
exports.reliquarySetTextFontSize = exports.reliquarySubPropImageSize - exports.contentMargin;
exports.reliquarySetEndX = exports.cardPadding + exports.characterImageSize + exports.contentMargin + exports.characterPropWidth;
exports.reliquarySetEndY = exports.cardPadding +
    exports.characterImageSize +
    exports.reliquaryInfoHeight * 3 +
    exports.contentMargin * 2 -
    exports.reliquarySetTextFontSize;
exports.reliquarySetTextFontColor = exports.globalFontColor;
exports.weaponImageSize = exports.reliquaryInfoHeight;
exports.weaponNameTextFontSize = exports.characterPropTextFontSize;
exports.weaponNameTextEndX = exports.characterPropImageX + exports.characterPropWidth;
exports.weaponNameTextEndY = exports.characterImageY + exports.characterImageSize - exports.weaponNameTextFontSize;
exports.weaponNameTextFontColor = exports.globalFontColor;
exports.weaponImageX = exports.weaponNameTextEndX - exports.weaponImageSize;
exports.weaponImageY = exports.weaponNameTextEndY - exports.contentMargin - exports.weaponImageSize;
exports.weaponPropImageSize = exports.reliquarySubPropImageSize;
exports.weaponPropTextFontSize = exports.reliquarySubPropTextFontSize;
exports.weaponMainPropImageX = exports.weaponImageX - exports.contentMargin - exports.weaponPropImageSize;
exports.weaponMainPropImageY = exports.weaponImageY + (exports.weaponPropImageSize - exports.weaponPropTextFontSize) / 2;
exports.weaponMainPropTextEndX = exports.weaponMainPropImageX - exports.contentMargin;
exports.weaponMainPropTextEndY = exports.weaponMainPropImageY;
exports.weaponSubPropImageX = exports.weaponMainPropImageX;
exports.weaponSubPropImageY = exports.weaponMainPropImageY + exports.weaponPropImageSize + exports.contentMargin;
exports.weaponSubPropTextEndX = exports.weaponSubPropImageX - exports.contentMargin;
exports.weaponSubPropTextEndY = exports.weaponSubPropImageY;
exports.weaponPropTextFontColor = exports.globalFontColor;

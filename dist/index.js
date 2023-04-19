"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCard = exports.defaultCardConfig = void 0;
const canvas_1 = require("@napi-rs/canvas");
const util_1 = require("./util");
const canvas_util_1 = require("./canvas-util");
const cardPadding = 5;
const contentMragin = 3;
const globalFontColor = "#ffffff";
const characterImageSize = 256;
const characterImageX = 0 + cardPadding;
const characterImageY = 0 + cardPadding;
const ownerTextFontSize = 16;
const ownerTextFontColor = globalFontColor;
const ownerTextX = characterImageX + contentMragin;
const ownerTextY = characterImageY + contentMragin;
const characterLevelTextFontSize = 16;
const characterLevelTextFontColor = globalFontColor;
const characterLevelTextEndX = characterImageX + characterImageSize - contentMragin;
const characterLevelTextEndY = characterImageY + contentMragin;
const characterSkillsTextFontSize = 16;
const characterSkillsTextFontColor = globalFontColor;
const characterSkillsTextX = characterImageX + contentMragin;
const characterSkillsTextY = characterImageY +
    characterImageSize -
    characterSkillsTextFontSize -
    contentMragin;
characterImageY + characterImageSize - characterSkillsTextFontSize - 3;
const characterTalentTextFontSize = 16;
const characterTalentTextFontColor = globalFontColor;
const characterTalentTextEndX = characterImageX + characterImageSize - 3;
const characterTalentTextEndY = characterImageY + characterImageSize - characterSkillsTextFontSize - 3;
const characterPropWidth = 156;
const characterPropHeigth = 12;
const characterPropImageSize = characterPropHeigth;
const characterPropImageX = characterImageX + characterImageSize + contentMragin;
const characterPropImageY = characterImageY;
const characterPropTextX = characterPropImageX + characterPropImageSize + contentMragin;
const characterPropTextY = characterImageY;
const characterPropTextEndX = cardPadding + characterImageSize + contentMragin + characterPropWidth;
const characterPropTextEndY = characterPropTextY;
const characterPropTextFontSize = characterPropHeigth;
const characterPropTextFontColor = globalFontColor;
const reliquaryInfoHeight = 64 + contentMragin;
const reliquaryImageSize = reliquaryInfoHeight;
const reliquaryInfoWidth = (characterImageSize + contentMragin + characterPropWidth) / 2;
const reliquaryX = characterImageX;
const reliquaryY = characterImageY + characterImageSize + contentMragin;
const reliquaryImageXList = [
    reliquaryX,
    reliquaryX + reliquaryInfoWidth + contentMragin,
    reliquaryX,
    reliquaryX + reliquaryInfoWidth + contentMragin,
    reliquaryX,
];
const reliquaryImageYList = [
    reliquaryY,
    reliquaryY,
    reliquaryY + reliquaryInfoHeight + contentMragin,
    reliquaryY + reliquaryInfoHeight + contentMragin,
    reliquaryY + reliquaryInfoHeight * 2 + contentMragin * 2,
];
const reliquaryMainPropImageSize = reliquaryImageSize / 2 - 2;
const reliquaryMainPropTextFontSize = 14;
const reliquaryMainPropTextFontColor = globalFontColor;
const reliquarySubPropWidth = (reliquaryInfoWidth - reliquaryImageSize - contentMragin) / 2;
const reliquarySubPropHeigth = (reliquaryInfoHeight - contentMragin) / 2;
const reliquarySubPropImageSize = reliquarySubPropHeigth - contentMragin * 4;
const reliquarySubPropRX = reliquaryImageSize;
const reliquarySubPropRY = 0;
const reliquarySubPropRXList = [
    reliquarySubPropRX,
    reliquarySubPropRX + reliquarySubPropWidth,
    reliquarySubPropRX,
    reliquarySubPropRX + reliquarySubPropWidth,
];
const reliquarySubPropRYList = [
    reliquarySubPropRY,
    reliquarySubPropRY,
    reliquarySubPropRY + reliquarySubPropHeigth + contentMragin,
    reliquarySubPropRY + reliquarySubPropHeigth + contentMragin,
];
const reliquarySubPropTextFontSize = reliquarySubPropImageSize - contentMragin;
const reliquarySubPropTextFontColor = globalFontColor;
const reliquarySetTextFontSize = reliquarySubPropImageSize - contentMragin;
const reliquarySetEndX = cardPadding + characterImageSize + contentMragin + characterPropWidth;
const reliquarySetEndY = cardPadding +
    characterImageSize +
    reliquaryInfoHeight * 3 +
    contentMragin * 2 -
    reliquarySetTextFontSize;
const reliquarySetTextFontColor = globalFontColor;
const weaponImageSize = reliquaryInfoHeight;
const weaponNameTextFontSize = characterPropTextFontSize;
const weaponNameTextEndX = characterPropImageX + characterPropWidth;
const weaponNameTextEndY = characterImageY + characterImageSize - weaponNameTextFontSize;
const weaponNameTextFontColor = globalFontColor;
const weaponImageX = weaponNameTextEndX - weaponImageSize;
const weaponImageY = weaponNameTextEndY - contentMragin - weaponImageSize;
const weaponPropImageSize = reliquarySubPropImageSize;
const weaponPropTextFontSize = reliquarySubPropTextFontSize;
const weaponMainPropImageX = weaponImageX - contentMragin - weaponPropImageSize;
const weaponMainPropImageY = weaponImageY + (weaponPropImageSize - weaponPropTextFontSize) / 2;
const weaponMainPropTextEndX = weaponMainPropImageX - contentMragin;
const weaponMainPropTextEndY = weaponMainPropImageY;
const weaponSubPropImageX = weaponMainPropImageX;
const weaponSubPropImageY = weaponMainPropImageY + weaponPropImageSize + contentMragin;
const weaponSubPropTextEndX = weaponSubPropImageX - contentMragin;
const weaponSubPropTextEndY = weaponSubPropImageY;
const weaponPropTextFontColor = globalFontColor;
const cardWidth = cardPadding * 2 + characterImageSize + contentMragin + characterPropWidth;
const cardHeight = cardPadding * 2 +
    characterImageSize +
    reliquaryInfoHeight * 3 +
    contentMragin * 3;
exports.defaultCardConfig = {
    width: cardWidth,
    height: cardHeight,
    lang: "zh-CN",
    fontFamily: "Noto Sans SC",
    customeFonts: [
        {
            fontPath: (0, util_1.getAssetFontPath)("NotoSansSC-Regular.otf"),
            fontFamily: "Noto Sans SC",
        },
    ],
};
function generateCard(character, config = exports.defaultCardConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        registCustomeFonts(config);
        const canvas = (0, canvas_1.createCanvas)(config.width, config.height);
        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.scale(config.width / cardWidth, config.height / cardHeight);
        initBackground(ctx, character);
        yield drawCharacter(ctx, config, character);
        yield drawCharacterProps(ctx, config, character);
        yield drawReliquaries(ctx, config, character.reliquaries, character.id);
        yield drawWeapon(ctx, config, character.weapon);
        return canvas;
    });
}
exports.generateCard = generateCard;
function registCustomeFonts(config) {
    if (Array.isArray(config.customeFonts)) {
        config.customeFonts.forEach((font) => canvas_1.GlobalFonts.registerFromPath(font.fontPath, font.fontFamily));
    }
}
function initBackground(ctx, character) {
    const color = (0, util_1.getBgColor)(character.id);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, cardWidth, cardHeight);
    return color;
}
function drawCharacter(ctx, config, character) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        const characterImagePath = (0, util_1.getCharacterImagePath)(character.id);
        const skillsText = character.skills.join("-");
        // character image
        yield (0, canvas_util_1.loadImageAndDraw)(ctx, characterImagePath, characterImageX, characterImageY, characterImageSize, characterImageSize);
        // owner
        if (character.owner) {
            // uid
            if (character.owner.uid) {
                (0, canvas_util_1.drawText)(ctx, "UID:" + character.owner.uid, ownerTextX, ownerTextY, ownerTextFontSize, ownerTextFontColor, ((_a = config.specialFontFamilies) === null || _a === void 0 ? void 0 : _a.ownerTextFontFamily) || config.fontFamily);
            }
            // name
            if (character.owner.name) {
                (0, canvas_util_1.drawText)(ctx, character.owner.name, ownerTextX, character.owner.uid
                    ? ownerTextY + ownerTextFontSize + contentMragin
                    : ownerTextY, ownerTextFontSize, ownerTextFontColor, ((_b = config.specialFontFamilies) === null || _b === void 0 ? void 0 : _b.ownerTextFontFamily) || config.fontFamily);
            }
        }
        // level
        (0, canvas_util_1.drawText)(ctx, (0, util_1.getLoc)("level", config.lang) + " " + character.level.toFixed(0), characterLevelTextEndX, characterLevelTextEndY, characterLevelTextFontSize, characterLevelTextFontColor, ((_c = config.specialFontFamilies) === null || _c === void 0 ? void 0 : _c.characterLevelTextFontFamily) ||
            config.fontFamily, "right");
        // skill level
        (0, canvas_util_1.drawText)(ctx, skillsText, characterSkillsTextX, characterSkillsTextY, characterSkillsTextFontSize, characterSkillsTextFontColor, ((_d = config.specialFontFamilies) === null || _d === void 0 ? void 0 : _d.characterSkillsTextFontFamily) ||
            config.fontFamily);
        // talent
        if (character.talent > 0) {
            (0, canvas_util_1.drawText)(ctx, character.talent.toFixed(0) + "◈", characterTalentTextEndX, characterTalentTextEndY, characterTalentTextFontSize, characterTalentTextFontColor, ((_e = config.specialFontFamilies) === null || _e === void 0 ? void 0 : _e.characterTalentTextFontFamily) ||
                config.fontFamily, "right");
        }
        return;
    });
}
function drawCharacterProps(ctx, config, character) {
    return __awaiter(this, void 0, void 0, function* () {
        const baseProps = [2000, 2001, 2002, 20, 22, 23, 28];
        for (let i = 0; i < baseProps.length; i++) {
            yield drawCharacterProp(ctx, config, character.fightPropMap, baseProps[i], i);
        }
        yield drawCharacterProp(ctx, config, character.fightPropMap, (0, util_1.getCharacterMasterElementDamageProp)(character.id), baseProps.length);
        return;
    });
}
function drawCharacterProp(ctx, config, fightPropMap, propId, propPosition) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const imageX = characterPropImageX;
        const imageY = characterPropImageY +
            characterPropHeigth * propPosition +
            contentMragin * propPosition;
        const textX = characterPropTextX;
        const textY = characterPropTextY +
            characterPropHeigth * propPosition +
            contentMragin * propPosition;
        const textEndX = characterPropTextEndX;
        const textEndY = characterPropTextEndY +
            characterPropHeigth * propPosition +
            contentMragin * propPosition;
        // prop image
        yield (0, canvas_util_1.loadImageAndDraw)(ctx, (0, util_1.getCharacterPropImagePath)(propId), imageX, imageY, characterPropImageSize, characterPropImageSize);
        // prop text
        const propLabel = (0, util_1.getCharacterPropLoc)(propId, config.lang);
        const propValue = (0, util_1.getCharacterPropText)(propId, fightPropMap[propId]);
        (0, canvas_util_1.drawText)(ctx, propLabel, textX, textY, characterPropTextFontSize, characterPropTextFontColor, ((_a = config.specialFontFamilies) === null || _a === void 0 ? void 0 : _a.characterPropTextFontFamily) || config.fontFamily);
        (0, canvas_util_1.drawText)(ctx, propValue, textEndX, textEndY, characterPropTextFontSize, characterPropTextFontColor, ((_b = config.specialFontFamilies) === null || _b === void 0 ? void 0 : _b.characterPropTextFontFamily) ||
            config.fontFamily, "right");
        return;
    });
}
function drawReliquaries(ctx, config, reliquaries, avatarId) {
    return __awaiter(this, void 0, void 0, function* () {
        let postion = 0;
        const setNumMap = new Map();
        if (reliquaries.flower) {
            yield drawReliquary(ctx, config, reliquaries.flower, avatarId, postion++);
            countSetNum(setNumMap, reliquaries.flower.id);
        }
        if (reliquaries.feather) {
            yield drawReliquary(ctx, config, reliquaries.feather, avatarId, postion++);
            countSetNum(setNumMap, reliquaries.feather.id);
        }
        if (reliquaries.sands) {
            yield drawReliquary(ctx, config, reliquaries.sands, avatarId, postion++);
            countSetNum(setNumMap, reliquaries.sands.id);
        }
        if (reliquaries.goblet) {
            yield drawReliquary(ctx, config, reliquaries.goblet, avatarId, postion++);
            countSetNum(setNumMap, reliquaries.goblet.id);
        }
        if (reliquaries.circlet) {
            yield drawReliquary(ctx, config, reliquaries.circlet, avatarId, postion++);
            countSetNum(setNumMap, reliquaries.circlet.id);
        }
        // set info
        let setIndex = 0;
        setNumMap.forEach((num, setId) => {
            var _a;
            if (num >= 2) {
                const setNum = num >= 4 ? 4 : 2;
                const text = (0, util_1.getReliquarySetName)(setId, config.lang) + " [" + setNum + "]";
                (0, canvas_util_1.drawText)(ctx, text, reliquarySetEndX, reliquarySetEndY -
                    contentMragin * setIndex -
                    reliquarySetTextFontSize * setIndex, reliquarySetTextFontSize, reliquarySetTextFontColor, ((_a = config.specialFontFamilies) === null || _a === void 0 ? void 0 : _a.reliquarySetTextFontFamily) ||
                    config.fontFamily, "right");
                setIndex++;
            }
        });
        return;
    });
}
function drawReliquary(ctx, config, reliquary, avatarId, postion) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // reliquary image
        const imageX = reliquaryImageXList[postion];
        const imageY = reliquaryImageYList[postion];
        const imageOffsetX = reliquaryImageSize / 3;
        const imageOffsetY = 0;
        ctx.save();
        ctx.strokeStyle = globalFontColor;
        ctx.lineWidth = 2;
        ctx.roundRect(imageX, imageY, reliquaryImageSize, reliquaryImageSize, [8, 8, 8, 8]);
        ctx.clip();
        yield (0, canvas_util_1.loadImageAndOffsetDraw)(ctx, (0, util_1.getReliquaryImagePath)(reliquary.type, avatarId), imageOffsetX, imageOffsetY, imageX, imageY, reliquaryImageSize, reliquaryImageSize);
        // main prop image
        const mainPropImageX = imageX + reliquaryImageSize - reliquaryMainPropImageSize - 1;
        const mainPropImageY = imageY + 1;
        yield (0, canvas_util_1.loadImageAndDraw)(ctx, (0, util_1.getReliquaryPropImagePath)(reliquary.mainProp.id), mainPropImageX, mainPropImageY, reliquaryMainPropImageSize, reliquaryMainPropImageSize);
        // main prop text
        const mainPropTextEndX = imageX + reliquaryImageSize - 2;
        const mainPropTextEndY = imageY + reliquaryImageSize - reliquaryMainPropTextFontSize - contentMragin;
        (0, canvas_util_1.drawText)(ctx, (0, util_1.getFightPropText)(reliquary.mainProp), mainPropTextEndX, mainPropTextEndY, reliquaryMainPropTextFontSize, reliquaryMainPropTextFontColor, ((_a = config.specialFontFamilies) === null || _a === void 0 ? void 0 : _a.reliquaryMainPropTextFontFamily) ||
            config.fontFamily, "right");
        ctx.stroke();
        ctx.restore();
        // sub prop
        for (let i = 0; i < reliquary.subProps.length; i++) {
            yield drawReliquarySubProp(ctx, config, reliquary.subProps[i], i, imageX, imageY);
        }
        return;
    });
}
function drawReliquarySubProp(ctx, config, prop, postion, x, y) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // sub prop image
        const imageX = x + reliquarySubPropRXList[postion];
        const imageY = y +
            reliquarySubPropRYList[postion] +
            (reliquarySubPropHeigth - reliquarySubPropImageSize) / 2;
        yield (0, canvas_util_1.loadImageAndDraw)(ctx, (0, util_1.getReliquaryPropImagePath)(prop.id), imageX, imageY, reliquarySubPropImageSize, reliquarySubPropImageSize);
        // sub prop text
        const textX = imageX + reliquarySubPropImageSize + contentMragin;
        const textY = imageY;
        (0, canvas_util_1.drawText)(ctx, (0, util_1.getFightPropText)(prop), textX, textY, reliquarySubPropTextFontSize, reliquarySubPropTextFontColor, ((_a = config.specialFontFamilies) === null || _a === void 0 ? void 0 : _a.reliquarySubPropTextFontFamily) ||
            config.fontFamily);
        return;
    });
}
function countSetNum(setNumMap, reliquaryId) {
    const setId = (0, util_1.getReliquarySetId)(reliquaryId);
    if (setId) {
        if (setNumMap.has(setId)) {
            setNumMap.set(setId, (setNumMap.get(setId) || 1) + 1);
        }
        else {
            setNumMap.set(setId, 1);
        }
    }
    return;
}
function drawWeapon(ctx, config, weapon) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        // weapon name
        (0, canvas_util_1.drawText)(ctx, (0, util_1.getWeaponName)(weapon.id, config.lang), weaponNameTextEndX, weaponNameTextEndY, weaponNameTextFontSize, weaponNameTextFontColor, ((_a = config.specialFontFamilies) === null || _a === void 0 ? void 0 : _a.weaponNameTextFontFamily) || config.fontFamily, "right");
        // weapon image
        ctx.save();
        ctx.strokeStyle = globalFontColor;
        ctx.lineWidth = 2;
        ctx.roundRect(weaponImageX, weaponImageY, weaponImageSize, weaponImageSize, [8, 8, 8, 8]);
        ctx.clip();
        yield (0, canvas_util_1.loadImageAndDraw)(ctx, (0, util_1.getWeaponImagePath)(weapon.id), weaponImageX, weaponImageY, weaponImageSize, weaponImageSize);
        ctx.stroke();
        ctx.restore();
        // weapon main prop image
        yield (0, canvas_util_1.loadImageAndDraw)(ctx, (0, util_1.getReliquaryPropImagePath)(weapon.mainProp.id), weaponMainPropImageX, weaponMainPropImageY, weaponPropImageSize, weaponPropImageSize);
        // weapon main prop text
        (0, canvas_util_1.drawText)(ctx, (0, util_1.getFightPropText)(weapon.mainProp), weaponMainPropTextEndX, weaponMainPropTextEndY, weaponPropTextFontSize, weaponPropTextFontColor, ((_b = config.specialFontFamilies) === null || _b === void 0 ? void 0 : _b.weaponPropTextFontFamily) || config.fontFamily, "right");
        if (weapon.subProp) {
            // weapon sub prop image
            yield (0, canvas_util_1.loadImageAndDraw)(ctx, (0, util_1.getReliquaryPropImagePath)(weapon.subProp.id), weaponSubPropImageX, weaponSubPropImageY, weaponPropImageSize, weaponPropImageSize);
            // weapon sub prop text
            (0, canvas_util_1.drawText)(ctx, (0, util_1.getFightPropText)(weapon.subProp), weaponSubPropTextEndX, weaponSubPropTextEndY, weaponPropTextFontSize, weaponPropTextFontColor, ((_c = config.specialFontFamilies) === null || _c === void 0 ? void 0 : _c.weaponPropTextFontFamily) || config.fontFamily, "right");
        }
        return;
    });
}

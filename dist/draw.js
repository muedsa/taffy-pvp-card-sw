"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawWeapon = exports.drawReliquaries = exports.drawCharacterProps = exports.drawCharacter = void 0;
const util_1 = require("./util");
const canvasUtil_1 = require("./canvasUtil");
const size = __importStar(require("./size"));
async function drawCharacter(ctx, config, character) {
    const characterImagePath = (0, util_1.getCharacterImagePath)(character.id);
    const skillsText = character.skills.join("-");
    // character image
    await (0, canvasUtil_1.loadImageAndDraw)(ctx, characterImagePath, size.characterImageX, size.characterImageY, size.characterImageSize, size.characterImageSize);
    // owner
    if (character.owner) {
        // uid
        if (character.owner.uid) {
            (0, canvasUtil_1.drawText)(ctx, "UID:" + character.owner.uid, size.ownerTextX, size.ownerTextY, size.ownerTextFontSize, size.ownerTextFontColor, config.specialFontFamilies?.ownerTextFontFamily || config.fontFamily);
        }
        // name
        if (character.owner.name) {
            (0, canvasUtil_1.drawText)(ctx, character.owner.name, size.ownerTextX, character.owner.uid
                ? size.ownerTextY + size.ownerTextFontSize + size.contentMargin
                : size.ownerTextY, size.ownerTextFontSize, size.ownerTextFontColor, config.specialFontFamilies?.ownerTextFontFamily || config.fontFamily);
        }
    }
    // level
    (0, canvasUtil_1.drawText)(ctx, (0, util_1.getLoc)("level", config.lang) + " " + character.level.toFixed(0), size.characterLevelTextEndX, size.characterLevelTextEndY, size.characterLevelTextFontSize, size.characterLevelTextFontColor, config.specialFontFamilies?.characterLevelTextFontFamily ||
        config.fontFamily, "right");
    // skill level
    (0, canvasUtil_1.drawText)(ctx, skillsText, size.characterSkillsTextX, size.characterSkillsTextY, size.characterSkillsTextFontSize, size.characterSkillsTextFontColor, config.specialFontFamilies?.characterSkillsTextFontFamily ||
        config.fontFamily);
    // talent
    if (character.talent > 0) {
        (0, canvasUtil_1.drawText)(ctx, character.talent.toFixed(0) + "◈", size.characterTalentTextEndX, size.characterTalentTextEndY, size.characterTalentTextFontSize, size.characterTalentTextFontColor, config.specialFontFamilies?.characterTalentTextFontFamily ||
            config.fontFamily, "right");
    }
    return;
}
exports.drawCharacter = drawCharacter;
async function drawCharacterProps(ctx, config, character) {
    const baseProps = [2000, 2001, 2002, 20, 22, 23, 28];
    for (let i = 0; i < baseProps.length; i++) {
        await drawCharacterProp(ctx, config, character.fightPropMap, baseProps[i], i);
    }
    await drawCharacterProp(ctx, config, character.fightPropMap, (0, util_1.getCharacterMasterElementDamageProp)(character.id), baseProps.length);
    return;
}
exports.drawCharacterProps = drawCharacterProps;
async function drawCharacterProp(ctx, config, fightPropMap, propId, propPosition) {
    const imageX = size.characterPropImageX;
    const imageY = size.characterPropImageY +
        size.characterPropHeight * propPosition +
        size.contentMargin * propPosition;
    const textX = size.characterPropTextX;
    const textY = size.characterPropTextY +
        size.characterPropHeight * propPosition +
        size.contentMargin * propPosition;
    const textEndX = size.characterPropTextEndX;
    const textEndY = size.characterPropTextEndY +
        size.characterPropHeight * propPosition +
        size.contentMargin * propPosition;
    // prop image
    await (0, canvasUtil_1.loadImageAndDraw)(ctx, (0, util_1.getCharacterPropImagePath)(propId), imageX, imageY, size.characterPropImageSize, size.characterPropImageSize);
    // prop text
    const propLabel = (0, util_1.getCharacterPropLoc)(propId, config.lang);
    const propValue = (0, util_1.getCharacterPropText)(propId, fightPropMap[propId]);
    (0, canvasUtil_1.drawText)(ctx, propLabel, textX, textY, size.characterPropTextFontSize, size.characterPropTextFontColor, config.specialFontFamilies?.characterPropTextFontFamily ||
        config.fontFamily);
    (0, canvasUtil_1.drawText)(ctx, propValue, textEndX, textEndY, size.characterPropTextFontSize, size.characterPropTextFontColor, config.specialFontFamilies?.characterPropTextFontFamily ||
        config.fontFamily, "right");
    return;
}
async function drawReliquaries(ctx, config, reliquaries, avatarId) {
    let position = 0;
    const setNumMap = new Map();
    if (reliquaries.flower) {
        await drawReliquary(ctx, config, reliquaries.flower, avatarId, position++);
        countSetNum(setNumMap, reliquaries.flower.id);
    }
    if (reliquaries.feather) {
        await drawReliquary(ctx, config, reliquaries.feather, avatarId, position++);
        countSetNum(setNumMap, reliquaries.feather.id);
    }
    if (reliquaries.sands) {
        await drawReliquary(ctx, config, reliquaries.sands, avatarId, position++);
        countSetNum(setNumMap, reliquaries.sands.id);
    }
    if (reliquaries.goblet) {
        await drawReliquary(ctx, config, reliquaries.goblet, avatarId, position++);
        countSetNum(setNumMap, reliquaries.goblet.id);
    }
    if (reliquaries.circlet) {
        await drawReliquary(ctx, config, reliquaries.circlet, avatarId, position++);
        countSetNum(setNumMap, reliquaries.circlet.id);
    }
    // set info
    let setIndex = 0;
    setNumMap.forEach((num, setId) => {
        if (num >= 2) {
            const setNum = num >= 4 ? 4 : 2;
            const text = (0, util_1.getReliquarySetName)(setId, config.lang) + " [" + setNum + "]";
            (0, canvasUtil_1.drawText)(ctx, text, size.reliquarySetEndX, size.reliquarySetEndY -
                size.contentMargin * setIndex -
                size.reliquarySetTextFontSize * setIndex, size.reliquarySetTextFontSize, size.reliquarySetTextFontColor, config.specialFontFamilies?.reliquarySetTextFontFamily ||
                config.fontFamily, "right");
            setIndex++;
        }
    });
    return;
}
exports.drawReliquaries = drawReliquaries;
async function drawReliquary(ctx, config, reliquary, avatarId, position) {
    // reliquary image
    const imageX = size.reliquaryImageXList[position];
    const imageY = size.reliquaryImageYList[position];
    const imageOffsetX = size.reliquaryImageSize / 3;
    const imageOffsetY = 0;
    ctx.save();
    ctx.strokeStyle = size.globalFontColor;
    ctx.lineWidth = 2;
    ctx.roundRect(imageX, imageY, size.reliquaryImageSize, size.reliquaryImageSize, [8, 8, 8, 8]);
    ctx.clip();
    await (0, canvasUtil_1.loadImageAndOffsetDraw)(ctx, (0, util_1.getReliquaryImagePath)(reliquary.type, avatarId), imageOffsetX, imageOffsetY, imageX, imageY, size.reliquaryImageSize, size.reliquaryImageSize);
    // main prop image
    const mainPropImageX = imageX + size.reliquaryImageSize - size.reliquaryMainPropImageSize - 1;
    const mainPropImageY = imageY + 1;
    await (0, canvasUtil_1.loadImageAndDraw)(ctx, (0, util_1.getReliquaryPropImagePath)(reliquary.mainProp.id), mainPropImageX, mainPropImageY, size.reliquaryMainPropImageSize, size.reliquaryMainPropImageSize);
    // main prop text
    const mainPropTextEndX = imageX + size.reliquaryImageSize - 2;
    const mainPropTextEndY = imageY +
        size.reliquaryImageSize -
        size.reliquaryMainPropTextFontSize -
        size.contentMargin;
    (0, canvasUtil_1.drawText)(ctx, (0, util_1.getFightPropText)(reliquary.mainProp), mainPropTextEndX, mainPropTextEndY, size.reliquaryMainPropTextFontSize, size.reliquaryMainPropTextFontColor, config.specialFontFamilies?.reliquaryMainPropTextFontFamily ||
        config.fontFamily, "right");
    ctx.stroke();
    ctx.restore();
    // sub prop
    for (let i = 0; i < reliquary.subProps.length; i++) {
        await drawReliquarySubProp(ctx, config, reliquary.subProps[i], i, imageX, imageY);
    }
    return;
}
async function drawReliquarySubProp(ctx, config, prop, position, x, y) {
    // sub prop image
    const imageX = x + size.reliquarySubPropRXList[position];
    const imageY = y +
        size.reliquarySubPropRYList[position] +
        (size.reliquarySubPropHeight - size.reliquarySubPropImageSize) / 2;
    await (0, canvasUtil_1.loadImageAndDraw)(ctx, (0, util_1.getReliquaryPropImagePath)(prop.id), imageX, imageY, size.reliquarySubPropImageSize, size.reliquarySubPropImageSize);
    // sub prop text
    const textX = imageX + size.reliquarySubPropImageSize + size.contentMargin;
    const textY = imageY;
    (0, canvasUtil_1.drawText)(ctx, (0, util_1.getFightPropText)(prop), textX, textY, size.reliquarySubPropTextFontSize, size.reliquarySubPropTextFontColor, config.specialFontFamilies?.reliquarySubPropTextFontFamily ||
        config.fontFamily);
    return;
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
async function drawWeapon(ctx, config, weapon) {
    // weapon name
    (0, canvasUtil_1.drawText)(ctx, (0, util_1.getWeaponName)(weapon.id, config.lang), size.weaponNameTextEndX, size.weaponNameTextEndY, size.weaponNameTextFontSize, size.weaponNameTextFontColor, config.specialFontFamilies?.weaponNameTextFontFamily || config.fontFamily, "right");
    // weapon image
    ctx.save();
    ctx.strokeStyle = size.globalFontColor;
    ctx.lineWidth = 2;
    ctx.roundRect(size.weaponImageX, size.weaponImageY, size.weaponImageSize, size.weaponImageSize, [8, 8, 8, 8]);
    ctx.clip();
    await (0, canvasUtil_1.loadImageAndDraw)(ctx, (0, util_1.getWeaponImagePath)(weapon.id), size.weaponImageX, size.weaponImageY, size.weaponImageSize, size.weaponImageSize);
    ctx.stroke();
    ctx.restore();
    // weapon main prop image
    await (0, canvasUtil_1.loadImageAndDraw)(ctx, (0, util_1.getReliquaryPropImagePath)(weapon.mainProp.id), size.weaponMainPropImageX, size.weaponMainPropImageY, size.weaponPropImageSize, size.weaponPropImageSize);
    // weapon main prop text
    (0, canvasUtil_1.drawText)(ctx, (0, util_1.getFightPropText)(weapon.mainProp), size.weaponMainPropTextEndX, size.weaponMainPropTextEndY, size.weaponPropTextFontSize, size.weaponPropTextFontColor, config.specialFontFamilies?.weaponPropTextFontFamily || config.fontFamily, "right");
    if (weapon.subProp) {
        // weapon sub prop image
        await (0, canvasUtil_1.loadImageAndDraw)(ctx, (0, util_1.getReliquaryPropImagePath)(weapon.subProp.id), size.weaponSubPropImageX, size.weaponSubPropImageY, size.weaponPropImageSize, size.weaponPropImageSize);
        // weapon sub prop text
        (0, canvasUtil_1.drawText)(ctx, (0, util_1.getFightPropText)(weapon.subProp), size.weaponSubPropTextEndX, size.weaponSubPropTextEndY, size.weaponPropTextFontSize, size.weaponPropTextFontColor, config.specialFontFamilies?.weaponPropTextFontFamily || config.fontFamily, "right");
    }
    return;
}
exports.drawWeapon = drawWeapon;

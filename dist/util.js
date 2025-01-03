"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileExists = fileExists;
exports.getCharacterElement = getCharacterElement;
exports.getBgColor = getBgColor;
exports.getCharacterImagePath = getCharacterImagePath;
exports.getCharacterPropImagePath = getCharacterPropImagePath;
exports.getFightPropLoc = getFightPropLoc;
exports.getCharacterPropLoc = getCharacterPropLoc;
exports.getCharacterMasterElementDamageProp = getCharacterMasterElementDamageProp;
exports.getReliquaryImagePath = getReliquaryImagePath;
exports.getReliquaryPropImagePath = getReliquaryPropImagePath;
exports.getCharacterPropText = getCharacterPropText;
exports.getFightPropText = getFightPropText;
exports.getLoc = getLoc;
exports.getWeaponImagePath = getWeaponImagePath;
exports.getWeaponName = getWeaponName;
exports.getReliquarySetId = getReliquarySetId;
exports.getReliquariesLoc = getReliquariesLoc;
exports.getReliquarySetName = getReliquarySetName;
const node_fs_1 = require("node:fs");
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = require("node:path");
const cache_1 = require("./cache");
const colors_1 = require("./data/colors");
const damageProp_1 = require("./data/damageProp");
const imagePath_1 = require("./data/imagePath");
const assetPath = (0, node_path_1.resolve)(__dirname, "../asset");
async function fileExists(path) {
    try {
        await promises_1.default.access(path, node_fs_1.constants.F_OK);
        return true;
    }
    catch (e) {
        return false;
    }
}
function getCharacterElement(avatarId) {
    return (0, cache_1.getCache)("characters")[avatarId].element;
}
function getBgColor(avatarId) {
    const element = getCharacterElement(avatarId);
    return colors_1.backgroundColors[element];
}
function getCharacterImagePath(avatarId) {
    return (assetPath +
        "/image/splash/" +
        (0, cache_1.getCache)("characters")[avatarId].image +
        ".png");
}
function getCharacterPropImagePath(propId) {
    return assetPath + imagePath_1.characterPropImagePaths[propId];
}
function getFightPropLoc(propId, lang) {
    return (0, cache_1.getCache)("loc")[lang][propId];
}
function getCharacterPropLoc(propId, lang) {
    return getFightPropLoc(damageProp_1.fightPropLoc[propId], lang);
}
function getCharacterMasterElementDamageProp(avatarId) {
    const element = getCharacterElement(avatarId);
    return damageProp_1.characterMasterElementDamageProp[element];
}
function getReliquaryImagePath(type, avatarId) {
    return (assetPath +
        "/image/reliquary/" +
        type +
        "_" +
        getCharacterElement(avatarId) +
        ".png");
}
function getReliquaryPropImagePath(propId) {
    return assetPath + imagePath_1.reliquaryPropImagePaths[propId];
}
function textPropValue(value) {
    return value.toFixed(0);
}
function textPropRateValue(value) {
    return Number.parseFloat(value.toFixed(2)) + "%";
}
function getCharacterPropText(propId, value) {
    switch (propId) {
        case 20:
        case 22:
        case 23:
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 46:
            return textPropRateValue(value * 100);
        default:
            return textPropValue(value);
    }
}
function getFightPropText(prop) {
    switch (prop.id) {
        case "FIGHT_PROP_HP_PERCENT":
        case "FIGHT_PROP_ATTACK_PERCENT":
        case "FIGHT_PROP_DEFENSE_PERCENT":
        case "FIGHT_PROP_CRITICAL":
        case "FIGHT_PROP_CRITICAL_HURT":
        case "FIGHT_PROP_CHARGE_EFFICIENCY":
        case "FIGHT_PROP_HEAL_ADD":
        case "FIGHT_PROP_PHYSICAL_ADD_HURT":
        case "FIGHT_PROP_FIRE_ADD_HURT":
        case "FIGHT_PROP_ELEC_ADD_HURT":
        case "FIGHT_PROP_WATER_ADD_HURT":
        case "FIGHT_PROP_WIND_ADD_HURT":
        case "FIGHT_PROP_ICE_ADD_HURT":
        case "FIGHT_PROP_ROCK_ADD_HURT":
        case "FIGHT_PROP_GRASS_ADD_HURT":
            return textPropRateValue(prop.value);
        default:
            return textPropValue(prop.value);
    }
}
function getLoc(key, lang) {
    return (0, cache_1.getCache)("loc")[lang][key];
}
function getWeaponImagePath(weaponId) {
    const weaponType = (0, cache_1.getCache)("weapons")[weaponId].type;
    return assetPath + imagePath_1.weaponImagePaths[weaponType];
}
function getWeaponName(weaponId, lang) {
    const nameTextMapHash = (0, cache_1.getCache)("weapons")[weaponId].nameTextMapHash;
    return getLoc(nameTextMapHash.toString(), lang);
}
function getReliquarySetId(reliquaryId) {
    return (0, cache_1.getCache)("reliquaries")[reliquaryId]?.setId;
}
function getReliquariesLoc(key, lang) {
    return (0, cache_1.getCache)("reliquaries-loc")[lang][key];
}
function getReliquarySetName(setId, lang) {
    const nameTextMapHash = (0, cache_1.getCache)("reliquary-set")[setId].nameTextMapHash;
    return getReliquariesLoc(nameTextMapHash.toString(), lang);
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReliquarySetName = exports.getReliquariesLoc = exports.getReliquarySetId = exports.getWeaponName = exports.getWeaponImagePath = exports.getLoc = exports.getFightPropText = exports.getCharacterPropText = exports.getReliquaryPropImagePath = exports.getReliquaryImagePath = exports.getCharacterMasterElementDamageProp = exports.getCharacterPropLoc = exports.getFightPropLoc = exports.getCharacterPropImagePath = exports.getCharacterImagePath = exports.getBgColor = exports.getCharacterElement = exports.fileExists = void 0;
const node_fs_1 = require("node:fs");
const promises_1 = __importDefault(require("node:fs/promises"));
const path_1 = require("path");
const cache_1 = require("./cache");
const colors_1 = require("./data/colors");
const damageProp_1 = require("./data/damageProp");
const imagePath_1 = require("./data/imagePath");
const assetPath = (0, path_1.resolve)(__dirname, "../asset");
async function fileExists(path) {
    try {
        await promises_1.default.access(path, node_fs_1.constants.F_OK);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.fileExists = fileExists;
function getCharacterElement(avatarId) {
    return (0, cache_1.getCache)("characters")[avatarId].element;
}
exports.getCharacterElement = getCharacterElement;
function getBgColor(avatarId) {
    const element = getCharacterElement(avatarId);
    return colors_1.backgroundColors[element];
}
exports.getBgColor = getBgColor;
function getCharacterImagePath(avatarId) {
    return (assetPath +
        "/image/splash/" +
        (0, cache_1.getCache)("characters")[avatarId].image +
        ".png");
}
exports.getCharacterImagePath = getCharacterImagePath;
function getCharacterPropImagePath(propId) {
    return assetPath + imagePath_1.characterPropImagePaths[propId];
}
exports.getCharacterPropImagePath = getCharacterPropImagePath;
function getFightPropLoc(propId, lang) {
    return (0, cache_1.getCache)("loc")[lang][propId];
}
exports.getFightPropLoc = getFightPropLoc;
function getCharacterPropLoc(propId, lang) {
    return getFightPropLoc(damageProp_1.fightPropLoc[propId], lang);
}
exports.getCharacterPropLoc = getCharacterPropLoc;
function getCharacterMasterElementDamageProp(avatarId) {
    const element = getCharacterElement(avatarId);
    return damageProp_1.characterMasterElementDamageProp[element];
}
exports.getCharacterMasterElementDamageProp = getCharacterMasterElementDamageProp;
function getReliquaryImagePath(type, avatarId) {
    return (assetPath +
        "/image/reliquary/" +
        type +
        "_" +
        getCharacterElement(avatarId) +
        ".png");
}
exports.getReliquaryImagePath = getReliquaryImagePath;
function getReliquaryPropImagePath(propId) {
    return assetPath + imagePath_1.reliquaryPropImagePaths[propId];
}
exports.getReliquaryPropImagePath = getReliquaryPropImagePath;
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
exports.getCharacterPropText = getCharacterPropText;
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
exports.getFightPropText = getFightPropText;
function getLoc(key, lang) {
    return (0, cache_1.getCache)("loc")[lang][key];
}
exports.getLoc = getLoc;
function getWeaponImagePath(weaponId) {
    const weaponType = (0, cache_1.getCache)("weapons")[weaponId].type;
    return assetPath + imagePath_1.weaponImagePaths[weaponType];
}
exports.getWeaponImagePath = getWeaponImagePath;
function getWeaponName(weaponId, lang) {
    const nameTextMapHash = (0, cache_1.getCache)("weapons")[weaponId].nameTextMapHash;
    return getLoc(nameTextMapHash.toString(), lang);
}
exports.getWeaponName = getWeaponName;
function getReliquarySetId(reliquaryId) {
    return (0, cache_1.getCache)("reliquaries")[reliquaryId]?.setId;
}
exports.getReliquarySetId = getReliquarySetId;
function getReliquariesLoc(key, lang) {
    return (0, cache_1.getCache)("reliquaries-loc")[lang][key];
}
exports.getReliquariesLoc = getReliquariesLoc;
function getReliquarySetName(setId, lang) {
    const nameTextMapHash = (0, cache_1.getCache)("reliquary-set")[setId].nameTextMapHash;
    return getReliquariesLoc(nameTextMapHash.toString(), lang);
}
exports.getReliquarySetName = getReliquarySetName;

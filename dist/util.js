"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReliquarySetName = exports.getReliquariesLoc = exports.getReliquarySetId = exports.getWeaponName = exports.getWeaponImagePath = exports.getLoc = exports.getFightPropText = exports.getCharacterPropText = exports.getReliquaryPropImagePath = exports.getReliquaryImagePath = exports.getCharacterMasterElementDamageProp = exports.getCharacterPropLoc = exports.getFightPropLoc = exports.getCharacterPropImagePath = exports.getCharacterImagePath = exports.getBgColor = exports.getCharacterElement = exports.getAssetFontPath = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const path_1 = require("path");
const colors_1 = require("./data/colors");
const image_1 = require("./data/image");
const characters_1 = require("./data/characters");
const loc_1 = require("./data/loc");
const weapons_1 = require("./data/weapons");
const reliquaries_1 = require("./data/reliquaries");
const reliquary_set_1 = require("./data/reliquary-set");
const reliquaries_loc_1 = require("./data/reliquaries-loc");
function findDir(...paths) {
    if (paths.length > 3) {
        throw new Error("not found necessary dir");
    }
    const dirPaht = (0, path_1.resolve)(__dirname, ...paths);
    if (!node_fs_1.default.existsSync(dirPaht)) {
        return findDir("..", ...paths);
    }
    else {
        return dirPaht;
    }
}
const assetPath = findDir("asset");
function getAssetFontPath(filename) {
    return assetPath + "/font/" + filename;
}
exports.getAssetFontPath = getAssetFontPath;
function getCharacterElement(avatarId) {
    return characters_1.characters[avatarId].element;
}
exports.getCharacterElement = getCharacterElement;
function getBgColor(avatarId) {
    const element = getCharacterElement(avatarId);
    return colors_1.backgroupColors[element];
}
exports.getBgColor = getBgColor;
function getCharacterImagePath(avatarId) {
    return assetPath + "/image/splash/" + characters_1.characters[avatarId].image + ".png";
}
exports.getCharacterImagePath = getCharacterImagePath;
function getCharacterPropImagePath(propId) {
    return assetPath + image_1.characterPropImagePaths[propId];
}
exports.getCharacterPropImagePath = getCharacterPropImagePath;
function getFightPropLoc(propId, lang) {
    return loc_1.loc[lang][propId];
}
exports.getFightPropLoc = getFightPropLoc;
function getCharacterPropLoc(propId, lang) {
    return getFightPropLoc(characters_1.fightPropLoc[propId], lang);
}
exports.getCharacterPropLoc = getCharacterPropLoc;
function getCharacterMasterElementDamageProp(avatarId) {
    const element = getCharacterElement(avatarId);
    return characters_1.characterMasterElementDamageProp[element];
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
    return assetPath + image_1.reliquaryPropImagePaths[propId];
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
    return loc_1.loc[lang][key];
}
exports.getLoc = getLoc;
function getWeaponImagePath(weaponId) {
    const weaponType = weapons_1.weapons[weaponId].type;
    return assetPath + image_1.weaponImagePaths[weaponType];
}
exports.getWeaponImagePath = getWeaponImagePath;
function getWeaponName(weaponId, lang) {
    const nameTextMapHash = weapons_1.weapons[weaponId].nameTextMapHash;
    return getLoc(nameTextMapHash.toString(), lang);
}
exports.getWeaponName = getWeaponName;
function getReliquarySetId(reliquaryId) {
    var _a;
    return (_a = reliquaries_1.reliquaries[reliquaryId]) === null || _a === void 0 ? void 0 : _a.setId;
}
exports.getReliquarySetId = getReliquarySetId;
function getReliquariesLoc(key, lang) {
    return reliquaries_loc_1.reliquariesLoc[lang][key];
}
exports.getReliquariesLoc = getReliquariesLoc;
function getReliquarySetName(setId, lang) {
    const nameTextMapHash = reliquary_set_1.reliquarySet[setId].nameTextMapHash;
    return getReliquariesLoc(nameTextMapHash.toString(), lang);
}
exports.getReliquarySetName = getReliquarySetName;

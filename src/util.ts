import { constants } from "node:fs";
import fs from "node:fs/promises";
import { resolve } from "node:path";
import { getCache } from "./cache";
import { backgroundColors } from "./data/colors";
import {
  characterMasterElementDamageProp,
  fightPropLoc,
} from "./data/damageProp";
import {
  characterPropImagePaths,
  reliquaryPropImagePaths,
  weaponImagePaths,
} from "./data/imagePath";
import { FightProp } from "./types";

const assetPath = resolve(__dirname, "../asset");

export async function fileExists(path: string): Promise<boolean> {
  try {
    await fs.access(path, constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}

export function getCharacterElement(avatarId: number): string {
  return getCache("characters")[avatarId].element;
}

export function getBgColor(avatarId: number): string {
  const element = getCharacterElement(avatarId);
  return backgroundColors[element];
}

export function getCharacterImagePath(avatarId: number): string {
  return (
    assetPath +
    "/image/splash/" +
    getCache("characters")[avatarId].image +
    ".png"
  );
}

export function getCharacterPropImagePath(propId: number): string {
  return assetPath + characterPropImagePaths[propId];
}

export function getFightPropLoc(propId: string, lang: string): string {
  return getCache("loc")[lang][propId];
}

export function getCharacterPropLoc(propId: number, lang: string): string {
  return getFightPropLoc(fightPropLoc[propId], lang);
}

export function getCharacterMasterElementDamageProp(avatarId: number): number {
  const element = getCharacterElement(avatarId);
  return characterMasterElementDamageProp[element];
}

export function getReliquaryImagePath(type: string, avatarId: number): string {
  return (
    assetPath +
    "/image/reliquary/" +
    type +
    "_" +
    getCharacterElement(avatarId) +
    ".png"
  );
}

export function getReliquaryPropImagePath(propId: string): string {
  return assetPath + reliquaryPropImagePaths[propId];
}

function textPropValue(value: number): string {
  return value.toFixed(0);
}

function textPropRateValue(value: number): string {
  return Number.parseFloat(value.toFixed(2)) + "%";
}

export function getCharacterPropText(propId: number, value: number): string {
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

export function getFightPropText(prop: FightProp): string {
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

export function getLoc(key: string, lang: string): string {
  return getCache("loc")[lang][key];
}

export function getWeaponImagePath(weaponId: number): string {
  const weaponType = getCache("weapons")[weaponId].type;
  return assetPath + weaponImagePaths[weaponType];
}

export function getWeaponName(weaponId: number, lang: string): string {
  const nameTextMapHash = getCache("weapons")[weaponId].nameTextMapHash;
  return getLoc(nameTextMapHash.toString(), lang);
}

export function getReliquarySetId(reliquaryId: number): number | undefined {
  return getCache("reliquaries")[reliquaryId]?.setId;
}

export function getReliquariesLoc(key: string, lang: string): string {
  return getCache("reliquaries-loc")[lang][key];
}

export function getReliquarySetName(setId: number, lang: string): string {
  const nameTextMapHash = getCache("reliquary-set")[setId].nameTextMapHash;
  return getReliquariesLoc(nameTextMapHash.toString(), lang);
}

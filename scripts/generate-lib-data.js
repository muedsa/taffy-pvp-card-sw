const { resolve } = require("node:path");
const fs = require("node:fs");

const dataBasePath = resolve(__dirname, "..", "src", "data");

// weapons

const weaponsJsonData = require("../../GenshinData/ExcelBinOutput/WeaponExcelConfigData.json");

let weaponFileData = `export type WeaponsProps = {
  [key: number]: {
    type: string;
    nameTextMapHash: number;
  };
};

export const weapons: WeaponsProps = {`;

weaponsJsonData.forEach((weanponData) => {
  weaponFileData += `\n  ${weanponData.id}: {
    type: "${weanponData.weaponType}",
    nameTextMapHash: ${weanponData.nameTextMapHash}
  },`;
});

weaponFileData += "};";

fs.writeFileSync(resolve(dataBasePath, "weapons.ts"), weaponFileData);

// reliquaries

const reliquaryJsonData = require("../../GenshinData/ExcelBinOutput/ReliquaryExcelConfigData.json");
const reliquarySetJsonData = require("../../GenshinData/ExcelBinOutput/ReliquarySetExcelConfigData.json");
const equipAffixJsonData = require("../../GenshinData/ExcelBinOutput/EquipAffixExcelConfigData.json");
const enTextMapHash = require("../../GenshinData/TextMap/TextMapEN.json");
const ruTextMapHash = require("../../GenshinData/TextMap/TextMapRU.json");
const viTextMapHash = require("../../GenshinData/TextMap/TextMapVI.json");
const thTextMapHash = require("../../GenshinData/TextMap/TextMapTH.json");
const ptTextMapHash = require("../../GenshinData/TextMap/TextMapPT.json");
const krTextMapHash = require("../../GenshinData/TextMap/TextMapKR.json");
const jpTextMapHash = require("../../GenshinData/TextMap/TextMapJP.json");
const idTextMapHash = require("../../GenshinData/TextMap/TextMapID.json");
const frTextMapHash = require("../../GenshinData/TextMap/TextMapFR.json");
const esTextMapHash = require("../../GenshinData/TextMap/TextMapES.json");
const deTextMapHash = require("../../GenshinData/TextMap/TextMapDE.json");
const chsTextMapHash = require("../../GenshinData/TextMap/TextMapCHS.json");
const chtTextMapHash = require("../../GenshinData/TextMap/TextMapCHS.json");
const itTextMapHash = require("../../GenshinData/TextMap/TextMapIT.json");
const trTextMapHash = require("../../GenshinData/TextMap/TextMapTR.json");

let reliquariesFileData = `
export type ReliquariesProps = {
  [key: number]: {
    nameTextMapHash: number;
    setId?: number;
    setNameTextMapHash?: number;
  };
};

export const reliquaries: ReliquariesProps = {
`;

let reliquarySetFileData = `
export type ReliquarySetProps = {
  [key: number]: {
    nameTextMapHash: number;
  };
};

export const reliquarySet: ReliquarySetProps = {
`;

let reliquariesLocFileData = `
import { LocProps } from ".";


export const reliquariesLoc: LocProps = `;

let reliquarySetMap = {};
let equipAffixMap = {};

reliquarySetJsonData.forEach((set) => {
  reliquarySetMap[set.setId] = {
    affixId: set.EquipAffixId,
  };
});

equipAffixJsonData.forEach((affix) => {
  equipAffixMap[affix.id] = {
    nameTextMapHash: affix.nameTextMapHash,
  };
});

let reliquariesLoc = {
  en: {},
  ru: {},
  vi: {},
  th: {},
  pt: {},
  kr: {},
  jp: {},
  id: {},
  fr: {},
  es: {},
  de: {},
  "zh-TW": {},
  "zh-CN": {},
  it: {},
  tr: {},
};

function addReliquariesLoc(textMapHash) {
  reliquariesLoc["en"][textMapHash] = enTextMapHash[textMapHash];
  reliquariesLoc["ru"][textMapHash] = ruTextMapHash[textMapHash];
  reliquariesLoc["vi"][textMapHash] = viTextMapHash[textMapHash];
  reliquariesLoc["th"][textMapHash] = thTextMapHash[textMapHash];
  reliquariesLoc["pt"][textMapHash] = ptTextMapHash[textMapHash];
  reliquariesLoc["kr"][textMapHash] = krTextMapHash[textMapHash];
  reliquariesLoc["jp"][textMapHash] = jpTextMapHash[textMapHash];
  reliquariesLoc["id"][textMapHash] = idTextMapHash[textMapHash];
  reliquariesLoc["fr"][textMapHash] = frTextMapHash[textMapHash];
  reliquariesLoc["es"][textMapHash] = esTextMapHash[textMapHash];
  reliquariesLoc["de"][textMapHash] = deTextMapHash[textMapHash];
  reliquariesLoc["zh-TW"][textMapHash] = chsTextMapHash[textMapHash];
  reliquariesLoc["zh-CN"][textMapHash] = chtTextMapHash[textMapHash];
  reliquariesLoc["it"][textMapHash] = itTextMapHash[textMapHash];
  reliquariesLoc["tr"][textMapHash] = trTextMapHash[textMapHash];
}

reliquaryJsonData.forEach((reliquaryData) => {
  reliquariesFileData += `\n  ${reliquaryData.id}: {\n  nameTextMapHash: ${reliquaryData.nameTextMapHash},`;
  addReliquariesLoc(reliquaryData.nameTextMapHash);
  if (reliquaryData.setId) {
    const affixId = reliquarySetMap[reliquaryData.setId]?.affixId;
    if (affixId) {
      const setNameTextMapHash = equipAffixMap[affixId]?.nameTextMapHash;
      if (setNameTextMapHash) {
        reliquariesFileData += `\n    setId: ${reliquaryData.setId},\n    setNameTextMapHash: ${setNameTextMapHash}`;
        addReliquariesLoc(setNameTextMapHash);
      } else {
        console.warn(
          `equip affix data missing, reliquaryId:${reliquaryData.id} reliquarySetId:${reliquaryData.setId} affixId:${affixId}`
        );
      }
    } else {
      console.warn(
        `reliquary set data missing, reliquaryId:${reliquaryData.id} reliquarySetId:${reliquaryData.setId}`
      );
    }
  }
  reliquariesFileData += "},";
});
reliquariesFileData += "};";
reliquariesLocFileData += JSON.stringify(reliquariesLoc, 2) + ";";

reliquarySetJsonData.forEach((setData) => {
  const affixId = reliquarySetMap[setData.setId]?.affixId;
  if (affixId) {
    const nameTextMapHash = equipAffixMap[affixId]?.nameTextMapHash;
    if (nameTextMapHash) {
      reliquarySetFileData += `\n  ${setData.setId}: {\n  nameTextMapHash: ${nameTextMapHash} },`;
    } else {
      console.warn(
        `equip affix data missing, reliquarySetId:${setData.setId} affixId:${affixId}`
      );
    }
  } else {
    console.warn(`reliquary set data missing, reliquarySetId:${setData.setId}`);
  }
});
reliquarySetFileData += "\n};";

fs.writeFileSync(resolve(dataBasePath, "reliquaries.ts"), reliquariesFileData);

fs.writeFileSync(
  resolve(dataBasePath, "reliquaries-loc.ts"),
  reliquariesLocFileData
);

fs.writeFileSync(
  resolve(dataBasePath, "reliquary-set.ts"),
  reliquarySetFileData
);

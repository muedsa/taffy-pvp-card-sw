const { resolve } = require("node:path");
const fs = require("node:fs");

const dataBasePath = resolve(__dirname, "..", "lib", "data");

// weapons

const weaponsJsonData = require("../../GenshenData/ExcelBinOutput/WeaponExcelConfigData.json");

let weaponFileData = `export type WeaponsProps = {
  [key: number]: {
    type: string;
    nameTextMapHash: number;
  };
};

export const weapons: WeaponsProps = {`;

weaponsJsonData.forEach(weanponData => {
  weaponFileData += `\n  ${weanponData.id}: {
    type: "${weanponData.weaponType}",
    nameTextMapHash: ${weanponData.nameTextMapHash}
  },`;
});

weaponFileData += "};";

fs.writeFileSync(
  resolve(dataBasePath, "weapons.ts"),
  weaponFileData
);

// reliquaries

const reliquaryJsonData = require("../../GenshenData/ExcelBinOutput/ReliquaryExcelConfigData.json");
const reliquarySetJsonData = require("../../GenshenData/ExcelBinOutput/ReliquarySetExcelConfigData.json");
const equipAffixJsonData = require("../../GenshenData/ExcelBinOutput/EquipAffixExcelConfigData.json");
const enTextMapHash = require("../../GenshenData/TextMap/TextMapEN.json");
const ruTextMapHash = require("../../GenshenData/TextMap/TextMapRU.json");
const viTextMapHash = require("../../GenshenData/TextMap/TextMapVI.json");
const thTextMapHash = require("../../GenshenData/TextMap/TextMapTH.json");
const ptTextMapHash = require("../../GenshenData/TextMap/TextMapPT.json");
const krTextMapHash = require("../../GenshenData/TextMap/TextMapKR.json");
const jpTextMapHash = require("../../GenshenData/TextMap/TextMapJP.json");
const idTextMapHash = require("../../GenshenData/TextMap/TextMapID.json");
const frTextMapHash = require("../../GenshenData/TextMap/TextMapFR.json");
const esTextMapHash = require("../../GenshenData/TextMap/TextMapES.json");
const deTextMapHash = require("../../GenshenData/TextMap/TextMapDE.json");
const chsTextMapHash = require("../../GenshenData/TextMap/TextMapCHS.json");
const chtTextMapHash = require("../../GenshenData/TextMap/TextMapCHS.json");
const itTextMapHash = require("../../GenshenData/TextMap/TextMapIT.json");
const trTextMapHash = require("../../GenshenData/TextMap/TextMapTR.json");

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

let reliquariesLocFileData = `
import { LocProps } from ".";


export const reliquariesLoc: LocProps = `;

let reliquarySetMap = {};
let equipAffixMap = {};

reliquarySetJsonData.forEach(set => {
  reliquarySetMap[set.setId] = {
    affixId: set.EquipAffixId
  }
});

equipAffixJsonData.forEach(affix => {
  equipAffixMap[affix.id] = {
    nameTextMapHash: affix.nameTextMapHash
  }
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
  reliquariesLoc['en'][textMapHash] = enTextMapHash[textMapHash];
  reliquariesLoc['ru'][textMapHash] = ruTextMapHash[textMapHash];
  reliquariesLoc['vi'][textMapHash] = viTextMapHash[textMapHash];
  reliquariesLoc['th'][textMapHash] = thTextMapHash[textMapHash];
  reliquariesLoc['pt'][textMapHash] = ptTextMapHash[textMapHash];
  reliquariesLoc['kr'][textMapHash] = krTextMapHash[textMapHash];
  reliquariesLoc['jp'][textMapHash] = jpTextMapHash[textMapHash];
  reliquariesLoc['id'][textMapHash] = idTextMapHash[textMapHash];
  reliquariesLoc['fr'][textMapHash] = frTextMapHash[textMapHash];
  reliquariesLoc['es'][textMapHash] = esTextMapHash[textMapHash];
  reliquariesLoc['de'][textMapHash] = deTextMapHash[textMapHash];
  reliquariesLoc['zh-TW'][textMapHash] = chsTextMapHash[textMapHash];
  reliquariesLoc['zh-CN'][textMapHash] = chtTextMapHash[textMapHash];
  reliquariesLoc['it'][textMapHash] = itTextMapHash[textMapHash];
  reliquariesLoc['tr'][textMapHash] = trTextMapHash[textMapHash];
}

reliquaryJsonData.forEach(reliquaryData => {
  reliquariesFileData += `\n  ${reliquaryData.id}: {\n  nameTextMapHash: ${reliquaryData.nameTextMapHash},`;
  addReliquariesLoc(reliquaryData.nameTextMapHash);
  if(reliquaryData.setId){
    const affixId = reliquarySetMap[reliquaryData.setId]?.affixId;
    if(affixId){
      const setNameTextMapHash = equipAffixMap[affixId]?.nameTextMapHash;
      if(setNameTextMapHash){
        reliquariesFileData += `\n    setId: ${reliquaryData.setId},\n    setNameTextMapHash: ${setNameTextMapHash}`;
        addReliquariesLoc(setNameTextMapHash);
      }else{
        console.warn(`equip affix data missing, reliquaryId:${reliquaryData.id} reliquarySetId:${reliquaryData.setId} affixId:${affixId}`);
      }
    }else{
      console.warn(`reliquary set data missing, reliquaryId:${reliquaryData.id} reliquarySetId:${reliquaryData.setId}`);
    }
  }
  reliquariesFileData += '},';
});
reliquariesFileData += "};";
reliquariesLocFileData += JSON.stringify(reliquariesLoc, 2) + ';';

fs.writeFileSync(
  resolve(dataBasePath, "reliquaries.ts"),
  reliquariesFileData
);

fs.writeFileSync(
  resolve(dataBasePath, "reliquaries-loc.ts"),
  reliquariesLocFileData
);
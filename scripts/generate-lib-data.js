const { resolve } = require("node:path");
const fs = require("node:fs");

const weaponsJsonData = require("../../GenshenData/ExcelBinOutput/WeaponExcelConfigData.json");

let fileData = `export type WeaponsProps = {
  [key: number]: {
    type: string;
    nameTextMapHash: number;
  };
};

export const weapons: WeaponsProps = {`;

weaponsJsonData.forEach((weanponData) => {
  fileData += `\n  ${weanponData.id}: {
    type: "${weanponData.weaponType}",
    nameTextMapHash: ${weanponData.nameTextMapHash}
  },`;
});

fileData += "};";

fs.writeFileSync(
  resolve(__dirname, "..", "lib", "data", "weapons.ts"),
  fileData
);

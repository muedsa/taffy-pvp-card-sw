const https = require("node:https");
const fs = require("node:fs");
const { resolve } = require("node:path");
const cp = require("node:child_process");
const { createCanvas } = require("@napi-rs/canvas");
const { generateCard, defaultCardConfig } = require("../dist");

const equipTypeMap = {
  EQUIP_BRACER: "flower",
  EQUIP_NECKLACE: "feather",
  EQUIP_SHOES: "sands",
  EQUIP_RING: "goblet",
  EQUIP_DRESS: "circlet",
};

function buildReliquaryInfo(item) {
  let info;
  if (item) {
    const reliquarySubstats = item.flat.reliquarySubstats;
    const subProps = Array.isArray(reliquarySubstats)
      ? reliquarySubstats.map((subStats) => {
          return {
            id: subStats.appendPropId,
            value: subStats.statValue,
          };
        })
      : [];
    info = {
      id: item.itemId,
      level: item.reliquary.level,
      mainProp: {
        id: item.flat.reliquaryMainstat.mainPropId,
        value: item.flat.reliquaryMainstat.statValue,
      },
      subProps: subProps,
      type: equipTypeMap[item.flat.equipType],
    };
  }
  return info;
}

function buildWeaponInfo(item) {
  let info;
  if (item) {
    info = {
      id: item.itemId,
      level: item.weapon.level,
      promoteLevel: item.weapon.promoteLevel,
      mainProp: {
        id: item.flat.weaponStats[0].appendPropId,
        value: item.flat.weaponStats[0].statValue,
      },
      subProp:
        item.flat.weaponStats.length > 1
          ? {
              id: item.flat.weaponStats[1].appendPropId,
              value: item.flat.weaponStats[1].statValue,
            }
          : null,
    };
  }
  return info;
}

function buildCharacterData(uid, playerInfo, avatarInfo) {
  const equipMap = {};
  avatarInfo.equipList.forEach((item) => {
    if (item.flat.itemType === "ITEM_RELIQUARY") {
      equipMap[equipTypeMap[item.flat.equipType]] = item;
    } else if (item.flat.itemType === "ITEM_WEAPON") {
      equipMap["weapon"] = item;
    }
  });
  const { flower, feather, sands, goblet, circlet, weapon } = equipMap;

  return {
    owner: {
      uid: uid,
      name: playerInfo.nickname,
    },
    id: avatarInfo.avatarId,
    level: Number.parseInt(avatarInfo.propMap["4001"].val),
    talent: Array.isArray(avatarInfo.talentIdList)
      ? avatarInfo.talentIdList.length
      : 0,
    skills: Object.keys(avatarInfo.skillLevelMap).map(
      (key) => avatarInfo.skillLevelMap[key]
    ),
    fightPropMap: avatarInfo.fightPropMap,
    reliquaries: {
      flower: buildReliquaryInfo(flower),
      feather: buildReliquaryInfo(feather),
      sands: buildReliquaryInfo(sands),
      goblet: buildReliquaryInfo(goblet),
      circlet: buildReliquaryInfo(circlet),
    },
    weapon: buildWeaponInfo(weapon),
  };
}

https
  .get("https://enka.network/api/uid/101745173", (response) => {
    let responseBody = "";
    response.on("data", (data) => {
      responseBody += data;
    });
    response.on("end", () => {
      const { uid, playerInfo, avatarInfoList } = JSON.parse(responseBody);
      const characterDataList = avatarInfoList.map((avatarInfo) =>
        buildCharacterData(uid, playerInfo, avatarInfo)
      );
      if (characterDataList.length > 0) {
        const cardWidht = defaultCardConfig.width;
        const cardHeight = defaultCardConfig.height;
        console.log(`query character total number: ${avatarInfoList.length}`);
        Promise.all(characterDataList.map((i) => generateCard(i)))
          .then((canvasArr) => {
            const rowNum = Math.min(canvasArr.length, 4);
            const colNum = Math.ceil(canvasArr.length / rowNum);
            console.log(`Card ${rowNum} X ${colNum}`);
            const width = rowNum * cardWidht;
            const height = colNum * cardHeight;
            const canvas = createCanvas(width, height);
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, width, height);
            canvasArr.forEach((cardCanvas, index) => {
              const col = index % rowNum;
              const row = Math.floor(index / rowNum);
              const x = col * cardWidht;
              const y = row * cardHeight;
              ctx.drawImage(cardCanvas, x, y);
            });
            fs.writeFileSync(
              resolve(__dirname, "test.png"),
              canvas.toBuffer("image/png")
            );
            const url = canvas.toDataURL("image/png");
            cp.exec("clip").stdin.end(url);
            console.log("clip!");
          })
          .catch((error) => {
            console.log(JSON.stringify(characterDataList, null, "\t"));
            console.error(error);
          });
      }
    });
  })
  .on("error", (error) => {
    console.error(error);
  });

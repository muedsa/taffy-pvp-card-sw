"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCharacterData = void 0;
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
            subProp: item.flat.weaponStats.length > 1
                ? {
                    id: item.flat.weaponStats[1].appendPropId,
                    value: item.flat.weaponStats[1].statValue,
                }
                : null,
        };
    }
    return info;
}
function parseCharacterData(uid, playerInfo, avatarInfo) {
    const equipMap = {};
    avatarInfo.equipList.forEach((item) => {
        if (item.flat.itemType === "ITEM_RELIQUARY") {
            equipMap[equipTypeMap[item.flat.equipType]] =
                item;
        }
        else if (item.flat.itemType === "ITEM_WEAPON") {
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
        skills: Object.keys(avatarInfo.skillLevelMap).map((key) => avatarInfo.skillLevelMap[key]),
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
exports.parseCharacterData = parseCharacterData;

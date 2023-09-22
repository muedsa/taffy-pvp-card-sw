const equipTypeMap = {
  EQUIP_BRACER: "flower",
  EQUIP_NECKLACE: "feather",
  EQUIP_SHOES: "sands",
  EQUIP_RING: "goblet",
  EQUIP_DRESS: "circlet",
} as const;

type ReliquaryInfoBase = {
  flat: {
    itemType: "ITEM_RELIQUARY";
    reliquarySubstats: Array<{
      appendPropId: number;
      statValue: number;
    }>;
    reliquaryMainstat: {
      mainPropId: number;
      statValue: number;
    };
  };
  itemId: number;
  reliquary: {
    level: number;
  };
  flower: ReliquaryInfo;
};

type ReliquaryInfo = ReliquaryInfoBase & {
  flat: { equipType: (typeof equipTypeMap)[keyof typeof equipTypeMap] };
};

type ReliquaryInfoMeta = ReliquaryInfoBase & {
  flat: { equipType: keyof typeof equipTypeMap };
};

type WeaponInfo = {
  flat: {
    itemType: "ITEM_WEAPON";
    weaponStats: Array<{
      appendPropId: number;
      statValue: number;
    }>;
  };
  itemId: number;
  weapon: {
    level: number;
    promoteLevel: number;
  };
};

type WeaponInfoMeta = WeaponInfo;

export type PlayerInfo = {
  nickname: string;
};

export type AvatarInfo = {
  avatarId: number;
  propMap: {
    "4001": {
      val: string;
    };
  };
  talentIdList: Array<number>;
  skillLevelMap: {
    [key: string]: number;
  };
  fightPropMap: {
    [key: string]: number;
  };
  equipList: Array<ReliquaryInfoMeta | WeaponInfoMeta>;
};

function buildReliquaryInfo(item: ReliquaryInfoMeta) {
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

function buildWeaponInfo(item: WeaponInfo) {
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

export function parseCharacterData(
  uid: number,
  playerInfo: PlayerInfo,
  avatarInfo: AvatarInfo,
) {
  type EquipMap = Record<
    (typeof equipTypeMap)[keyof typeof equipTypeMap],
    ReliquaryInfoMeta
  > & {
    weapon: WeaponInfoMeta;
  };
  const equipMap: EquipMap = {} as EquipMap;
  avatarInfo.equipList.forEach((item) => {
    if ((item as ReliquaryInfoMeta).flat.itemType === "ITEM_RELIQUARY") {
      equipMap[equipTypeMap[(item as ReliquaryInfoMeta).flat.equipType]] =
        item as ReliquaryInfoMeta;
    } else if (item.flat.itemType === "ITEM_WEAPON") {
      equipMap["weapon"] = item as WeaponInfoMeta;
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
      (key) => avatarInfo.skillLevelMap[key],
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

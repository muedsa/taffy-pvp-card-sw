declare const equipTypeMap: {
    readonly EQUIP_BRACER: "flower";
    readonly EQUIP_NECKLACE: "feather";
    readonly EQUIP_SHOES: "sands";
    readonly EQUIP_RING: "goblet";
    readonly EQUIP_DRESS: "circlet";
};
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
    flat: {
        equipType: (typeof equipTypeMap)[keyof typeof equipTypeMap];
    };
};
type ReliquaryInfoMeta = ReliquaryInfoBase & {
    flat: {
        equipType: keyof typeof equipTypeMap;
    };
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
type PlayerInfo = {
    nickname: string;
};
type AvatarInfo = {
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
export declare function parseCharacterData(uid: string, playerInfo: PlayerInfo, avatarInfo: AvatarInfo): {
    owner: {
        uid: string;
        name: string;
    };
    id: number;
    level: number;
    talent: number;
    skills: number[];
    fightPropMap: {
        [key: string]: number;
    };
    reliquaries: {
        flower: {
            id: number;
            level: number;
            mainProp: {
                id: number;
                value: number;
            };
            subProps: {
                id: number;
                value: number;
            }[];
            type: "flower" | "feather" | "sands" | "goblet" | "circlet";
        } | undefined;
        feather: {
            id: number;
            level: number;
            mainProp: {
                id: number;
                value: number;
            };
            subProps: {
                id: number;
                value: number;
            }[];
            type: "flower" | "feather" | "sands" | "goblet" | "circlet";
        } | undefined;
        sands: {
            id: number;
            level: number;
            mainProp: {
                id: number;
                value: number;
            };
            subProps: {
                id: number;
                value: number;
            }[];
            type: "flower" | "feather" | "sands" | "goblet" | "circlet";
        } | undefined;
        goblet: {
            id: number;
            level: number;
            mainProp: {
                id: number;
                value: number;
            };
            subProps: {
                id: number;
                value: number;
            }[];
            type: "flower" | "feather" | "sands" | "goblet" | "circlet";
        } | undefined;
        circlet: {
            id: number;
            level: number;
            mainProp: {
                id: number;
                value: number;
            };
            subProps: {
                id: number;
                value: number;
            }[];
            type: "flower" | "feather" | "sands" | "goblet" | "circlet";
        } | undefined;
    };
    weapon: {
        id: number;
        level: number;
        promoteLevel: number;
        mainProp: {
            id: number;
            value: number;
        };
        subProp: {
            id: number;
            value: number;
        } | null;
    } | undefined;
};
export {};

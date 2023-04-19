export interface Character {
    id: number;
    owner: Owner;
    level: number;
    talent: number;
    skills: number[];
    fightPropMap: FightPropMap;
    weapon: Weapon;
    reliquaries: ReliquarySlots;
}
export interface Owner {
    uid?: number;
    name?: string;
}
export interface FightPropMap {
    [key: number]: number;
}
export interface Weapon {
    id: number;
    level: number;
    promoteLevel: number;
    mainProp: FightProp;
    subProp?: FightProp;
}
export interface ReliquarySlots {
    flower?: Reliquary;
    feather?: Reliquary;
    sands?: Reliquary;
    goblet?: Reliquary;
    circlet?: Reliquary;
}
export interface Reliquary {
    id: number;
    level: number;
    mainProp: FightProp;
    subProps: FightProp[];
    type: "flower" | "feather" | "sands" | "goblet" | "circlet";
    score?: number;
}
export interface FightProp {
    id: "FIGHT_PROP_BASE_ATTACK" | "FIGHT_PROP_HP" | "FIGHT_PROP_ATTACK" | "FIGHT_PROP_DEFENSE" | "FIGHT_PROP_HP_PERCENT" | "FIGHT_PROP_ATTACK_PERCENT" | "FIGHT_PROP_DEFENSE_PERCENT" | "FIGHT_PROP_CRITICAL" | "FIGHT_PROP_CRITICAL_HURT" | "FIGHT_PROP_CHARGE_EFFICIENCY" | "FIGHT_PROP_HEAL_ADD" | "FIGHT_PROP_ELEMENT_MASTERY" | "FIGHT_PROP_PHYSICAL_ADD_HURT" | "FIGHT_PROP_FIRE_ADD_HURT" | "FIGHT_PROP_ELEC_ADD_HURT" | "FIGHT_PROP_WATER_ADD_HURT" | "FIGHT_PROP_WIND_ADD_HURT" | "FIGHT_PROP_ICE_ADD_HURT" | "FIGHT_PROP_ROCK_ADD_HURT" | "FIGHT_PROP_GRASS_ADD_HURT";
    value: number;
}
export interface CardConfig {
    width: number;
    height: number;
    lang: "en" | "ru" | "vi" | "th" | "pt" | "kr" | "jp" | "id" | "fr" | "es" | "de" | "zh-CN" | "zh-TW" | "it" | "tr";
    fontFamily: string;
    specialFontFamilies?: CardFontConfig;
    customeFonts?: CustomeFonts[];
}
export interface CustomeFonts {
    fontPath: string;
    fontFamily: string;
}
export interface CardFontConfig {
    ownerTextFontFamily?: string;
    characterLevelTextFontFamily?: string;
    characterSkillsTextFontFamily?: string;
    characterTalentTextFontFamily?: string;
    characterPropTextFontFamily?: string;
    reliquaryMainPropTextFontFamily?: string;
    reliquarySubPropTextFontFamily?: string;
    reliquarySetTextFontFamily?: string;
    weaponNameTextFontFamily?: string;
    weaponPropTextFontFamily?: string;
}

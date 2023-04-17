"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weaponImagePaths = exports.reliquaryPropImagePaths = exports.characterPropImagePaths = void 0;
const elementPathPerfix = "/image/element/";
const propPathPerfix = "/image/prop/";
const weaponPathPerfix = "/image/weapon/";
exports.characterPropImagePaths = {
    2000: propPathPerfix + "hp.png",
    2001: propPathPerfix + "attack.png",
    2002: propPathPerfix + "defense.png",
    20: propPathPerfix + "critical_hit_rate.png",
    22: propPathPerfix + "critical_hit_damage.png",
    23: propPathPerfix + "energy_recharge.png",
    28: propPathPerfix + "elemental_mastery.png",
    40: elementPathPerfix + "fire.png",
    41: elementPathPerfix + "electric.png",
    42: elementPathPerfix + "water.png",
    43: elementPathPerfix + "grass.png",
    44: elementPathPerfix + "wind.png",
    45: elementPathPerfix + "rock.png",
    46: elementPathPerfix + "ice.png",
};
exports.reliquaryPropImagePaths = {
    FIGHT_PROP_BASE_ATTACK: propPathPerfix + "attack.png",
    FIGHT_PROP_HP: propPathPerfix + "hp.png",
    FIGHT_PROP_ATTACK: propPathPerfix + "attack.png",
    FIGHT_PROP_DEFENSE: propPathPerfix + "defense.png",
    FIGHT_PROP_HP_PERCENT: propPathPerfix + "hp.png",
    FIGHT_PROP_ATTACK_PERCENT: propPathPerfix + "attack.png",
    FIGHT_PROP_DEFENSE_PERCENT: propPathPerfix + "defense.png",
    FIGHT_PROP_CRITICAL: propPathPerfix + "critical_hit_rate.png",
    FIGHT_PROP_CRITICAL_HURT: propPathPerfix + "critical_hit_damage.png",
    FIGHT_PROP_CHARGE_EFFICIENCY: propPathPerfix + "energy_recharge.png",
    FIGHT_PROP_HEAL_ADD: propPathPerfix + "heal_bonus.png",
    FIGHT_PROP_ELEMENT_MASTERY: propPathPerfix + "elemental_mastery.png",
    FIGHT_PROP_PHYSICAL_ADD_HURT: propPathPerfix + "physical_attack.png",
    FIGHT_PROP_FIRE_ADD_HURT: elementPathPerfix + "fire.png",
    FIGHT_PROP_ELEC_ADD_HURT: elementPathPerfix + "electric.png",
    FIGHT_PROP_WATER_ADD_HURT: elementPathPerfix + "water.png",
    FIGHT_PROP_WIND_ADD_HURT: elementPathPerfix + "grass.png",
    FIGHT_PROP_ICE_ADD_HURT: elementPathPerfix + "wind.png",
    FIGHT_PROP_ROCK_ADD_HURT: elementPathPerfix + "rock.png",
    FIGHT_PROP_GRASS_ADD_HURT: elementPathPerfix + "ice.png",
};
exports.weaponImagePaths = {
    WEAPON_SWORD_ONE_HAND: weaponPathPerfix + "sword.png",
    WEAPON_CLAYMORE: weaponPathPerfix + "great_sword.png",
    WEAPON_POLE: weaponPathPerfix + "polearm.png",
    WEAPON_CATALYST: weaponPathPerfix + "catalyst.png",
    WEAPON_BOW: weaponPathPerfix + "bow.png",
};

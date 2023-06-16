import { NumberStringProps, StringStringProps } from "./types";

const elementPathPrefix = "/image/element/";
const propPathPrefix = "/image/prop/";
const weaponPathPrefix = "/image/weapon/";

export const characterPropImagePaths: NumberStringProps = {
  2000: propPathPrefix + "hp.png",
  2001: propPathPrefix + "attack.png",
  2002: propPathPrefix + "defense.png",
  20: propPathPrefix + "critical_hit_rate.png",
  22: propPathPrefix + "critical_hit_damage.png",
  23: propPathPrefix + "energy_recharge.png",
  28: propPathPrefix + "elemental_mastery.png",
  40: elementPathPrefix + "fire.png",
  41: elementPathPrefix + "electric.png",
  42: elementPathPrefix + "water.png",
  43: elementPathPrefix + "grass.png",
  44: elementPathPrefix + "wind.png",
  45: elementPathPrefix + "rock.png",
  46: elementPathPrefix + "ice.png",
};

export const reliquaryPropImagePaths: StringStringProps = {
  FIGHT_PROP_BASE_ATTACK: propPathPrefix + "attack.png",
  FIGHT_PROP_HP: propPathPrefix + "hp.png",
  FIGHT_PROP_ATTACK: propPathPrefix + "attack.png",
  FIGHT_PROP_DEFENSE: propPathPrefix + "defense.png",
  FIGHT_PROP_HP_PERCENT: propPathPrefix + "hp.png",
  FIGHT_PROP_ATTACK_PERCENT: propPathPrefix + "attack.png",
  FIGHT_PROP_DEFENSE_PERCENT: propPathPrefix + "defense.png",
  FIGHT_PROP_CRITICAL: propPathPrefix + "critical_hit_rate.png",
  FIGHT_PROP_CRITICAL_HURT: propPathPrefix + "critical_hit_damage.png",
  FIGHT_PROP_CHARGE_EFFICIENCY: propPathPrefix + "energy_recharge.png",
  FIGHT_PROP_HEAL_ADD: propPathPrefix + "heal_bonus.png",
  FIGHT_PROP_ELEMENT_MASTERY: propPathPrefix + "elemental_mastery.png",
  FIGHT_PROP_PHYSICAL_ADD_HURT: propPathPrefix + "physical_attack.png",
  FIGHT_PROP_FIRE_ADD_HURT: elementPathPrefix + "fire.png",
  FIGHT_PROP_ELEC_ADD_HURT: elementPathPrefix + "electric.png",
  FIGHT_PROP_WATER_ADD_HURT: elementPathPrefix + "water.png",
  FIGHT_PROP_WIND_ADD_HURT: elementPathPrefix + "wind.png",
  FIGHT_PROP_ICE_ADD_HURT: elementPathPrefix + "ice.png",
  FIGHT_PROP_ROCK_ADD_HURT: elementPathPrefix + "rock.png",
  FIGHT_PROP_GRASS_ADD_HURT: elementPathPrefix + "grass.png",
};

export const weaponImagePaths: StringStringProps = {
  WEAPON_SWORD_ONE_HAND: weaponPathPrefix + "sword.png",
  WEAPON_CLAYMORE: weaponPathPrefix + "great_sword.png",
  WEAPON_POLE: weaponPathPrefix + "polearm.png",
  WEAPON_CATALYST: weaponPathPrefix + "catalyst.png",
  WEAPON_BOW: weaponPathPrefix + "bow.png",
};

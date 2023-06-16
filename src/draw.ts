import { SKRSContext2D } from "@napi-rs/canvas";
import {
  getCharacterImagePath,
  getCharacterPropImagePath,
  getLoc,
  getCharacterPropLoc,
  getCharacterMasterElementDamageProp,
  getReliquaryImagePath,
  getReliquaryPropImagePath,
  getCharacterPropText,
  getFightPropText,
  getWeaponImagePath,
  getWeaponName,
  getReliquarySetId,
  getReliquarySetName,
} from "./util";
import {
  CardConfig,
  Character,
  FightPropMap,
  ReliquarySlots,
  Reliquary,
  FightProp,
  Weapon,
} from "./types";
import {
  drawText,
  loadImageAndDraw,
  loadImageAndOffsetDraw,
} from "./canvasUtil";
import * as size from "./size";

export async function drawCharacter(
  ctx: SKRSContext2D,
  config: CardConfig,
  character: Character
) {
  const characterImagePath = getCharacterImagePath(character.id);
  const skillsText = character.skills.join("-");

  // character image
  await loadImageAndDraw(
    ctx,
    characterImagePath,
    size.characterImageX,
    size.characterImageY,
    size.characterImageSize,
    size.characterImageSize
  );

  // owner
  if (character.owner) {
    // uid
    if (character.owner.uid) {
      drawText(
        ctx,
        "UID:" + character.owner.uid,
        size.ownerTextX,
        size.ownerTextY,
        size.ownerTextFontSize,
        size.ownerTextFontColor,
        config.specialFontFamilies?.ownerTextFontFamily || config.fontFamily
      );
    }
    // name
    if (character.owner.name) {
      drawText(
        ctx,
        character.owner.name,
        size.ownerTextX,
        character.owner.uid
          ? size.ownerTextY + size.ownerTextFontSize + size.contentMargin
          : size.ownerTextY,
        size.ownerTextFontSize,
        size.ownerTextFontColor,
        config.specialFontFamilies?.ownerTextFontFamily || config.fontFamily
      );
    }
  }

  // level
  drawText(
    ctx,
    getLoc("level", config.lang) + " " + character.level.toFixed(0),
    size.characterLevelTextEndX,
    size.characterLevelTextEndY,
    size.characterLevelTextFontSize,
    size.characterLevelTextFontColor,
    config.specialFontFamilies?.characterLevelTextFontFamily ||
      config.fontFamily,
    "right"
  );

  // skill level
  drawText(
    ctx,
    skillsText,
    size.characterSkillsTextX,
    size.characterSkillsTextY,
    size.characterSkillsTextFontSize,
    size.characterSkillsTextFontColor,
    config.specialFontFamilies?.characterSkillsTextFontFamily ||
      config.fontFamily
  );

  // talent
  if (character.talent > 0) {
    drawText(
      ctx,
      character.talent.toFixed(0) + "◈",
      size.characterTalentTextEndX,
      size.characterTalentTextEndY,
      size.characterTalentTextFontSize,
      size.characterTalentTextFontColor,
      config.specialFontFamilies?.characterTalentTextFontFamily ||
        config.fontFamily,
      "right"
    );
  }

  return;
}

export async function drawCharacterProps(
  ctx: SKRSContext2D,
  config: CardConfig,
  character: Character
) {
  const baseProps = [2000, 2001, 2002, 20, 22, 23, 28];
  for (let i = 0; i < baseProps.length; i++) {
    await drawCharacterProp(
      ctx,
      config,
      character.fightPropMap,
      baseProps[i],
      i
    );
  }
  await drawCharacterProp(
    ctx,
    config,
    character.fightPropMap,
    getCharacterMasterElementDamageProp(character.id),
    baseProps.length
  );
  return;
}

async function drawCharacterProp(
  ctx: SKRSContext2D,
  config: CardConfig,
  fightPropMap: FightPropMap,
  propId: number,
  propPosition: number
) {
  const imageX = size.characterPropImageX;
  const imageY =
    size.characterPropImageY +
    size.characterPropHeight * propPosition +
    size.contentMargin * propPosition;
  const textX = size.characterPropTextX;
  const textY =
    size.characterPropTextY +
    size.characterPropHeight * propPosition +
    size.contentMargin * propPosition;
  const textEndX = size.characterPropTextEndX;
  const textEndY =
    size.characterPropTextEndY +
    size.characterPropHeight * propPosition +
    size.contentMargin * propPosition;

  // prop image
  await loadImageAndDraw(
    ctx,
    getCharacterPropImagePath(propId),
    imageX,
    imageY,
    size.characterPropImageSize,
    size.characterPropImageSize
  );

  // prop text
  const propLabel = getCharacterPropLoc(propId, config.lang);
  const propValue = getCharacterPropText(propId, fightPropMap[propId]);
  drawText(
    ctx,
    propLabel,
    textX,
    textY,
    size.characterPropTextFontSize,
    size.characterPropTextFontColor,
    config.specialFontFamilies?.characterPropTextFontFamily || config.fontFamily
  );
  drawText(
    ctx,
    propValue,
    textEndX,
    textEndY,
    size.characterPropTextFontSize,
    size.characterPropTextFontColor,
    config.specialFontFamilies?.characterPropTextFontFamily ||
      config.fontFamily,
    "right"
  );
  return;
}

export async function drawReliquaries(
  ctx: SKRSContext2D,
  config: CardConfig,
  reliquaries: ReliquarySlots,
  avatarId: number
) {
  let position = 0;
  const setNumMap: Map<number, number> = new Map();
  if (reliquaries.flower) {
    await drawReliquary(ctx, config, reliquaries.flower, avatarId, position++);
    countSetNum(setNumMap, reliquaries.flower.id);
  }
  if (reliquaries.feather) {
    await drawReliquary(ctx, config, reliquaries.feather, avatarId, position++);
    countSetNum(setNumMap, reliquaries.feather.id);
  }
  if (reliquaries.sands) {
    await drawReliquary(ctx, config, reliquaries.sands, avatarId, position++);
    countSetNum(setNumMap, reliquaries.sands.id);
  }
  if (reliquaries.goblet) {
    await drawReliquary(ctx, config, reliquaries.goblet, avatarId, position++);
    countSetNum(setNumMap, reliquaries.goblet.id);
  }
  if (reliquaries.circlet) {
    await drawReliquary(ctx, config, reliquaries.circlet, avatarId, position++);
    countSetNum(setNumMap, reliquaries.circlet.id);
  }

  // set info
  let setIndex = 0;
  setNumMap.forEach((num, setId) => {
    if (num >= 2) {
      const setNum = num >= 4 ? 4 : 2;
      const text =
        getReliquarySetName(setId, config.lang) + " [" + setNum + "]";
      drawText(
        ctx,
        text,
        size.reliquarySetEndX,
        size.reliquarySetEndY -
          size.contentMargin * setIndex -
          size.reliquarySetTextFontSize * setIndex,
        size.reliquarySetTextFontSize,
        size.reliquarySetTextFontColor,
        config.specialFontFamilies?.reliquarySetTextFontFamily ||
          config.fontFamily,
        "right"
      );
      setIndex++;
    }
  });

  return;
}

async function drawReliquary(
  ctx: SKRSContext2D,
  config: CardConfig,
  reliquary: Reliquary,
  avatarId: number,
  position: number
) {
  // reliquary image
  const imageX = size.reliquaryImageXList[position];
  const imageY = size.reliquaryImageYList[position];
  const imageOffsetX = size.reliquaryImageSize / 3;
  const imageOffsetY = 0;
  ctx.save();
  ctx.strokeStyle = size.globalFontColor;
  ctx.lineWidth = 2;
  ctx.roundRect(
    imageX,
    imageY,
    size.reliquaryImageSize,
    size.reliquaryImageSize,
    [8, 8, 8, 8]
  );
  ctx.clip();
  await loadImageAndOffsetDraw(
    ctx,
    getReliquaryImagePath(reliquary.type, avatarId),
    imageOffsetX,
    imageOffsetY,
    imageX,
    imageY,
    size.reliquaryImageSize,
    size.reliquaryImageSize
  );

  // main prop image
  const mainPropImageX =
    imageX + size.reliquaryImageSize - size.reliquaryMainPropImageSize - 1;
  const mainPropImageY = imageY + 1;
  await loadImageAndDraw(
    ctx,
    getReliquaryPropImagePath(reliquary.mainProp.id),
    mainPropImageX,
    mainPropImageY,
    size.reliquaryMainPropImageSize,
    size.reliquaryMainPropImageSize
  );

  // main prop text
  const mainPropTextEndX = imageX + size.reliquaryImageSize - 2;
  const mainPropTextEndY =
    imageY +
    size.reliquaryImageSize -
    size.reliquaryMainPropTextFontSize -
    size.contentMargin;
  drawText(
    ctx,
    getFightPropText(reliquary.mainProp),
    mainPropTextEndX,
    mainPropTextEndY,
    size.reliquaryMainPropTextFontSize,
    size.reliquaryMainPropTextFontColor,
    config.specialFontFamilies?.reliquaryMainPropTextFontFamily ||
      config.fontFamily,
    "right"
  );
  ctx.stroke();
  ctx.restore();

  // sub prop
  for (let i = 0; i < reliquary.subProps.length; i++) {
    await drawReliquarySubProp(
      ctx,
      config,
      reliquary.subProps[i],
      i,
      imageX,
      imageY
    );
  }
  return;
}

async function drawReliquarySubProp(
  ctx: SKRSContext2D,
  config: CardConfig,
  prop: FightProp,
  position: number,
  x: number,
  y: number
) {
  // sub prop image
  const imageX = x + size.reliquarySubPropRXList[position];
  const imageY =
    y +
    size.reliquarySubPropRYList[position] +
    (size.reliquarySubPropHeight - size.reliquarySubPropImageSize) / 2;
  await loadImageAndDraw(
    ctx,
    getReliquaryPropImagePath(prop.id),
    imageX,
    imageY,
    size.reliquarySubPropImageSize,
    size.reliquarySubPropImageSize
  );

  // sub prop text
  const textX = imageX + size.reliquarySubPropImageSize + size.contentMargin;
  const textY = imageY;
  drawText(
    ctx,
    getFightPropText(prop),
    textX,
    textY,
    size.reliquarySubPropTextFontSize,
    size.reliquarySubPropTextFontColor,
    config.specialFontFamilies?.reliquarySubPropTextFontFamily ||
      config.fontFamily
  );
  return;
}

function countSetNum(setNumMap: Map<number, number>, reliquaryId: number) {
  const setId = getReliquarySetId(reliquaryId);
  if (setId) {
    if (setNumMap.has(setId)) {
      setNumMap.set(setId, (setNumMap.get(setId) || 1) + 1);
    } else {
      setNumMap.set(setId, 1);
    }
  }
  return;
}

export async function drawWeapon(
  ctx: SKRSContext2D,
  config: CardConfig,
  weapon: Weapon
) {
  // weapon name
  drawText(
    ctx,
    getWeaponName(weapon.id, config.lang),
    size.weaponNameTextEndX,
    size.weaponNameTextEndY,
    size.weaponNameTextFontSize,
    size.weaponNameTextFontColor,
    config.specialFontFamilies?.weaponNameTextFontFamily || config.fontFamily,
    "right"
  );

  // weapon image
  ctx.save();
  ctx.strokeStyle = size.globalFontColor;
  ctx.lineWidth = 2;
  ctx.roundRect(
    size.weaponImageX,
    size.weaponImageY,
    size.weaponImageSize,
    size.weaponImageSize,
    [8, 8, 8, 8]
  );
  ctx.clip();
  await loadImageAndDraw(
    ctx,
    getWeaponImagePath(weapon.id),
    size.weaponImageX,
    size.weaponImageY,
    size.weaponImageSize,
    size.weaponImageSize
  );
  ctx.stroke();
  ctx.restore();

  // weapon main prop image
  await loadImageAndDraw(
    ctx,
    getReliquaryPropImagePath(weapon.mainProp.id),
    size.weaponMainPropImageX,
    size.weaponMainPropImageY,
    size.weaponPropImageSize,
    size.weaponPropImageSize
  );
  // weapon main prop text
  drawText(
    ctx,
    getFightPropText(weapon.mainProp),
    size.weaponMainPropTextEndX,
    size.weaponMainPropTextEndY,
    size.weaponPropTextFontSize,
    size.weaponPropTextFontColor,
    config.specialFontFamilies?.weaponPropTextFontFamily || config.fontFamily,
    "right"
  );

  if (weapon.subProp) {
    // weapon sub prop image
    await loadImageAndDraw(
      ctx,
      getReliquaryPropImagePath(weapon.subProp.id),
      size.weaponSubPropImageX,
      size.weaponSubPropImageY,
      size.weaponPropImageSize,
      size.weaponPropImageSize
    );
    // weapon sub prop text
    drawText(
      ctx,
      getFightPropText(weapon.subProp),
      size.weaponSubPropTextEndX,
      size.weaponSubPropTextEndY,
      size.weaponPropTextFontSize,
      size.weaponPropTextFontColor,
      config.specialFontFamilies?.weaponPropTextFontFamily || config.fontFamily,
      "right"
    );
  }

  return;
}

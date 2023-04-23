import {
  Canvas,
  SKRSContext2D,
  GlobalFonts,
  createCanvas,
} from "@napi-rs/canvas";
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
  getBgColor,
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
  getAssetFontPath,
} from "./util";
import {
  loadImageAndDraw,
  loadImageAndOffsetDraw,
  drawText,
} from "./canvas-util";

const cardPadding = 5;
const contentMragin = 3;

const globalFontColor = "#ffffff";

const characterImageSize = 256;
const characterImageX = 0 + cardPadding;
const characterImageY = 0 + cardPadding;

const ownerTextFontSize = 16;
const ownerTextFontColor = globalFontColor;
const ownerTextX = characterImageX + contentMragin;
const ownerTextY = characterImageY + contentMragin;

const characterLevelTextFontSize = 16;
const characterLevelTextFontColor = globalFontColor;
const characterLevelTextEndX =
  characterImageX + characterImageSize - contentMragin;
const characterLevelTextEndY = characterImageY + contentMragin;

const characterSkillsTextFontSize = 16;
const characterSkillsTextFontColor = globalFontColor;
const characterSkillsTextX = characterImageX + contentMragin;
const characterSkillsTextY =
  characterImageY +
  characterImageSize -
  characterSkillsTextFontSize -
  contentMragin;
characterImageY + characterImageSize - characterSkillsTextFontSize - 3;

const characterTalentTextFontSize = 16;
const characterTalentTextFontColor = globalFontColor;
const characterTalentTextEndX = characterImageX + characterImageSize - 3;
const characterTalentTextEndY =
  characterImageY + characterImageSize - characterSkillsTextFontSize - 3;

const characterPropWidth = 156;
const characterPropHeigth = 12;
const characterPropImageSize = characterPropHeigth;
const characterPropImageX =
  characterImageX + characterImageSize + contentMragin;
const characterPropImageY = characterImageY;
const characterPropTextX =
  characterPropImageX + characterPropImageSize + contentMragin;
const characterPropTextY = characterImageY;
const characterPropTextEndX =
  cardPadding + characterImageSize + contentMragin + characterPropWidth;
const characterPropTextEndY = characterPropTextY;
const characterPropTextFontSize = characterPropHeigth;
const characterPropTextFontColor = globalFontColor;

const reliquaryInfoHeight = 64 + contentMragin;
const reliquaryImageSize = reliquaryInfoHeight;
const reliquaryInfoWidth =
  (characterImageSize + contentMragin + characterPropWidth) / 2;
const reliquaryX = characterImageX;
const reliquaryY = characterImageY + characterImageSize + contentMragin;

const reliquaryImageXList = [
  reliquaryX,
  reliquaryX + reliquaryInfoWidth + contentMragin,
  reliquaryX,
  reliquaryX + reliquaryInfoWidth + contentMragin,
  reliquaryX,
];
const reliquaryImageYList = [
  reliquaryY,
  reliquaryY,
  reliquaryY + reliquaryInfoHeight + contentMragin,
  reliquaryY + reliquaryInfoHeight + contentMragin,
  reliquaryY + reliquaryInfoHeight * 2 + contentMragin * 2,
];

const reliquaryMainPropImageSize = reliquaryImageSize / 2 - 2;

const reliquaryMainPropTextFontSize = 14;
const reliquaryMainPropTextFontColor = globalFontColor;

const reliquarySubPropWidth =
  (reliquaryInfoWidth - reliquaryImageSize - contentMragin) / 2;
const reliquarySubPropHeigth = (reliquaryInfoHeight - contentMragin) / 2;
const reliquarySubPropImageSize = reliquarySubPropHeigth - contentMragin * 4;
const reliquarySubPropRX = reliquaryImageSize;
const reliquarySubPropRY = 0;
const reliquarySubPropRXList = [
  reliquarySubPropRX,
  reliquarySubPropRX + reliquarySubPropWidth,
  reliquarySubPropRX,
  reliquarySubPropRX + reliquarySubPropWidth,
];
const reliquarySubPropRYList = [
  reliquarySubPropRY,
  reliquarySubPropRY,
  reliquarySubPropRY + reliquarySubPropHeigth + contentMragin,
  reliquarySubPropRY + reliquarySubPropHeigth + contentMragin,
];
const reliquarySubPropTextFontSize = reliquarySubPropImageSize - contentMragin;
const reliquarySubPropTextFontColor = globalFontColor;

const reliquarySetTextFontSize = reliquarySubPropImageSize - contentMragin;
const reliquarySetEndX =
  cardPadding + characterImageSize + contentMragin + characterPropWidth;
const reliquarySetEndY =
  cardPadding +
  characterImageSize +
  reliquaryInfoHeight * 3 +
  contentMragin * 2 -
  reliquarySetTextFontSize;
const reliquarySetTextFontColor = globalFontColor;

const weaponImageSize = reliquaryInfoHeight;
const weaponNameTextFontSize = characterPropTextFontSize;

const weaponNameTextEndX = characterPropImageX + characterPropWidth;
const weaponNameTextEndY =
  characterImageY + characterImageSize - weaponNameTextFontSize;
const weaponNameTextFontColor = globalFontColor;

const weaponImageX = weaponNameTextEndX - weaponImageSize;
const weaponImageY = weaponNameTextEndY - contentMragin - weaponImageSize;

const weaponPropImageSize = reliquarySubPropImageSize;
const weaponPropTextFontSize = reliquarySubPropTextFontSize;
const weaponMainPropImageX = weaponImageX - contentMragin - weaponPropImageSize;
const weaponMainPropImageY =
  weaponImageY + (weaponPropImageSize - weaponPropTextFontSize) / 2;
const weaponMainPropTextEndX = weaponMainPropImageX - contentMragin;
const weaponMainPropTextEndY = weaponMainPropImageY;
const weaponSubPropImageX = weaponMainPropImageX;
const weaponSubPropImageY =
  weaponMainPropImageY + weaponPropImageSize + contentMragin;
const weaponSubPropTextEndX = weaponSubPropImageX - contentMragin;
const weaponSubPropTextEndY = weaponSubPropImageY;
const weaponPropTextFontColor = globalFontColor;

const cardWidth =
  cardPadding * 2 + characterImageSize + contentMragin + characterPropWidth;
const cardHeight =
  cardPadding * 2 +
  characterImageSize +
  reliquaryInfoHeight * 3 +
  contentMragin * 3;

export const defaultCardConfig: CardConfig = {
  width: cardWidth,
  height: cardHeight,
  lang: "zh-CN",
  fontFamily: "Noto Sans SC",
  customeFonts: [
    {
      fontPath: getAssetFontPath("NotoSansSC-Regular.otf"),
      fontFamily: "Noto Sans SC",
    },
  ],
};

export async function generateCard(
  character: Character,
  config: CardConfig = defaultCardConfig
): Promise<Canvas> {
  registCustomeFonts(config);
  const canvas = createCanvas(config.width, config.height);
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.scale(config.width / cardWidth, config.height / cardHeight);
  initBackground(ctx, character);
  await drawCharacter(ctx, config, character);
  await drawCharacterProps(ctx, config, character);
  await drawReliquaries(ctx, config, character.reliquaries, character.id);
  await drawWeapon(ctx, config, character.weapon);
  return canvas;
}

function registCustomeFonts(config: CardConfig) {
  if (Array.isArray(config.customeFonts)) {
    config.customeFonts.forEach((font) =>
      GlobalFonts.registerFromPath(font.fontPath, font.fontFamily)
    );
  }
}

function initBackground(ctx: SKRSContext2D, character: Character): string {
  const color = getBgColor(character.id);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, cardWidth, cardHeight);
  return color;
}

async function drawCharacter(
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
    characterImageX,
    characterImageY,
    characterImageSize,
    characterImageSize
  );

  // owner
  if (character.owner) {
    // uid
    if (character.owner.uid) {
      drawText(
        ctx,
        "UID:" + character.owner.uid,
        ownerTextX,
        ownerTextY,
        ownerTextFontSize,
        ownerTextFontColor,
        config.specialFontFamilies?.ownerTextFontFamily || config.fontFamily
      );
    }
    // name
    if (character.owner.name) {
      drawText(
        ctx,
        character.owner.name,
        ownerTextX,
        character.owner.uid
          ? ownerTextY + ownerTextFontSize + contentMragin
          : ownerTextY,
        ownerTextFontSize,
        ownerTextFontColor,
        config.specialFontFamilies?.ownerTextFontFamily || config.fontFamily
      );
    }
  }

  // level
  drawText(
    ctx,
    getLoc("level", config.lang) + " " + character.level.toFixed(0),
    characterLevelTextEndX,
    characterLevelTextEndY,
    characterLevelTextFontSize,
    characterLevelTextFontColor,
    config.specialFontFamilies?.characterLevelTextFontFamily ||
      config.fontFamily,
    "right"
  );

  // skill level
  drawText(
    ctx,
    skillsText,
    characterSkillsTextX,
    characterSkillsTextY,
    characterSkillsTextFontSize,
    characterSkillsTextFontColor,
    config.specialFontFamilies?.characterSkillsTextFontFamily ||
      config.fontFamily
  );

  // talent
  if (character.talent > 0) {
    drawText(
      ctx,
      character.talent.toFixed(0) + "◈",
      characterTalentTextEndX,
      characterTalentTextEndY,
      characterTalentTextFontSize,
      characterTalentTextFontColor,
      config.specialFontFamilies?.characterTalentTextFontFamily ||
        config.fontFamily,
      "right"
    );
  }

  return;
}

async function drawCharacterProps(
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
  const imageX = characterPropImageX;
  const imageY =
    characterPropImageY +
    characterPropHeigth * propPosition +
    contentMragin * propPosition;
  const textX = characterPropTextX;
  const textY =
    characterPropTextY +
    characterPropHeigth * propPosition +
    contentMragin * propPosition;
  const textEndX = characterPropTextEndX;
  const textEndY =
    characterPropTextEndY +
    characterPropHeigth * propPosition +
    contentMragin * propPosition;

  // prop image
  await loadImageAndDraw(
    ctx,
    getCharacterPropImagePath(propId),
    imageX,
    imageY,
    characterPropImageSize,
    characterPropImageSize
  );

  // prop text
  const propLabel = getCharacterPropLoc(propId, config.lang);
  const propValue = getCharacterPropText(propId, fightPropMap[propId]);
  drawText(
    ctx,
    propLabel,
    textX,
    textY,
    characterPropTextFontSize,
    characterPropTextFontColor,
    config.specialFontFamilies?.characterPropTextFontFamily || config.fontFamily
  );
  drawText(
    ctx,
    propValue,
    textEndX,
    textEndY,
    characterPropTextFontSize,
    characterPropTextFontColor,
    config.specialFontFamilies?.characterPropTextFontFamily ||
      config.fontFamily,
    "right"
  );
  return;
}

async function drawReliquaries(
  ctx: SKRSContext2D,
  config: CardConfig,
  reliquaries: ReliquarySlots,
  avatarId: number
) {
  let postion = 0;
  const setNumMap: Map<number, number> = new Map();
  if (reliquaries.flower) {
    await drawReliquary(ctx, config, reliquaries.flower, avatarId, postion++);
    countSetNum(setNumMap, reliquaries.flower.id);
  }
  if (reliquaries.feather) {
    await drawReliquary(ctx, config, reliquaries.feather, avatarId, postion++);
    countSetNum(setNumMap, reliquaries.feather.id);
  }
  if (reliquaries.sands) {
    await drawReliquary(ctx, config, reliquaries.sands, avatarId, postion++);
    countSetNum(setNumMap, reliquaries.sands.id);
  }
  if (reliquaries.goblet) {
    await drawReliquary(ctx, config, reliquaries.goblet, avatarId, postion++);
    countSetNum(setNumMap, reliquaries.goblet.id);
  }
  if (reliquaries.circlet) {
    await drawReliquary(ctx, config, reliquaries.circlet, avatarId, postion++);
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
        reliquarySetEndX,
        reliquarySetEndY -
          contentMragin * setIndex -
          reliquarySetTextFontSize * setIndex,
        reliquarySetTextFontSize,
        reliquarySetTextFontColor,
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
  postion: number
) {
  // reliquary image
  const imageX = reliquaryImageXList[postion];
  const imageY = reliquaryImageYList[postion];
  const imageOffsetX = reliquaryImageSize / 3;
  const imageOffsetY = 0;
  ctx.save();
  ctx.strokeStyle = globalFontColor;
  ctx.lineWidth = 2;
  ctx.roundRect(
    imageX,
    imageY,
    reliquaryImageSize,
    reliquaryImageSize,
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
    reliquaryImageSize,
    reliquaryImageSize
  );

  // main prop image
  const mainPropImageX =
    imageX + reliquaryImageSize - reliquaryMainPropImageSize - 1;
  const mainPropImageY = imageY + 1;
  await loadImageAndDraw(
    ctx,
    getReliquaryPropImagePath(reliquary.mainProp.id),
    mainPropImageX,
    mainPropImageY,
    reliquaryMainPropImageSize,
    reliquaryMainPropImageSize
  );

  // main prop text
  const mainPropTextEndX = imageX + reliquaryImageSize - 2;
  const mainPropTextEndY =
    imageY + reliquaryImageSize - reliquaryMainPropTextFontSize - contentMragin;
  drawText(
    ctx,
    getFightPropText(reliquary.mainProp),
    mainPropTextEndX,
    mainPropTextEndY,
    reliquaryMainPropTextFontSize,
    reliquaryMainPropTextFontColor,
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
  postion: number,
  x: number,
  y: number
) {
  // sub prop image
  const imageX = x + reliquarySubPropRXList[postion];
  const imageY =
    y +
    reliquarySubPropRYList[postion] +
    (reliquarySubPropHeigth - reliquarySubPropImageSize) / 2;
  await loadImageAndDraw(
    ctx,
    getReliquaryPropImagePath(prop.id),
    imageX,
    imageY,
    reliquarySubPropImageSize,
    reliquarySubPropImageSize
  );

  // sub prop text
  const textX = imageX + reliquarySubPropImageSize + contentMragin;
  const textY = imageY;
  drawText(
    ctx,
    getFightPropText(prop),
    textX,
    textY,
    reliquarySubPropTextFontSize,
    reliquarySubPropTextFontColor,
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

async function drawWeapon(
  ctx: SKRSContext2D,
  config: CardConfig,
  weapon: Weapon
) {
  // weapon name
  drawText(
    ctx,
    getWeaponName(weapon.id, config.lang),
    weaponNameTextEndX,
    weaponNameTextEndY,
    weaponNameTextFontSize,
    weaponNameTextFontColor,
    config.specialFontFamilies?.weaponNameTextFontFamily || config.fontFamily,
    "right"
  );

  // weapon image
  ctx.save();
  ctx.strokeStyle = globalFontColor;
  ctx.lineWidth = 2;
  ctx.roundRect(
    weaponImageX,
    weaponImageY,
    weaponImageSize,
    weaponImageSize,
    [8, 8, 8, 8]
  );
  ctx.clip();
  await loadImageAndDraw(
    ctx,
    getWeaponImagePath(weapon.id),
    weaponImageX,
    weaponImageY,
    weaponImageSize,
    weaponImageSize
  );
  ctx.stroke();
  ctx.restore();

  // weapon main prop image
  await loadImageAndDraw(
    ctx,
    getReliquaryPropImagePath(weapon.mainProp.id),
    weaponMainPropImageX,
    weaponMainPropImageY,
    weaponPropImageSize,
    weaponPropImageSize
  );
  // weapon main prop text
  drawText(
    ctx,
    getFightPropText(weapon.mainProp),
    weaponMainPropTextEndX,
    weaponMainPropTextEndY,
    weaponPropTextFontSize,
    weaponPropTextFontColor,
    config.specialFontFamilies?.weaponPropTextFontFamily || config.fontFamily,
    "right"
  );

  if (weapon.subProp) {
    // weapon sub prop image
    await loadImageAndDraw(
      ctx,
      getReliquaryPropImagePath(weapon.subProp.id),
      weaponSubPropImageX,
      weaponSubPropImageY,
      weaponPropImageSize,
      weaponPropImageSize
    );
    // weapon sub prop text
    drawText(
      ctx,
      getFightPropText(weapon.subProp),
      weaponSubPropTextEndX,
      weaponSubPropTextEndY,
      weaponPropTextFontSize,
      weaponPropTextFontColor,
      config.specialFontFamilies?.weaponPropTextFontFamily || config.fontFamily,
      "right"
    );
  }

  return;
}
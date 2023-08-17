import {
  Canvas,
  SKRSContext2D,
  GlobalFonts,
  createCanvas,
} from "@napi-rs/canvas";
import { CardConfig, Character } from "./types";
import { getBgColor } from "./util";
import { cardHeight, cardWidth, cardConfig } from "./config";
import {
  drawCharacter,
  drawCharacterProps,
  drawReliquaries,
  drawWeapon,
} from "./draw";
import { checkCache } from "./cache";

const registerFontSet = new Set<string>();

function registerCustomFonts(config: CardConfig) {
  if (Array.isArray(config.customFonts)) {
    config.customFonts.forEach((font) => {
      if (registerFontSet.has(font.fontPath)) return;
      GlobalFonts.registerFromPath(font.fontPath, font.fontFamily);
      registerFontSet.add(font.fontPath);
    });
  }
}

function initBackground(ctx: SKRSContext2D, character: Character): string {
  const color = getBgColor(character.id);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, cardWidth, cardHeight);
  return color;
}

export async function generateCard(
  character: Character,
  config: CardConfig = cardConfig,
): Promise<Canvas> {
  await checkCache();
  registerCustomFonts(config);
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

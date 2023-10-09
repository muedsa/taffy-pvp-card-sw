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
import GenshinError from "./genshinError";

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

type AnyFunction = (...args: any[]) => any;

const withGenshinError = <T extends AnyFunction>(fn: T, message: string): T => {
  return (async (...args) => {
    try {
      return await fn(...args);
    } catch (e) {
      throw new GenshinError(message, { origin: e });
    }
  }) as T;
};

const catchErrorDrawCharacter = withGenshinError(
  drawCharacter,
  "角色渲染失败，请重试",
);
const catchErrorDrawCharacterProps = withGenshinError(
  drawCharacterProps,
  "角色属性渲染失败，请重试",
);
const catchErrorDrawReliquaries = withGenshinError(
  drawReliquaries,
  "圣遗物渲染失败，请重试",
);
const catchErrorDrawWeapon = withGenshinError(
  drawWeapon,
  "武器渲染失败，请重试",
);

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
  await catchErrorDrawCharacter(ctx, config, character);
  await catchErrorDrawCharacterProps(ctx, config, character);
  await catchErrorDrawReliquaries(
    ctx,
    config,
    character.reliquaries,
    character.id,
  );
  await catchErrorDrawWeapon(ctx, config, character.weapon);
  return canvas;
}

import { resolve } from "node:path";
import {
  cardPadding,
  characterImageSize,
  characterPropWidth,
  contentMargin,
  reliquaryInfoHeight,
} from "./size";
import { CardConfig } from "./types";

export const cardWidth =
  cardPadding * 2 + characterImageSize + contentMargin + characterPropWidth;
export const cardHeight =
  cardPadding * 2 +
  characterImageSize +
  reliquaryInfoHeight * 3 +
  contentMargin * 3;

export const cardConfig: CardConfig = {
  width: cardWidth,
  height: cardHeight,
  lang: "zh-CN",
  fontFamily: "Noto Sans SC",
  customFonts: [
    {
      fontPath: resolve(__dirname, "../asset/font/NotoSansSC-Regular.otf"),
      fontFamily: "Noto Sans SC",
    },
  ],
};

export const globalConfig = {
  cacheDir: resolve(__dirname, "../.cache"),
  logger: {
    info: console.log,
    warn: console.warn,
    error: console.error,
  },
};

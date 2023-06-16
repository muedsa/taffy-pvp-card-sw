import {
  cardPadding,
  characterImageSize,
  characterPropWidth,
  contentMargin,
  reliquaryInfoHeight,
} from "./size";
import { CardConfig } from "./types";
import { getAssetFontPath } from "./util";

export const cardWidth =
  cardPadding * 2 + characterImageSize + contentMargin + characterPropWidth;
export const cardHeight =
  cardPadding * 2 +
  characterImageSize +
  reliquaryInfoHeight * 3 +
  contentMargin * 3;

export const defaultCardConfig: CardConfig = {
  width: cardWidth,
  height: cardHeight,
  lang: "zh-CN",
  fontFamily: "Noto Sans SC",
  customFonts: [
    {
      fontPath: getAssetFontPath("NotoSansSC-Regular.otf"),
      fontFamily: "Noto Sans SC",
    },
  ],
};

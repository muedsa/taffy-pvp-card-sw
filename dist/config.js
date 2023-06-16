"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultCardConfig = exports.cardHeight = exports.cardWidth = void 0;
const size_1 = require("./size");
const util_1 = require("./util");
exports.cardWidth = size_1.cardPadding * 2 + size_1.characterImageSize + size_1.contentMargin + size_1.characterPropWidth;
exports.cardHeight = size_1.cardPadding * 2 +
    size_1.characterImageSize +
    size_1.reliquaryInfoHeight * 3 +
    size_1.contentMargin * 3;
exports.defaultCardConfig = {
    width: exports.cardWidth,
    height: exports.cardHeight,
    lang: "zh-CN",
    fontFamily: "Noto Sans SC",
    customFonts: [
        {
            fontPath: (0, util_1.getAssetFontPath)("NotoSansSC-Regular.otf"),
            fontFamily: "Noto Sans SC",
        },
    ],
};

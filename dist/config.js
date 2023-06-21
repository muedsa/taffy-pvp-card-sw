"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalConfig = exports.cardConfig = exports.cardHeight = exports.cardWidth = void 0;
const node_path_1 = require("node:path");
const size_1 = require("./size");
exports.cardWidth = size_1.cardPadding * 2 + size_1.characterImageSize + size_1.contentMargin + size_1.characterPropWidth;
exports.cardHeight = size_1.cardPadding * 2 +
    size_1.characterImageSize +
    size_1.reliquaryInfoHeight * 3 +
    size_1.contentMargin * 3;
exports.cardConfig = {
    width: exports.cardWidth,
    height: exports.cardHeight,
    lang: "zh-CN",
    fontFamily: "Noto Sans SC",
    customFonts: [
        {
            fontPath: (0, node_path_1.resolve)(__dirname, "../asset/font/NotoSansSC-Regular.otf"),
            fontFamily: "Noto Sans SC",
        },
    ],
};
exports.globalConfig = {
    cacheDir: (0, node_path_1.resolve)(__dirname, "../.cache"),
    logger: {
        info: console.log,
        warn: console.warn,
        error: console.error,
    },
};

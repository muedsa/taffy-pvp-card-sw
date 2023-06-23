"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCard = void 0;
const canvas_1 = require("@napi-rs/canvas");
const util_1 = require("./util");
const config_1 = require("./config");
const draw_1 = require("./draw");
const cache_1 = require("./cache");
const registerFontSet = new Set();
function registerCustomFonts(config) {
    if (Array.isArray(config.customFonts)) {
        config.customFonts.forEach((font) => {
            if (registerFontSet.has(font.fontPath))
                return;
            canvas_1.GlobalFonts.registerFromPath(font.fontPath, font.fontFamily);
            registerFontSet.add(font.fontPath);
        });
    }
}
function initBackground(ctx, character) {
    const color = (0, util_1.getBgColor)(character.id);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, config_1.cardWidth, config_1.cardHeight);
    return color;
}
async function generateCard(character, config = config_1.cardConfig) {
    await (0, cache_1.checkCache)();
    registerCustomFonts(config);
    const canvas = (0, canvas_1.createCanvas)(config.width, config.height);
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.scale(config.width / config_1.cardWidth, config.height / config_1.cardHeight);
    initBackground(ctx, character);
    await (0, draw_1.drawCharacter)(ctx, config, character);
    await (0, draw_1.drawCharacterProps)(ctx, config, character);
    await (0, draw_1.drawReliquaries)(ctx, config, character.reliquaries, character.id);
    await (0, draw_1.drawWeapon)(ctx, config, character.weapon);
    return canvas;
}
exports.generateCard = generateCard;

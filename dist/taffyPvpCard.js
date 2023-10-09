"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCard = void 0;
const canvas_1 = require("@napi-rs/canvas");
const util_1 = require("./util");
const config_1 = require("./config");
const draw_1 = require("./draw");
const cache_1 = require("./cache");
const genshinError_1 = __importDefault(require("./genshinError"));
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
const withGenshinError = (fn, message) => {
    return (async (...args) => {
        try {
            return await fn(...args);
        }
        catch (e) {
            throw new genshinError_1.default(message, { origin: e });
        }
    });
};
const catchErrorDrawCharacter = withGenshinError(draw_1.drawCharacter, "角色渲染失败，请重试");
const catchErrorDrawCharacterProps = withGenshinError(draw_1.drawCharacterProps, "角色属性渲染失败，请重试");
const catchErrorDrawReliquaries = withGenshinError(draw_1.drawReliquaries, "圣遗物渲染失败，请重试");
const catchErrorDrawWeapon = withGenshinError(draw_1.drawWeapon, "武器渲染失败，请重试");
async function generateCard(character, config = config_1.cardConfig) {
    await (0, cache_1.checkCache)();
    registerCustomFonts(config);
    const canvas = (0, canvas_1.createCanvas)(config.width, config.height);
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.scale(config.width / config_1.cardWidth, config.height / config_1.cardHeight);
    initBackground(ctx, character);
    await catchErrorDrawCharacter(ctx, config, character);
    await catchErrorDrawCharacterProps(ctx, config, character);
    await catchErrorDrawReliquaries(ctx, config, character.reliquaries, character.id);
    await catchErrorDrawWeapon(ctx, config, character.weapon);
    return canvas;
}
exports.generateCard = generateCard;

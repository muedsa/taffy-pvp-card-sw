"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawText = exports.loadImageAndOffsetDraw = exports.loadImageAndDraw = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const canvas_1 = require("@napi-rs/canvas");
async function exists(path) {
    try {
        await node_fs_1.default.promises.access(path, node_fs_1.default.constants.F_OK);
        return true;
    }
    catch {
        return false;
    }
}
async function loadImageAndDraw(ctx, path, x, y, w, h) {
    if (!(await exists(path))) {
        throw new Error("not exists file: " + path);
    }
    const image = await (0, canvas_1.loadImage)(path);
    ctx.drawImage(image, x, y, w || image.width, h || image.height);
    // ctx.fillStyle = "#ffffff";
    // ctx.fillRect(x, y, w || image.width, h || image.height);
    return;
}
exports.loadImageAndDraw = loadImageAndDraw;
async function loadImageAndOffsetDraw(ctx, path, offsetX, offsetY, x, y, w, h) {
    if (!(await exists(path))) {
        throw new Error("not exists file: " + path);
    }
    const image = await (0, canvas_1.loadImage)(path);
    w = w || image.width;
    h = h || image.height;
    const sx = (offsetX * image.width) / w;
    const sy = (offsetY * image.height) / h;
    const sw = image.width - sx;
    const sh = image.height - sy;
    const dw = w - offsetX;
    const dh = h - offsetY;
    ctx.drawImage(image, sx, sy, sw, sh, x, y, dw, dh);
    return;
}
exports.loadImageAndOffsetDraw = loadImageAndOffsetDraw;
function drawText(ctx, text, x, y, fontSize, fontColor = "#ffffff", fontFamily = "", textAlign = "left") {
    ctx.textBaseline = "top";
    if (fontFamily.indexOf(" ") > -1) {
        ctx.font = `${fontSize}px "${fontFamily}"`;
    }
    else {
        ctx.font = `${fontSize}px ${fontFamily}`;
    }
    ctx.fillStyle = fontColor;
    ctx.textAlign = textAlign;
    ctx.fillText(text, x, y);
}
exports.drawText = drawText;

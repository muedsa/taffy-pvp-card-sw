"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawText = exports.loadImageAndOffsetDraw = exports.loadImageAndDraw = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const canvas_1 = require("@napi-rs/canvas");
function exists(path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield node_fs_1.default.promises.access(path, node_fs_1.default.constants.F_OK);
            return true;
        }
        catch (_a) {
            return false;
        }
    });
}
function loadImageAndDraw(ctx, path, x, y, w, h) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield exists(path))) {
            throw new Error("not exists file: " + path);
        }
        const image = yield (0, canvas_1.loadImage)(path);
        ctx.drawImage(image, x, y, w || image.width, h || image.height);
        // ctx.fillStyle = "#ffffff";
        // ctx.fillRect(x, y, w || image.width, h || image.height);
        return;
    });
}
exports.loadImageAndDraw = loadImageAndDraw;
function loadImageAndOffsetDraw(ctx, path, offsetX, offsetY, x, y, w, h) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield exists(path))) {
            throw new Error("not exists file: " + path);
        }
        const image = yield (0, canvas_1.loadImage)(path);
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
    });
}
exports.loadImageAndOffsetDraw = loadImageAndOffsetDraw;
function drawText(ctx, text, x, y, fontSize, fontColor = "#ffffff", fontFamily = "sans-serif", textAlign = "left") {
    ctx.textBaseline = "top";
    ctx.font = fontSize + "px " + '"' + fontFamily + '"';
    ctx.fillStyle = fontColor;
    ctx.textAlign = textAlign;
    ctx.fillText(text, x, y);
}
exports.drawText = drawText;

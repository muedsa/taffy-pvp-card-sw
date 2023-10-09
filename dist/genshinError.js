"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GenshinError extends Error {
    originError;
    code;
    constructor(msg, others = {}) {
        super(msg);
        this.name = "GenshinError";
        this.originError = others.origin;
        this.code = others.code || 500;
    }
}
exports.default = GenshinError;

export default class GenshinError extends Error {
    originError?: Error;
    code?: number;
    constructor(msg: string, others?: {
        origin?: unknown;
        code?: number;
    });
}

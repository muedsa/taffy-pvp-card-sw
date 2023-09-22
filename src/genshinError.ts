export default class GenshinError extends Error {
  originError?: Error
  code?: number
  constructor(msg: string, others: { origin?: unknown, code?: number } = {}) {
    super(msg);
    this.name = "GenshinError";
    this.originError = others.origin as Error
    this.code = others.code || 500
  }
}
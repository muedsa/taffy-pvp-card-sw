import { SKRSContext2D } from "@napi-rs/canvas";
export declare function loadImageAndDraw(ctx: SKRSContext2D, path: string, x: number, y: number, w?: number, h?: number): Promise<void>;
export declare function loadImageAndOffsetDraw(ctx: SKRSContext2D, path: string, offsetX: number, offsetY: number, x: number, y: number, w?: number, h?: number): Promise<void>;
export declare function drawText(ctx: SKRSContext2D, text: string, x: number, y: number, fontSize: number, fontColor?: string, fontFamily?: string, textAlign?: CanvasTextAlign): void;

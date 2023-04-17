import fs from "node:fs";
import { SKRSContext2D, loadImage } from "@napi-rs/canvas";

async function exists(path: string): Promise<boolean> {
  try {
    await fs.promises.access(path, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export async function loadImageAndDraw(
  ctx: SKRSContext2D,
  path: string,
  x: number,
  y: number,
  w?: number,
  h?: number
) {
  if (!(await exists(path))) {
    throw new Error("not exists file: " + path);
  }
  const image = await loadImage(path);
  ctx.drawImage(image, x, y, w || image.width, h || image.height);
  // ctx.fillStyle = "#ffffff";
  // ctx.fillRect(x, y, w || image.width, h || image.height);
  return;
}

export async function loadImageAndOffsetDraw(
  ctx: SKRSContext2D,
  path: string,
  offsetX: number,
  offsetY: number,
  x: number,
  y: number,
  w?: number,
  h?: number
) {
  if (!(await exists(path))) {
    throw new Error("not exists file: " + path);
  }
  const image = await loadImage(path);
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

export function drawText(
  ctx: SKRSContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  fontColor = "#ffffff",
  fontFamily = "sans-serif",
  textAlign: CanvasTextAlign = "left"
) {
  ctx.textBaseline = "top";
  ctx.font = fontSize + "px " + '"' + fontFamily + '"';
  ctx.fillStyle = fontColor;
  ctx.textAlign = textAlign;
  ctx.fillText(text, x, y);
}

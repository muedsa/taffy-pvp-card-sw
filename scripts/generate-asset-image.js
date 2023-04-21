const { resolve } = require("node:path");
const fs = require("node:fs");
const { loadImage, createCanvas, ImageData } = require("@napi-rs/canvas");
const { backgroupColors } = require("../dist/data/colors");

const colorKeys = Object.keys(backgroupColors);
const rawImageDirPath = resolve(
  __dirname,
  "..",
  "asset",
  "image",
  "reliquary",
  "raw"
);

const colorComponentMinValue = 0;
const colorComponentMaxValue = 255;
const darkScaleFactor = 0.7;

function convertToHexColor(r, g, b) {
  let rhex = r.toString(16);
  let ghex = g.toString(16);
  let bhex = b.toString(16);
  rhex = rhex.length < 2 ? "0" + rhex : rhex;
  ghex = ghex.length < 2 ? "0" + ghex : ghex;
  bhex = bhex.length < 2 ? "0" + bhex : bhex;
  return "#" + rhex + ghex + bhex;
}

function convertToRed(color) {
  return Number.parseInt(color.slice(1, 3), 16);
}

function convertToGreen(color) {
  return Number.parseInt(color.slice(3, 5), 16);
}

function convertToBlue(color) {
  return Number.parseInt(color.slice(5, 7), 16);
}

function getScaledColorComponent(colorComponent, scaleFactor) {
  const scaledValue = Math.floor(colorComponent * scaleFactor);
  return scaledValue > colorComponentMaxValue
    ? colorComponentMaxValue
    : scaledValue < colorComponentMinValue
    ? colorComponentMinValue
    : scaledValue;
}

async function generateImage(filename, colorKey, colorR, colorG, colorB) {
  const imagePath = resolve(rawImageDirPath, filename);
  const image = await loadImage(imagePath);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);
  const imageData = ctx.getImageData(0, 0, image.width, image.height);
  const newDataArray = new Uint8ClampedArray(imageData.data);
  for (let index = 0; index < imageData.data.length; index += 4) {
    const r = imageData.data[index];
    const g = imageData.data[index + 1];
    const b = imageData.data[index + 2];
    const a = imageData.data[index + 3];
    if (a > 0) {
      newDataArray[index] = Math.floor((r / 255) * colorR);
      newDataArray[index + 1] = Math.floor((g / 255) * colorG);
      newDataArray[index + 2] = Math.floor((b / 255) * colorB);
      newDataArray[index + 3] = a;
    }
    // console.log(`rgba(${r}, ${g}, ${b}, ${a})`);
  }
  const newImageData = new ImageData(newDataArray, image.width);
  ctx.clearRect(0, 0, image.width, image.height);
  ctx.putImageData(newImageData, 0, 0);
  fs.writeFileSync(
    resolve(
      rawImageDirPath,
      "..",
      filename.slice(0, -4) + "_" + colorKey + ".png"
    ),
    canvas.toBuffer("image/png")
  );
  return;
}

const filenames = fs
  .readdirSync(rawImageDirPath)
  .filter((filename) => filename.endsWith(".png"));
colorKeys.forEach((colorKey) => {
  const color = backgroupColors[colorKey];
  const r = getScaledColorComponent(convertToRed(color), darkScaleFactor);
  const g = getScaledColorComponent(convertToGreen(color), darkScaleFactor);
  const b = getScaledColorComponent(convertToBlue(color), darkScaleFactor);
  console.log(`${colorKey}: ${color} -> ${convertToHexColor(r, g, b)}`);
  filenames.forEach((filename) => {
    generateImage(filename, colorKey, r, g, b);
  });
});

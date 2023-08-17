const fs = require("node:fs");
const path = require("node:path");
// const cp = require("node:child_process");
const { createCanvas } = require("@napi-rs/canvas");
const fetch = require("node-fetch");
const { generateCard, cardConfig, parseCharacterData } = require("../dist");

const test = async () => {
  const meta = await fetch("https://enka.network/api/uid/101745173");
  const { uid, playerInfo, avatarInfoList } = await meta.json();
  const characterDataList = avatarInfoList.map((avatarInfo) =>
    parseCharacterData(uid, playerInfo, avatarInfo),
  );
  if (characterDataList.length > 0) {
    const cardWidth = cardConfig.width;
    const cardHeight = cardConfig.height;
    console.log(`query character total number: ${avatarInfoList.length}`);
    const canvasArr = await Promise.all(
      characterDataList.map((i) => generateCard(i)),
    );
    try {
      const rowNum = Math.min(canvasArr.length, 4);
      const colNum = Math.ceil(canvasArr.length / rowNum);
      console.log(`Card ${rowNum} X ${colNum}`);
      const width = rowNum * cardWidth;
      const height = colNum * cardHeight;
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
      canvasArr.forEach((cardCanvas, index) => {
        const col = index % rowNum;
        const row = Math.floor(index / rowNum);
        const x = col * cardWidth;
        const y = row * cardHeight;
        ctx.drawImage(cardCanvas, x, y);
      });
      fs.writeFileSync(
        path.resolve(__dirname, "test.png"),
        canvas.toBuffer("image/png"),
      );
      // too long url: spawn E2BIG
      // const url = canvas.toDataURL("image/png");
      // switch (process.platform) {
      //   case "linux":
      //     cp.exec(`echo "${url}" | xclip -selection clipboard`);
      //     console.log("xclip!");
      //     break;
      //   case "win32":
      //     cp.exec("clip").stdin.end(url);
      //     console.log("clip!");
      //     break;
      //   default:
      // }
    } catch (error) {
      console.log(JSON.stringify(characterDataList, null, "\t"));
      throw error;
    }
  }
};

test();

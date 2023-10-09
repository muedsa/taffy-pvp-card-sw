import fetch from "node-fetch";
import os from "node:os";
import * as functions from "firebase-functions/v2";
import moment from "moment-timezone";
import {
  globalConfig,
  cardConfig,
  parseCharacterData,
  generateCard,
  updateCache,
} from "../../src";
import { createCanvas } from "@napi-rs/canvas";
import { resolve } from "node:path";
import type { AvatarInfo, PlayerInfo } from "../../src/parseCharacterData";
import GenshinError from "../../src/genshinError";

globalConfig.logger.info = functions.logger.info;
globalConfig.logger.warn = functions.logger.warn;
globalConfig.logger.error = functions.logger.error;
globalConfig.cacheDir = resolve(os.tmpdir(), ".taffy-pvp-card-sw-cache");

const logger = globalConfig.logger;

class GenshinService {
  /**
   * @return [rowCount, colCount]
   */
  calcRowCol(length: number) {
    if (length <= 4) return [1, length];
    if (length <= 6) return [2, 3];
    return [Math.ceil(length / 4), 4];
  }

  async getCharaData(uid: number) {
    logger.info(`fetch genshin player(${uid}) character data...`);
    const time = Date.now();
    const resp = await fetch(`https://enka.network/api/uid/${uid}`);
    logger.info(
      `fetch genshin player(${uid}) character data complete in ${
        Date.now() - time
      }ms`,
    );
    if (resp.ok) {
      type Data = { playerInfo: PlayerInfo; avatarInfoList: AvatarInfo[] };
      let data: Data;
      try {
        data = (await resp.json()) as Data;
      } catch (e) {
        logger.info(
          `fetch genshin player(${uid}) character error, unexpected error`,
        );
        throw new GenshinError("数据解析失败，请重试", { origin: e });
      }
      const { playerInfo, avatarInfoList } = data;
      if (!avatarInfoList?.length) {
        throw new GenshinError("未获取到角色数据，请尝试更新展示板");
      }
      return avatarInfoList.map((avatarInfo) =>
        parseCharacterData(uid, playerInfo, avatarInfo),
      );
    }
    const code = resp.status;
    logger.info(`fetch genshin player(${uid}) character error, code ${code}`);
    switch (code) {
      case 400:
        throw new GenshinError("UID 格式错误", { code });
      case 404:
        throw new GenshinError("玩家不存在（MHY 服务器说的）", { code });
      case 424:
        throw new GenshinError("系统维护中，再等等吧", { code });
      case 429:
        throw new GenshinError("请求频率过高，请稍后再试吧", { code });
      case 500:
      case 503:
      default:
        throw new GenshinError("出错了，但不知道为什么", { code });
    }
  }

  async drawCharaArtifactsImage(uid: number, position?: number) {
    let dataList = await this.getCharaData(uid);
    // 如果传了 position 只选出对应 position 的，本质还是渲染拼图只不过这里只拼一个
    if (position) {
      dataList = [dataList[position - 1]];
    }
    logger.info(`player(${uid}) character total number: ${dataList.length} `);
    const cardCanvasList = await Promise.all(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dataList.map((data) => generateCard(data)),
    );
    const [rowCount, colCount] = this.calcRowCol(cardCanvasList.length);
    const width = colCount * cardConfig.width;
    const height = rowCount * cardConfig.height;
    logger.info(
      `generating card grid ${colCount} * ${rowCount}, size ${width} * ${height} `,
    );
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    cardCanvasList.forEach((cardCanvas, index) => {
      const col = index % colCount;
      const row = Math.floor(index / colCount);
      const x = col * cardConfig.width;
      const y = row * cardConfig.height;
      ctx.drawImage(cardCanvas, x, y);
    });
    const result = canvas.toBuffer("image/png");
    logger.info(`player(${uid}) character image generated`);
    return result;
  }

  async updateCache() {
    await updateCache(true);
    return `原神数据更新于: ${moment()
      .tz("Asia/Shanghai")
      .format("YYYY年MM月DD日 HH:mm:ss")}`;
  }
}

export default new GenshinService();

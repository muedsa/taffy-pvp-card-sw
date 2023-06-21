import fetch from "node-fetch";
import fs from "node:fs/promises";
import { globalConfig } from "./config";
import { FileTypeMap } from "./data/types";
import { fileExists } from "./util";

type FileNames = keyof FileTypeMap;

const cacheMap = new Map<string, object>();
const logger = globalConfig.logger;

const fileList = [
  "characters",
  "loc",
  "weapons",
  "reliquaries",
  "reliquary-set",
  "reliquaries-loc",
] as Array<FileNames>;

let loadingPromise: Promise<unknown> | null = null;

const getCacheFilePath = (fileName: string) =>
  `${globalConfig.cacheDir}/${fileName}.json`;

export function getCache<T extends FileNames = FileNames>(fileName: T) {
  return cacheMap.get(fileName) as FileTypeMap[T];
}

async function setCache(fileName: string, value: object | string) {
  const doWriteFile = () =>
    fs.writeFile(
      getCacheFilePath(fileName),
      typeof value === "string" ? value : JSON.stringify(value),
      { flag: "w" }
    );
  try {
    await doWriteFile();
  } catch (e) {
    if ((e as { code: string }).code === "ENOENT") {
      logger.info(`create cache dir: ${globalConfig.cacheDir}`);
      await fs.mkdir(globalConfig.cacheDir, { recursive: true });
      await doWriteFile();
    } else {
      throw e;
    }
  }
  cacheMap.set(fileName, typeof value === "string" ? JSON.parse(value) : value);
}

// 更新缓存，默认为从远端刷新所有
// checkCache 模式下只会获取本地缓存没有的
export async function updateCache(updateRemote = true) {
  const tasks = fileList.map((name) =>
    (async () => {
      if (!updateRemote && (await fileExists(getCacheFilePath(name)))) {
        const jsonString = await fs.readFile(getCacheFilePath(name), "utf-8");
        logger.info(`reading cache ${name}.json`);
        await setCache(name, jsonString);
      } else {
        const meta = await fetch(
          `https://raw.githubusercontent.com/zcWSR/taffy-pvp-card-ds/master/data/${name}.json`
        );
        logger.info(`fetching ${name}.json`);
        await setCache(name, await meta.json() as object);
      }
    })()
  );
  loadingPromise = Promise.all(tasks);
  await loadingPromise;
  loadingPromise = null;
}

// 每次 generateCard 都会执行，如果此时正在 updateCache 则会等待
export async function checkCache() {
  if (loadingPromise) return loadingPromise;
  if (cacheMap.size !== fileList.length) {
    await updateCache(false);
  }
}

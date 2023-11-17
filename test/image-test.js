const { accessSync, constants } = require("node:fs");
const { getCache, checkCache } = require("../dist/cache");
const { getCharacterImagePath } = require("../dist/util");

const imageTest = async () => {
  await checkCache()
  const characters = getCache("characters");
  const avatarIds = Object.keys(characters);
  avatarIds.forEach((avatarId) => {
    const imagePath = getCharacterImagePath(avatarId);
    accessSync(imagePath, constants.R_OK);
    console.log("verify: " + imagePath);
  });
};

imageTest();

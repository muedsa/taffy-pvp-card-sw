const fs = require("node:fs");
const { resolve } = require("node:path")
const cp = require("node:child_process");

const { generateCard } = require("../dist");

const character = {
  owner: {
    uid: 101745173,
    name: "MUEDSA",
  },
  id: 10000060,
  level: 81,
  talent: 0,
  skills: [6, 8, 10],
  fightPropMap: {
    1: 13535.6171875,
    2: 6303.6298828125,
    3: 0.7308999300003052,
    4: 770.3508911132,
    5: 375.1999816894531,
    6: 0.05829999968409538,
    7: 513.297668457,
    8: 62.5,
    9: 0.16760000586509705,
    20: 0.5335999727249146,
    21: 0,
    22: 2.625648021697998,
    23: 1.3554000854492188,
    26: 0,
    27: 0,
    28: 16.31999969482422,
    29: 0,
    30: 0,
    40: 0,
    41: 0,
    42: 0.4659999907016754,
    43: 0,
    44: 0,
    45: 0,
    46: 0,
    50: 0,
    51: 0,
    52: 0,
    53: 0,
    54: 0,
    55: 0,
    56: 0,
    72: 70,
    1002: 11.84320068359375,
    1010: 27719.74609375,
    2000: 32168.83984375,
    2001: 1190.46240234375,
    2002: 661.8263549804688,
    2003: 0,
    3002: 0,
    3045: 0,
    3046: 1,
  },
  reliquaries: {
    flower: {
      id: 94544,
      level: 21,
      mainProp: {
        id: "FIGHT_PROP_HP",
        value: 4780,
      },
      subProps: [
        {
          id: "FIGHT_PROP_CRITICAL_HURT",
          value: 28,
        },
        {
          id: "FIGHT_PROP_CRITICAL",
          value: 10.5,
        },
        {
          id: "FIGHT_PROP_ELEMENT_MASTERY",
          value: 16,
        },
        {
          id: "FIGHT_PROP_DEFENSE",
          value: 21,
        },
      ],
      type: "flower",
    },
    feather: {
      id: 94544,
      level: 21,
      mainProp: {
        id: "FIGHT_PROP_ATTACK",
        value: 311,
      },
      subProps: [
        {
          id: "FIGHT_PROP_DEFENSE_PERCENT",
          value: 11.7,
        },
        {
          id: "FIGHT_PROP_CRITICAL",
          value: 9.7,
        },
        {
          id: "FIGHT_PROP_CRITICAL_HURT",
          value: 7.8,
        },
        {
          id: "FIGHT_PROP_DEFENSE",
          value: 42,
        },
      ],
      type: "feather",
    },
    sands: {
      id: 94553,
      level: 21,
      mainProp: {
        id: "FIGHT_PROP_HP_PERCENT",
        value: 46.6,
      },
      subProps: [
        {
          id: "FIGHT_PROP_ATTACK",
          value: 29,
        },
        {
          id: "FIGHT_PROP_CRITICAL",
          value: 2.7,
        },
        {
          id: "FIGHT_PROP_CRITICAL_HURT",
          value: 26.4,
        },
        {
          id: "FIGHT_PROP_HP",
          value: 239,
        },
      ],
      type: "sands",
    },
    goblet: {
      id: 94513,
      level: 21,
      mainProp: {
        id: "FIGHT_PROP_WATER_ADD_HURT",
        value: 46.6,
      },
      subProps: [
        {
          id: "FIGHT_PROP_ATTACK",
          value: 35,
        },
        {
          id: "FIGHT_PROP_CHARGE_EFFICIENCY",
          value: 15.5,
        },
        {
          id: "FIGHT_PROP_HP",
          value: 538,
        },
        {
          id: "FIGHT_PROP_DEFENSE_PERCENT",
          value: 5.1,
        },
      ],
      type: "goblet",
    },
    circlet: {
      id: 81533,
      level: 21,
      mainProp: {
        id: "FIGHT_PROP_CRITICAL_HURT",
        value: 62.2,
      },
      subProps: [
        {
          id: "FIGHT_PROP_HP",
          value: 747,
        },
        {
          id: "FIGHT_PROP_HP_PERCENT",
          value: 10.5,
        },
        {
          id: "FIGHT_PROP_CRITICAL",
          value: 6.2,
        },
        {
          id: "FIGHT_PROP_ATTACK_PERCENT",
          value: 5.8,
        },
      ],
      type: "circlet",
    },
  },
  weapon: {
    id: 15508,
    level: 90,
    promoteLevel: 6,
    mainProp: {
      id: "FIGHT_PROP_BASE_ATTACK",
      value: 542,
    },
    subProp: {
      id: "FIGHT_PROP_CRITICAL_HURT",
      value: 88.2,
    },
  },
};
console.time("card generate time");
generateCard(character)
  .then((canvas) => {
    console.timeEnd("card generate time");
    fs.writeFileSync(resolve(__dirname, 'test.png'), canvas.toBuffer("image/png"));
    const url = canvas.toDataURL("image/png");
    cp.exec("clip").stdin.end(url);
    console.log("clip!");
  })
  .catch((error) => {
    console.log(error);
  });

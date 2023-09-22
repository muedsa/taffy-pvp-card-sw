import * as functions from "firebase-functions/v2";
import express, { Request, Response } from "express";
import genshin from "./genshin";
import GenshinError from "../../src/genshinError";

const app = express();

const getImage = (
  req: Request<{
    uid: string;
    position: string;
  }>,
  resp: Response,
) => {
  genshin
    .drawCharaArtifactsImage(
      Number(req.params.uid),
      Number(req.params.position) || undefined,
    )
    .then((buffer: Buffer) => {
      resp.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": buffer.length,
      });
      resp.end(buffer, "binary");
    })
    .catch((err: GenshinError) => {
      const json: Record<string, unknown> = {
        code: err.code || 500,
        message: err.message,
      };
      if (err.originError) {
        json.error = {
          message: err.originError.message,
          stack: err.originError.stack,
        };
      }
      resp.status(500).send(json);
    });
};

app.get("/:uid", getImage);

app.get("/:uid/:position", getImage);

app.put("/updateCache", (req, resp) => {
  genshin.updateCache().then((message) => {
    resp.send({
      code: 200,
      msg: message,
    });
  });
});

export const taffyPvpCard = functions.https.onRequest(
  {
    timeoutSeconds: 60,
    region: "asia-northeast2",
  },
  app,
);

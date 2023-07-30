import express from "express";
import { Client, middleware } from "@line/bot-sdk";

type Config = {
  channelSecret: string;
  channelAccessToken: string;
};

const config: Config = {
  channelSecret: process.env.CHANNEL_SECRET ?? "",
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN ?? "",
};

const client = new Client(config);

const PORT = process.env.PORT || 3000;
const app = express();

app.post("/", middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then((result) =>
    res.json(result),
  );
});

app.listen(PORT);

const handleEvent = (event: any) => {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }
  return client.replyMessage(event.replyToken, {
    type: "text",
    text: event.message.text,
  });
};

"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var bot_sdk_1 = require("@line/bot-sdk");
var config = {
    channelSecret: (_a = process.env.CHANNEL_SECRET) !== null && _a !== void 0 ? _a : "",
    channelAccessToken: (_b = process.env.CHANNEL_ACCESS_TOKEN) !== null && _b !== void 0 ? _b : "",
};
var client = new bot_sdk_1.Client(config);
var PORT = process.env.PORT || 3000;
var app = (0, express_1.default)();
app.post("/", (0, bot_sdk_1.middleware)(config), function (req, res) {
    Promise.all(req.body.events.map(handleEvent)).then(function (result) {
        return res.json(result);
    });
});
app.listen(PORT);
var handleEvent = function (event) {
    if (event.type !== "message" || event.message.type !== "text") {
        return Promise.resolve(null);
    }
    return client.replyMessage(event.replyToken, {
        type: "text",
        text: event.message.text,
    });
};

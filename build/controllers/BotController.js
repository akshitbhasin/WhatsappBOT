"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
const logger_1 = require("@overnightjs/logger");
const dialogflow_1 = require("src/utils/dialogflow");
const twilio_1 = require("src/utils/twilio");
let BotController = class BotController {
    postMessage(request, response) {
        const { Body, To, From } = request.body;
        dialogflow_1.runQuery(Body, From)
            .then((result) => {
            twilio_1.sendMessage(From, To, result.fulfillmentText)
                .then(res => {
                console.log(res);
            })
                .catch(error => {
                console.error("error is ", error);
                logger_1.Logger.Err(error);
            });
        })
            .catch(error => {
            console.error("error is", error);
            logger_1.Logger.Err(error);
        });
        return response.status(200).send("SUCCESS");
    }
};
tslib_1.__decorate([
    core_1.Post(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], BotController.prototype, "postMessage", null);
BotController = tslib_1.__decorate([
    core_1.Controller("api/bot")
], BotController);
exports.BotController = BotController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runQuery = void 0;
const tslib_1 = require("tslib");
const dialogflow = require("dialogflow");
const credentials = require("../../credentials.json");
const sessionClient = new dialogflow.sessionsClient({
    credentials: credentials
});
const projectId = process.env.DIALOGFLOW_PROJECT_ID;
exports.runQuery = (query, number) => {
    return new Promise((resolve, reject) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const sessionId = number;
            const sessionPath = sessionClient.sessionPath(projectId, sessionId);
            const request = {
                session: sessionPath,
                queryInput: {
                    test: {
                        text: query,
                        languageCode: "en-US"
                    }
                }
            };
            const responses = yield sessionClient.detectIntent(request);
            const result = responses[0].queryResult;
            resolve(result);
        }
        catch (error) {
            reject(error);
        }
    }));
};

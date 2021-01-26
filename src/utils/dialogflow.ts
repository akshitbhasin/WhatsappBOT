import { rejects } from "assert";

const dialogflow = require("dialogflow")
const credentials = require("../../credentials..json"); 

const sessionClient = new dialogflow.SessionsClient({
    credentials: credentials
});
const projectId: string = process.env.DIALOGFLOW_PROJECT_ID!;

export const runQuery = (query: string, number: string)=>{
    return new Promise(async (resolve, reject)=>{
        try{
            const sessionId = number;
            const sessionPath = sessionClient.sessionPath(projectId, sessionId);

            const request = {
                session: sessionPath,
                queryInput: {
                    text: {
                        text: query,
                        languageCode: "en-US"
                    }
                }
            };
            const responses = await sessionClient.detectIntent(request);
            const result = responses[0].queryResult;
            resolve(result);
        }
        catch(error){
            reject(error);
        }
    });
};
import{ Request, Response } from "express";
import { Controller, Post } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";
import { runQuery } from "../utils/dialogflow"
import { sendMessage } from "../utils/twilio";

@Controller("api/bot")
export class BotController{
    @Post()
    private postMessage(request: Request, response: Response) {
    const { Body, To, From } = request.body;
    
    runQuery(Body, From)
    .then((result:any)=>{
        sendMessage(From, To, result.fulfillmentText)
        .then(res=>{
            console.log(res);
        })
        .catch(error =>{
            console.error("error is ", error);
            Logger.Err(error);
        });
    })
    .catch(error =>{
        console.error("error is", error);
        Logger.Err(error);
    });
    return response.status(200).send("SUCCESS");
    }

}

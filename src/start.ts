import { config } from "dotenv";
import { format } from "path";
config(); 
import { AppServer } from "./AppServer";

const appServer = new AppServer();
appServer.start(3000);
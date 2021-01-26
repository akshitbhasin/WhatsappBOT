"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
const AppServer_1 = require("./AppServer");
const appServer = new AppServer_1.AppServer();
appServer.start(3000);

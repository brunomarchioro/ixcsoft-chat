import * as Server from "./server";
import { DataBase } from "./db";

DataBase.init();

Server.start();

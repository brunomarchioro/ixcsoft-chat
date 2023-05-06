import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { createServer } from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { UsersRouter } from "./users/users.router";
import { MessagesRouter } from "./messages/messages.router";
import { UsersWs } from "./users/users.ws";
import { MessagesWs } from "./messages/messages.ws";
import { MessagesService } from "./messages/messages.service";
import { UsersService } from "./users/users.service";
import { DataBase } from "./db";
import { Server as SocketServer } from "socket.io";

dotenv.config();

const port = process.env.PORT || 3000;

DataBase.init();

const app = express();
const httpServer = createServer(app);
const io = new SocketServer(httpServer);

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

const db = DataBase.getDb();

const messagesService = new MessagesService(db);
const usersService = new UsersService(db);

app.use("/users", UsersRouter.init(usersService));
app.use("/messages", MessagesRouter.init(messagesService));

UsersWs.init(usersService, io);
MessagesWs.init(messagesService, io);

httpServer.listen(port, () => {
  console.log(`Servidor executando en http://localhost:${port}`);
});

import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "ws";
import cors from "cors";
import bodyParser from "body-parser";
import { UsersRouter } from "./users/users.router";
import { MessagesRouter } from "./messages/messages.router";
import { UsersWs } from "./users/users.ws";
import { MessagesWs } from "./messages/messages.ws";
import { Message, MessagesService } from "./messages/messages.service";
import { User, UsersService } from "./users/users.service";

dotenv.config();
const port = process.env.PORT || 3000;

export interface Storage {
  users: User[];
  messages: Message[];
}

export function start(storage: Storage): void {
  const app = express();
  const server = createServer(app);
  const wss = new Server({ server });

  app.use(cors());
  app.use(bodyParser.json());
  app.use(morgan("tiny"));

  const messagesService = new MessagesService(storage.messages);
  const usersService = new UsersService(storage.users);

  app.use("/users", UsersRouter.init(usersService));
  app.use("/messages", MessagesRouter.init(messagesService));

  UsersWs.init(usersService, wss);
  MessagesWs.init(messagesService, wss);

  server.listen(port, () => {
    console.log(`Servidor executando en http://localhost:${port}`);
  });
}

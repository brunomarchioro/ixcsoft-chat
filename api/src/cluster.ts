import cluster, { Worker } from "cluster";
import os from "os";
import { DataBase } from "./db";
import * as http from "http";
import { setupMaster, setupWorker } from "@socket.io/sticky";
import { createAdapter, setupPrimary } from "@socket.io/cluster-adapter";
import express from "express";
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import { MessagesService } from "./messages/messages.service";
import { UsersService } from "./users/users.service";
import { UsersRouter } from "./users/users.router";
import { MessagesRouter } from "./messages/messages.router";
import { UsersWs } from "./users/users.ws";
import { MessagesWs } from "./messages/messages.ws";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

if (cluster.isPrimary) {
  const cores = os.cpus().length;

  console.log(`Total de núcleos: ${cores}`);
  console.log(`Processo principal ${process.pid} está rodando`);

  const httpServer = http.createServer();

  setupMaster(httpServer, {
    loadBalancingMethod: "least-connection",
  });
  setupPrimary();

  httpServer.listen(port, () => {
    console.log(`Servidor executando en http://localhost:${port}`);
  });

  DataBase.init();

  for (let i = 0; i < cores; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker: Worker, code) => {
    console.log(`Worker ${worker.process.pid} fechou com o código ${code}`);
    console.log("Criar novo worker!");
    cluster.fork();
  });
} else {
  const app = express();
  const httpServer = createServer(app);
  const io = new SocketServer(httpServer, { cors: { origin: "*" } });

  io.adapter(createAdapter());

  setupWorker(io);

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

  console.log(`Worker ${process.pid} está rodando`);
}

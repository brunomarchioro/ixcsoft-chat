import cluster, { Worker } from "cluster";
import os from "os";
import * as Server from "./server";
import { DataBase } from "./db";

if (cluster.isPrimary) {
  const cores = os.cpus().length;

  console.log(`Total de núcleos: ${cores}`);
  console.log(`Processo principal ${process.pid} está rodando`);

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
  Server.start();
}

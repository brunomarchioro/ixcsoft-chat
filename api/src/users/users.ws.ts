import { Server } from "socket.io";
import { UsersService } from "./users.service";

export class UsersWs {
  static init(usersService: UsersService, io: Server) {
    io.on("connection", (socket) => {
      socket.on("login", async (rawMessage: any) => {
        try {
          const newUser = await usersService.create(rawMessage);

          socket.emit("login", newUser);

          const sockets = await io.fetchSockets();
          for (const socket of sockets) {
            socket.emit("new-user", newUser);
          }
        } catch (e) {
          console.error("Erro ao processar mensagem", e);
        }
      });
    });
  }
}

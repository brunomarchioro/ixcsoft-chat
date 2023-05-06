import { Server } from "socket.io";
import { MessagesService } from "./messages.service";

export class MessagesWs {
  static init(messagesService: MessagesService, io: Server) {
    io.on("connection", (socket) => {
      socket.on("new-message", async (rawMessage: any) => {
        try {
          const newMessage = await messagesService.create(rawMessage);

          const sockets = await io.fetchSockets();
          for (const socket of sockets) {
            socket.emit("new-message", newMessage);
          }
        } catch (e) {
          console.error("Erro ao processar mensagem", e);
        }
      });
    });
  }
}

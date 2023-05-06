import WebSocket, { Server } from "ws";
import { MessagesService } from "./messages.service";

export class MessagesWs {
  static init(messagesService: MessagesService, wss: Server) {
    wss.on("connection", (ws) => {
      ws.on("message", (rawMessage: string) => {
        try {
          const message = JSON.parse(rawMessage);

          if (message.event === "new-message") {
            const newMessage = messagesService.create(message.payload);

            wss.clients.forEach((client) => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(
                  JSON.stringify({
                    event: "new-message",
                    payload: newMessage,
                  })
                );
              }
            });
          }
        } catch (e) {
          console.error("Erro ao processar mensagem", e);
        }
      });
    });
  }
}

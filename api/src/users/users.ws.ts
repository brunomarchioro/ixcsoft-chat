import WebSocket, { Server } from "ws";
import { UsersService } from "./users.service";

export class UsersWs {
  static init(usersService: UsersService, wss: Server) {
    wss.on("connection", (ws) => {
      ws.on("message", async (rawMessage: string) => {
        try {
          const message = JSON.parse(rawMessage);

          if (message.event === "login") {
            const newUser = await usersService.create(message.payload);

            ws.send(
              JSON.stringify({
                event: "login",
                payload: newUser,
              })
            );

            wss.clients.forEach((client) => {
              if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(
                  JSON.stringify({
                    event: "new-user",
                    payload: newUser,
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

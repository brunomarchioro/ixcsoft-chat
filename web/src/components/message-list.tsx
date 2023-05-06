import { useWebSocket } from "../hooks/use-websocket.ts";
import { useEffect, useState } from "react";
import { Message, MessagesClient } from "../lib/messages-client.ts";
import { User } from "../lib/users-client.ts";

interface MessageListProps {
  loggedUser: User;
  selectedUser: User;
}

function MessageList({ loggedUser, selectedUser }: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    MessagesClient.findAll({
      fromUserId: loggedUser.id,
      toUserId: selectedUser.id,
    }).then((ms) => {
      setMessages(ms);
    });
  }, [loggedUser, selectedUser]);

  useWebSocket({
    onWebSocketMessage: (wsMessage) => {
      if (wsMessage.event === "new-message") {
        if (
          (wsMessage.payload.fromUserId === loggedUser.id ||
            wsMessage.payload.fromUserId === selectedUser.id) &&
          (wsMessage.payload.toUserId === selectedUser.id ||
            wsMessage.payload.toUserId === loggedUser.id)
        ) {
          const message: Message = {
            id: wsMessage.payload.id,
            fromUserId: wsMessage.payload.fromUserId,
            toUserId: wsMessage.payload.toUserId,
            body: wsMessage.payload.body,
          };
          setMessages((ms) => [...ms, message]);
        }
      }
    },
  });

  return (
    <div style={{ width: "100%" }}>
      {messages.map((message, i) => {
        const isMyMessage = message.fromUserId === loggedUser.id;
        return (
          <div
            key={i}
            style={{
              padding: ".25em",
              textAlign: isMyMessage ? "left" : "right",
              overflowWrap: "normal",
            }}
          >
            <span className={`tag  ${isMyMessage ? "is-success" : "is-info"}`}>
              {isMyMessage ? loggedUser.name : selectedUser.name}
            </span>
            <p className="box">{message.body}</p>
          </div>
        );
      })}
    </div>
  );
}

export default MessageList;

import { FormEvent, useState } from "react";
import { useWebSocket } from "../hooks/use-websocket.ts";
import { User } from "../lib/users-client.ts";

interface MessageFormProps {
  loggedUser: User;
  selectedUser: User;
}

function MessageForm({ loggedUser, selectedUser }: MessageFormProps) {
  const [messageBody, setMessageBody] = useState<string>("");

  const { sendWebSocketMessage } = useWebSocket();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const message = {
      fromUserId: loggedUser.id,
      toUserId: selectedUser.id,
      body: messageBody,
    };

    setMessageBody("");
    sendWebSocketMessage({ event: "new-message", payload: message });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input"
            name="message"
            type="text"
            placeholder="Type your message"
            value={messageBody}
            onChange={(e) => setMessageBody(e.target.value)}
            required={true}
          />
        </div>
        <div className="control">
          <button className="button is-info">Enviar</button>
        </div>
      </div>
    </form>
  );
}

export default MessageForm;

import MessageList from "../components/message-list.tsx";
import MessageForm from "../components/message-form.tsx";
import UserList from "../components/user-list.tsx";
import { useState } from "react";
import { User } from "../lib/users-client.ts";

interface ChatScreenProps {
  loggedUser: User;
}

function ChatScreen({ loggedUser }: ChatScreenProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div
      className="is-flex is-flex-direction-column"
      style={{ minHeight: "100vh" }}
    >
      <div className="columns" style={{ flex: 1 }}>
        <div className="column is-flex is-flex-direction-column">
          <div className="has-background-info">
            <div className="m-2">
              <h1>Logado como: {loggedUser.name}</h1>
            </div>
          </div>

          <div className="pt-2" style={{ flex: 1, backgroundColor: "#225b70" }}>
            <UserList
              loggedUser={loggedUser}
              selectedUser={selectedUser}
              onSelectUser={(user) => {
                setSelectedUser(user);
              }}
            />
          </div>
        </div>

        <div className="column is-four-fifths is-flex">
          {selectedUser && (
            <div
              className="is-flex is-flex-direction-column m-3"
              style={{ flex: 1 }}
            >
              <div className="box">Conversando com: {selectedUser.name}</div>

              <div style={{ flex: 1 }}>
                <MessageList
                  loggedUser={loggedUser}
                  selectedUser={selectedUser}
                />
              </div>

              <div className="m-5">
                <MessageForm
                  loggedUser={loggedUser}
                  selectedUser={selectedUser}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;

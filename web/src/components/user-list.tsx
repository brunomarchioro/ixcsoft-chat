import { useEffect, useState } from "react";
import { User, UsersClient } from "../lib/users-client.ts";
import { useWebSocket } from "../hooks/use-websocket.ts";

interface UserListProps {
  loggedUser: User;
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
}

function UserList({ loggedUser, selectedUser, onSelectUser }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    UsersClient.findAll().then((users) => {
      setUsers(users.filter((u) => u.id !== loggedUser.id));
    });
  }, []);

  useWebSocket({
    onWebSocketMessage: (wsMessage) => {
      if (wsMessage.event === "new-user") {
        const user: User = {
          id: wsMessage.payload.id,
          name: wsMessage.payload.name,
        };
        setUsers((us) => [...us, user]);
      }
    },
  });

  return (
    <div className="m-2">
      {users.map((user, i) => {
        return (
          <div
            key={i}
            className="mb-2"
            onClick={() => {
              onSelectUser(user);
            }}
          >
            <span
              className={`tag is-medium ${
                selectedUser?.id === user.id ? "is-link" : "is-light"
              }`}
            >
              {user.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default UserList;

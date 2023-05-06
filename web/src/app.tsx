import { useEffect, useState } from "react";
import LoginScreen from "./screens/login.tsx";
import ChatScreen from "./screens/chat.tsx";
import { User, UsersClient } from "./lib/users-client.ts";
import { useWebSocket } from "./hooks/use-websocket.ts";

const LOGGED_USER_KEY = "logged-user";

function App() {
  const [screen, setScreen] = useState("login");
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  useWebSocket({
    onWebSocketClose: () => {
      setLoggedUser(null);
      setScreen("login");
      window.sessionStorage.removeItem(LOGGED_USER_KEY);
    },
  });

  useEffect(() => {
    if (loggedUser) {
      setScreen("chat");
      return;
    }

    try {
      const rawSessionUser = window.sessionStorage.getItem(LOGGED_USER_KEY);
      if (rawSessionUser) {
        const sessionUser = JSON.parse(rawSessionUser);
        UsersClient.getById(sessionUser.id).then((user) => {
          if (user) {
            setLoggedUser(user);
            setScreen("chat");
          } else {
            window.sessionStorage.removeItem(LOGGED_USER_KEY);
          }
        });
      }
    } catch (error) {
      console.warn(`Erro ao obter usuário da sessionStorage:`, error);
    }
  }, [screen, setScreen, loggedUser, setLoggedUser]);

  useWebSocket({
    onWebSocketMessage: (wsMessage) => {
      if (wsMessage.event === "login") {
        const user: User = {
          id: wsMessage.payload.id,
          name: wsMessage.payload.name,
        };
        setLoggedUser(user);
        setScreen("chat");
        window.sessionStorage.setItem(LOGGED_USER_KEY, JSON.stringify(user));
      }
    },
  });

  if (screen === "chat" && loggedUser) {
    return <ChatScreen loggedUser={loggedUser} />;
  }

  if (screen === "login") {
    return <LoginScreen />;
  }

  return null;
}

export default App;

import { useEffect, useState } from "react";

const WS_SERVER_HOST =
  import.meta.env.VITE_WS_SERVER_HOST || "ws://localhost:3000";
const SOCKET_RECONNECTION_TIMEOUT = 3000;

let webSocketConnection = new WebSocket(WS_SERVER_HOST);

export interface WebSocketMessage {
  event: string;
  payload: any;
}

export interface UseWebSocketProps {
  onWebSocketMessage?: (message: WebSocketMessage) => void;
  onWebSocketClose?: () => void;
}

export interface UseWebSocketReturn {
  webSocket: WebSocket;
  sendWebSocketMessage: (message: WebSocketMessage) => void;
}

export function useWebSocket(props?: UseWebSocketProps): UseWebSocketReturn {
  const [webSocket, setWebSocket] = useState<WebSocket>(webSocketConnection);

  useEffect(() => {
    const onClose = () => {
      props?.onWebSocketClose && props.onWebSocketClose();

      setTimeout(() => {
        window.location.reload();
      }, SOCKET_RECONNECTION_TIMEOUT);
    };

    webSocket.addEventListener("close", onClose);

    return () => {
      webSocket.removeEventListener("close", onClose);
    };
  }, [webSocket, setWebSocket, props?.onWebSocketClose]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      try {
        const json = JSON.parse(event.data);
        props?.onWebSocketMessage && props.onWebSocketMessage(json);
      } catch (err) {
        console.log(err);
      }
    };

    webSocket.addEventListener("message", onMessage);

    return () => {
      webSocket.removeEventListener("message", onMessage);
    };
  }, [webSocket, setWebSocket, props?.onWebSocketMessage]);

  const sendWebSocketMessage = (message: WebSocketMessage) => {
    webSocket.send(JSON.stringify(message));
  };

  return { webSocket, sendWebSocketMessage };
}

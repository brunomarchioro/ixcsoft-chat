import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const WS_SERVER_HOST =
  import.meta.env.VITE_WS_SERVER_HOST || "http://localhost:3000";
const SOCKET_RECONNECTION_TIMEOUT = 10000;

let socketConnection = io(WS_SERVER_HOST);

export interface WebSocketMessage {
  event: string;
  payload: any;
}

export interface UseWebSocketProps {
  onWebSocketMessage?: (message: WebSocketMessage) => void;
  onWebSocketClose?: () => void;
}

export interface UseWebSocketReturn {
  socket: Socket;
  sendWebSocketMessage: (message: WebSocketMessage) => void;
}

export function useWebSocket(props?: UseWebSocketProps): UseWebSocketReturn {
  const [socket, setSocket] = useState<Socket>(socketConnection);

  useEffect(() => {
    const onClose = () => {
      props?.onWebSocketClose && props.onWebSocketClose();

      setTimeout(() => {
        window.location.reload();
      }, SOCKET_RECONNECTION_TIMEOUT);
    };

    socket.on("disconnect", onClose);

    return () => {
      socket.off("disconnect", onClose);
    };
  }, [socket, setSocket, props?.onWebSocketClose]);

  useEffect(() => {
    const onMessage = (eventName: string, payload: any) => {
      try {
        props?.onWebSocketMessage &&
          props.onWebSocketMessage({ event: eventName, payload });
      } catch (err) {
        console.log(err);
      }
    };

    socket.onAny(onMessage);

    return () => {
      socket.offAny(onMessage);
    };
  }, [socket, setSocket, props?.onWebSocketMessage]);

  const sendWebSocketMessage = (message: WebSocketMessage) => {
    socket.emit(message.event, message.payload);
  };

  return { socket, sendWebSocketMessage };
}

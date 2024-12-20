"use client";

import React, {
  Children,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  children?: React.ReactNode;
}

interface ISocketContext {
  sendMessage: (msg: String) => any;
  messages: String[];
}

const ScoketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(ScoketContext);
  if (!state) throw new Error(`state not defined`);

  return state;
};

export const ScoketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessage] = useState<String[]>([]);
  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (msg) => {
      console.log("Send Message- " + msg);
      if (socket) {
        console.log("emeting the message");
        socket.emit("event:message", { message: msg });
      }
    },
    [socket]
  );

  const onMessageRec = useCallback((msg: string) => {
    console.log("Message Recived from server - " + msg);
    // const { message } = JSON.parse(msg) as { message: string };
    const { message } = JSON.parse(JSON.stringify(msg)) as { message: string };
    setMessage((prev) => [...prev, message]);
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:8000");
    _socket.on("event:message", onMessageRec);
    setSocket(_socket);
    return () => {
      _socket.disconnect();
      _socket.off("event:message", onMessageRec);
      setSocket(undefined);
    };
  }, []);
  return (
    <ScoketContext.Provider value={{ sendMessage, messages }}>
      {children}
    </ScoketContext.Provider>
  );
};

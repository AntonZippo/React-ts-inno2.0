import { useState, useEffect, useRef, useCallback } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "server";
  timestamp: Date;
}

export const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const messageIdRef = useRef(0);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
      setConnectionError(null);

      setMessages([
        {
          id: messageIdRef.current++,
          text: "Connected to chat server. You can start messaging!",
          sender: "server",
          timestamp: new Date(),
        },
      ]);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
      setMessages((prev) => [
        ...prev,
        {
          id: messageIdRef.current++,
          text: "Disconnected from server. Please refresh the page to reconnect.",
          sender: "server",
          timestamp: new Date(),
        },
      ]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnectionError("Connection error occurred");
    };

    ws.onmessage = (event) => {
      const data = event.data;
      setMessages((prev) => [
        ...prev,
        {
          id: messageIdRef.current++,
          text: data,
          sender: "server",
          timestamp: new Date(),
        },
      ]);
    };

    return () => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
    };
  }, [url]);

  const sendMessage = useCallback((text: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN && text.trim()) {
      wsRef.current.send(text.trim());
      setMessages((prev) => [
        ...prev,
        {
          id: messageIdRef.current++,
          text: text.trim(),
          sender: "user",
          timestamp: new Date(),
        },
      ]);
    } else if (wsRef.current?.readyState !== WebSocket.OPEN) {
      setMessages((prev) => [
        ...prev,
        {
          id: messageIdRef.current++,
          text: "Cannot send message: not connected to server.",
          sender: "server",
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  return { messages, isConnected, connectionError, sendMessage, clearChat };
};

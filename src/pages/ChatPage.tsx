import React, { useState, useRef, useEffect } from "react";
import { useWebSocket } from "../hooks/useWebSocket";

const WS_URL = "wss://ws.ifelse.io";

const Chat: React.FC = () => {
  const [input, setInput] = useState("");
  const { messages, isConnected, connectionError, sendMessage, clearChat } =
    useWebSocket(WS_URL);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && isConnected) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 border rounded-lg shadow bg-white dark:bg-gray-700">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold dark:text-white">
            💬 WebSocket Chat
          </h2>
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isConnected
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {isConnected ? "● Connected" : "● Disconnected"}
          </div>
        </div>
        <button
          onClick={clearChat}
          className="text-sm text-gray-500 hover:text-red-500 transition dark:text-white"
        >
          🗑️ Clear
        </button>
      </div>

      {connectionError && (
        <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 rounded text-sm">
          ⚠️ {connectionError}
        </div>
      )}

      <div className="h-96 overflow-y-auto mb-4 p-3 bg-gray-50 rounded-lg border">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            {isConnected
              ? "Start typing a message..."
              : "Connecting to chat server..."}
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-2xl ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : msg.sender === "server"
                      ? "bg-gray-300 text-gray-800 rounded-bl-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                <div className="text-sm break-words">{msg.text}</div>
                <div
                  className={`text-xs mt-1 ${
                    msg.sender === "user" ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isConnected ? "Type a message..." : "Connecting..."}
          disabled={!isConnected}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:bg-white"
        />
        <button
          type="submit"
          disabled={!isConnected || !input.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Send
        </button>
      </form>

      <div className="mt-3 text-xs text-gray-400 text-center">
        💡 Connected to wss://ws.ifelse.io (public WebSocket server)
      </div>
    </div>
  );
};

export default Chat;

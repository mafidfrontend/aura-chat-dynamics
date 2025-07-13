import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API_BASE = "https://chat-app-bb-tai4.onrender.com/api";
let socket: any;

interface Message {
  _id: string;
  sender: string;
  text: string;
  createdAt: string;
}

interface ChatProps {
  chatId: string;
  userId: string;
}

const Chat: React.FC<ChatProps> = ({ chatId, userId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    socket = io(API_BASE);
    socket.emit("join", chatId);

    socket.on("receiveMessage", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [chatId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${API_BASE}/message/${chatId}`, {
          withCredentials: true,
        });

        const data = res.data?.data;
        if (!Array.isArray(data))
          throw new Error("Messages not in array format");

        setMessages(data);
      } catch (err) {
        console.error("Xabarlarni olishda xato:", err);
      }
    };

    fetchMessages();
  }, [chatId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const res = await axios.post(
        `${API_BASE}/message/send/${chatId}`,
        { text: newMessage },
        { withCredentials: true }
      );
      const message = res.data.data || res.data;
      setMessages((prev) => [...prev, message]);
      socket.emit("sendMessage", message);
      setNewMessage("");
    } catch (err) {
      console.error("Yuborishda xato:", err);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full p-4 overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`p-2 rounded-md w-fit max-w-xs ${
              msg.sender === userId
                ? "ml-auto bg-blue-500 text-white"
                : "bg-gray-100 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2 pt-4">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage} disabled={!newMessage.trim()}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Chat;

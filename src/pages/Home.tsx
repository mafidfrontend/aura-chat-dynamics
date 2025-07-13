import Navbar from "@/components/layout/Navbar";
import { useChats } from "@/hooks/useChats";
import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Chat from "@/components/layout/Chat";
import { useAuth } from "@/context/AuthContext";

const Home: React.FC = () => {
  const { chats, loading, error } = useChats();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const currentChat = chats.find((c) => c._id === selectedChat);

  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto p-4 h-[calc(100vh-4rem)]">
        <div className="flex h-full gap-4">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-80 flex flex-col"
          >
            <Card className="flex-1 card-glass border-0 shadow-soft">
              <CardHeader className="pb-3">
                <h2 className="text-lg font-semibold">Messages</h2>
              </CardHeader>
              <CardContent className="p-0">
                {loading && (
                  <p className="p-4 text-sm text-muted-foreground">Loading…</p>
                )}
                {error && (
                  <p className="p-4 text-sm text-destructive">{error}</p>
                )}

                <div className="space-y-1">
                  {chats.map((chat) => (
                    <motion.div
                      key={chat._id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedChat(chat._id)}
                      className={`p-3 cursor-pointer transition-all duration-200 mx-3 rounded-lg ${
                        selectedChat === chat._id
                          ? "bg-gradient-primary text-white"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      {chat.fullName}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex-1 card-glass border-0 shadow-soft rounded-xl overflow-hidden"
          >
            {selectedChat ? (
              <Chat
                chatId={selectedChat}
                userId={user._id} // <-- bu qiymatni `useAuth` orqali oling
              />
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Select a chat to start messaging
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
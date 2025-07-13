import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Smile, Paperclip, MoreVertical, Phone, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Navbar from '@/components/layout/Navbar';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
  sender?: {
    name: string;
    avatar?: string;
  };
}

interface Chat {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isOnline: boolean;
}

const Home: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string>('1');
  const [newMessage, setNewMessage] = useState('');

  // Mock data
  const chats: Chat[] = [
    {
      id: '1',
      name: 'Sarah Wilson',
      lastMessage: 'Hey! How are you doing today?',
      timestamp: '2 min ago',
      unread: 2,
      isOnline: true
    },
    {
      id: '2',
      name: 'John Smith',
      lastMessage: 'Thanks for the help with the project!',
      timestamp: '1 hour ago',
      unread: 0,
      isOnline: true
    },
    {
      id: '3',
      name: 'Design Team',
      lastMessage: 'Alice: The new mockups look amazing 🎨',
      timestamp: '3 hours ago',
      unread: 5,
      isOnline: false
    },
    {
      id: '4',
      name: 'Mom',
      lastMessage: 'Don\'t forget about dinner on Sunday!',
      timestamp: 'Yesterday',
      unread: 1,
      isOnline: false
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      text: 'Hey! How are you doing today?',
      timestamp: '10:30 AM',
      isOwn: false,
      sender: { name: 'Sarah Wilson' }
    },
    {
      id: '2',
      text: 'I\'m doing great! Just finished working on the new chat app design.',
      timestamp: '10:32 AM',
      isOwn: true
    },
    {
      id: '3',
      text: 'That sounds exciting! I\'d love to see it when you\'re ready to share.',
      timestamp: '10:33 AM',
      isOwn: false,
      sender: { name: 'Sarah Wilson' }
    },
    {
      id: '4',
      text: 'Absolutely! I think you\'ll really like the gradient themes and animations we\'ve implemented.',
      timestamp: '10:35 AM',
      isOwn: true
    }
  ];

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Here you would normally send the message to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const selectedChatData = chats.find(chat => chat.id === selectedChat);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto p-4 h-[calc(100vh-4rem)]">
        <div className="flex h-full gap-4">
          {/* Chat List */}
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
                <div className="space-y-1">
                  {chats.map((chat) => (
                    <motion.div
                      key={chat.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedChat(chat.id)}
                      className={`p-3 cursor-pointer transition-all duration-200 mx-3 rounded-lg ${
                        selectedChat === chat.id
                          ? 'bg-gradient-primary text-white'
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={chat.avatar} />
                            <AvatarFallback className="bg-gradient-secondary">
                              {chat.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {chat.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium truncate">{chat.name}</h3>
                            <span className={`text-xs ${
                              selectedChat === chat.id ? 'text-white/70' : 'text-muted-foreground'
                            }`}>
                              {chat.timestamp}
                            </span>
                          </div>
                          <p className={`text-sm truncate ${
                            selectedChat === chat.id ? 'text-white/80' : 'text-muted-foreground'
                          }`}>
                            {chat.lastMessage}
                          </p>
                        </div>
                        {chat.unread > 0 && (
                          <div className="bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded-full min-w-[1.5rem] text-center">
                            {chat.unread}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Chat Area */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex-1 flex flex-col"
          >
            <Card className="flex-1 card-glass border-0 shadow-soft flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b border-border/50 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedChatData?.avatar} />
                      <AvatarFallback className="bg-gradient-secondary">
                        {selectedChatData?.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedChatData?.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedChatData?.isOnline ? 'Online' : 'Last seen recently'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${message.isOwn ? 'chat-bubble-sent' : 'chat-bubble-received'}`}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.isOwn ? 'text-white/70' : 'text-muted-foreground'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t border-border/50">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="pr-10"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2"
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    onClick={sendMessage}
                    className="btn-gradient"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-hero">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="inline-block p-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 mb-4"
          >
            <MessageSquare className="h-12 w-12 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white text-shadow mb-2">
            ChatApp
          </h1>
          <p className="text-white/80 text-lg">
            Connect with friends in a beautiful, modern chat experience
          </p>
        </motion.div>

        {/* Auth Forms */}
        <AnimatePresence mode="wait">
          {isLogin ? (
            <LoginForm key="login" onSwitchToRegister={() => setIsLogin(false)} />
          ) : (
            <RegisterForm key="register" onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-white/60 text-sm">
            © 2025 ChatApp. Crafted with ❤️ for modern communication.
          </p>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            x: [0, 10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 right-20 w-24 h-24 bg-white/10 rounded-full blur-xl"
        />
      </div>
    </div>
  );
};

export default Auth;
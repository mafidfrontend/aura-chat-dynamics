import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Type, Moon, Sun, Monitor, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/layout/Navbar';
import { useTheme, themes, fontOptions } from '@/context/ThemeContext';

const Settings: React.FC = () => {
  const { currentTheme, currentFont, isDark, setTheme, setFont, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto p-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gradient mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Customize your ChatApp experience with themes, fonts, and display preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Theme Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <Card className="card-glass border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Color Theme
                  </CardTitle>
                  <CardDescription>
                    Choose from our collection of premium gradient themes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {themes.map((theme) => (
                      <motion.div
                        key={theme.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setTheme(theme)}
                        className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-200 ${
                          currentTheme.id === theme.id
                            ? 'border-primary shadow-glow'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div
                          className="h-16 rounded-lg mb-3"
                          style={{ background: theme.gradient }}
                        />
                        <h3 className="font-medium text-sm">{theme.name}</h3>
                        <div className="flex gap-1 mt-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ background: theme.preview.primary }}
                          />
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ background: theme.preview.secondary }}
                          />
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ background: theme.preview.accent }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Live Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Dark Mode Toggle */}
              <Card className="card-glass border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    Display Mode
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                      <Label htmlFor="dark-mode">{isDark ? 'Dark' : 'Light'} Mode</Label>
                    </div>
                    <Switch
                      id="dark-mode"
                      checked={isDark}
                      onCheckedChange={toggleDarkMode}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Live Preview Card */}
              <Card className="card-glass border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Live Preview
                  </CardTitle>
                  <CardDescription>
                    See how your choices look in action
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Sample Chat Bubble Sent */}
                    <div className="flex justify-end">
                      <div className={`chat-bubble-sent text-xs ${currentFont.className}`}>
                        Hey! This looks amazing! 🎨
                      </div>
                    </div>
                    
                    {/* Sample Chat Bubble Received */}
                    <div className="flex justify-start">
                      <div className={`chat-bubble-received text-xs ${currentFont.className}`}>
                        I love the new theme! ✨
                      </div>
                    </div>

                    {/* Sample Button */}
                    <Button className={`w-full btn-gradient ${currentFont.className}`} size="sm">
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Font Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="card-glass border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="h-5 w-5" />
                  Typography
                </CardTitle>
                <CardDescription>
                  Select your preferred font family for the interface
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {fontOptions.map((font) => (
                    <motion.div
                      key={font.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFont(font)}
                      className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-200 ${
                        currentFont.id === font.id
                          ? 'border-primary shadow-glow bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <h3 className="font-medium mb-2">{font.name}</h3>
                      <p className={`text-sm text-muted-foreground ${font.className}`}>
                        {font.preview}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Save Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <p className="text-sm text-muted-foreground">
              ✨ All changes are automatically saved to your preferences
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
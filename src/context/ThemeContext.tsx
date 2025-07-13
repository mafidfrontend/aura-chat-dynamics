import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Theme {
  id: string;
  name: string;
  className: string;
  gradient: string;
  preview: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const themes: Theme[] = [
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    className: '',
    gradient: 'linear-gradient(135deg, hsl(217, 91%, 60%) 0%, hsl(230, 91%, 65%) 100%)',
    preview: {
      primary: 'hsl(217, 91%, 60%)',
      secondary: 'hsl(214, 32%, 91%)',
      accent: 'hsl(217, 91%, 60%)'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    className: 'theme-sunset',
    gradient: 'linear-gradient(135deg, hsl(14, 90%, 53%) 0%, hsl(38, 92%, 50%) 100%)',
    preview: {
      primary: 'hsl(14, 90%, 53%)',
      secondary: 'hsl(214, 32%, 91%)',
      accent: 'hsl(38, 92%, 50%)'
    }
  },
  {
    id: 'forest',
    name: 'Forest Green',
    className: 'theme-forest',
    gradient: 'linear-gradient(135deg, hsl(142, 76%, 36%) 0%, hsl(120, 76%, 40%) 100%)',
    preview: {
      primary: 'hsl(142, 76%, 36%)',
      secondary: 'hsl(214, 32%, 91%)',
      accent: 'hsl(120, 76%, 40%)'
    }
  },
  {
    id: 'royal',
    name: 'Royal Purple',
    className: 'theme-royal',
    gradient: 'linear-gradient(135deg, hsl(265, 85%, 58%) 0%, hsl(280, 85%, 60%) 100%)',
    preview: {
      primary: 'hsl(265, 85%, 58%)',
      secondary: 'hsl(214, 32%, 91%)',
      accent: 'hsl(280, 85%, 60%)'
    }
  },
  {
    id: 'rose',
    name: 'Rose Blush',
    className: 'theme-rose',
    gradient: 'linear-gradient(135deg, hsl(330, 81%, 60%) 0%, hsl(345, 81%, 62%) 100%)',
    preview: {
      primary: 'hsl(330, 81%, 60%)',
      secondary: 'hsl(214, 32%, 91%)',
      accent: 'hsl(345, 81%, 62%)'
    }
  },
  {
    id: 'aurora',
    name: 'Aurora Borealis',
    className: 'theme-aurora',
    gradient: 'linear-gradient(135deg, hsl(195, 85%, 55%) 0%, hsl(170, 85%, 57%) 100%)',
    preview: {
      primary: 'hsl(195, 85%, 55%)',
      secondary: 'hsl(214, 32%, 91%)',
      accent: 'hsl(170, 85%, 57%)'
    }
  },
  {
    id: 'cosmic',
    name: 'Cosmic Violet',
    className: 'theme-cosmic',
    gradient: 'linear-gradient(135deg, hsl(250, 85%, 60%) 0%, hsl(270, 85%, 62%) 100%)',
    preview: {
      primary: 'hsl(250, 85%, 60%)',
      secondary: 'hsl(214, 32%, 91%)',
      accent: 'hsl(270, 85%, 62%)'
    }
  },
  {
    id: 'golden',
    name: 'Golden Hour',
    className: 'theme-golden',
    gradient: 'linear-gradient(135deg, hsl(45, 90%, 51%) 0%, hsl(35, 90%, 53%) 100%)',
    preview: {
      primary: 'hsl(45, 90%, 51%)',
      secondary: 'hsl(214, 32%, 91%)',
      accent: 'hsl(35, 90%, 53%)'
    }
  },
  {
    id: 'midnight',
    name: 'Midnight Blue',
    className: 'theme-midnight',
    gradient: 'linear-gradient(135deg, hsl(220, 100%, 50%) 0%, hsl(240, 100%, 52%) 100%)',
    preview: {
      primary: 'hsl(220, 100%, 50%)',
      secondary: 'hsl(214, 32%, 91%)',
      accent: 'hsl(240, 100%, 52%)'
    }
  }
];

export interface FontOption {
  id: string;
  name: string;
  className: string;
  preview: string;
}

export const fontOptions: FontOption[] = [
  {
    id: 'inter',
    name: 'Inter',
    className: 'font-inter',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
  {
    id: 'mono',
    name: 'JetBrains Mono',
    className: 'font-mono',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
  {
    id: 'display',
    name: 'Playfair Display',
    className: 'font-display',
    preview: 'The quick brown fox jumps over the lazy dog'
  }
];

interface ThemeContextType {
  currentTheme: Theme;
  currentFont: FontOption;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  setFont: (font: FontOption) => void;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [currentFont, setCurrentFont] = useState<FontOption>(fontOptions[0]);
  const [isDark, setIsDark] = useState(false);

  // Load saved preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem('chat-theme');
    const savedFont = localStorage.getItem('chat-font');
    const savedDarkMode = localStorage.getItem('chat-dark-mode');

    if (savedTheme) {
      const theme = themes.find(t => t.id === savedTheme);
      if (theme) setCurrentTheme(theme);
    }

    if (savedFont) {
      const font = fontOptions.find(f => f.id === savedFont);
      if (font) setCurrentFont(font);
    }

    if (savedDarkMode) {
      setIsDark(savedDarkMode === 'true');
    }
  }, []);

  // Apply theme and font changes
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    themes.forEach(theme => {
      if (theme.className) {
        root.classList.remove(theme.className);
      }
    });

    // Remove all font classes
    fontOptions.forEach(font => {
      root.classList.remove(font.className);
    });

    // Apply current theme
    if (currentTheme.className) {
      root.classList.add(currentTheme.className);
    }

    // Apply current font
    root.classList.add(currentFont.className);

    // Apply dark mode
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [currentTheme, currentFont, isDark]);

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('chat-theme', theme.id);
  };

  const setFont = (font: FontOption) => {
    setCurrentFont(font);
    localStorage.setItem('chat-font', font.id);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem('chat-dark-mode', newDarkMode.toString());
  };

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      currentFont,
      isDark,
      setTheme,
      setFont,
      toggleDarkMode
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
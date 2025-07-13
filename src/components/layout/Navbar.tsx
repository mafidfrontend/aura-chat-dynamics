import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Settings, User, LogOut, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-2 rounded-xl bg-gradient-primary"
          >
            <MessageSquare className="h-6 w-6 text-white" />
          </motion.div>
          <span className="text-xl font-semibold text-gradient">
            ChatApp
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/home">
            <Button
              variant={isActive('/home') ? 'default' : 'ghost'}
              className={isActive('/home') ? 'bg-gradient-primary text-white' : ''}
            >
              Home
            </Button>
          </Link>
          <Link to="/settings">
            <Button
              variant={isActive('/settings') ? 'default' : 'ghost'}
              className={isActive('/settings') ? 'bg-gradient-primary text-white' : ''}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </Link>
          <Link to="/profile">
            <Button
              variant={isActive('/profile') ? 'default' : 'ghost'}
              className={isActive('/profile') ? 'bg-gradient-primary text-white' : ''}
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </Link>
        </div>

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="transition-smooth"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.profilePic} alt={user?.fullName} />
                  <AvatarFallback className="bg-gradient-primary text-white">
                    {user?.fullName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium leading-none">{user?.fullName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-destructive"
                onClick={() => {
                  logout
                  navigate("/auth")
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
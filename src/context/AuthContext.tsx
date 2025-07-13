import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

const API_BASE = "https://chat-app-bb-tai4.onrender.com/api";

export interface User {
  _id: string;
  fullName: string;
  email: string;
  profilePic?: string;
  updatedAt: string;
  accountStatus: "Active" | "Inactive";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  updatePhoto: (file: File) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const res = await axios.get(`${API_BASE}/auth/check`, {
        withCredentials: true,
      });
      setUser(res.data.data);
    } catch (err) {
      setUser(null);
    }
  };

  axios.defaults.withCredentials = true;

  const saveUserData = (userData: User) => {
    localStorage.setItem("chat-user", JSON.stringify(userData));
  };

  const clearUserData = () => {
    localStorage.removeItem("chat-user");
  };

  const updatePhoto = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    await axios.post(`${API_BASE}/auth/update-photo`, formData, {
      withCredentials: true,
    });
    await refreshUser();
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("chat-user");

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Invalid user data in localStorage:", err);
        clearUserData();
      }
    } else {
      axios
        .get(`${API_BASE}/auth/check`, { withCredentials: true })
        .then((res) => {
          const data = res.data?.data;

          if (!data) throw new Error("No user data returned");

          const userData: User = {
            _id: data._id,
            fullName: data.fullName,
            email: data.email,
            profilePic: data.profilePic || undefined,
            updatedAt: data.updatedAt,
            accountStatus: "Active",
          };

          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem("chat-user", JSON.stringify(userData));
        })
        .catch((err) => {
          console.error("User check failed:", err);
          clearUserData();
        });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${API_BASE}/auth/sign-in`, {
        email,
        password,
      });

      const { user: userData } = data;

      saveUserData(userData);
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error("Login failed", err);
      clearUserData();
      setUser(null);
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    fullName: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${API_BASE}/auth/sign-up`, {
        fullName,
        email,
        password,
      });

      const { user: userData } = data;
      saveUserData(userData);
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error("Registration failed", err);
      clearUserData();
      setUser(null);
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_BASE}/auth/logout`);
    } catch (error) {
      console.error("Logout failed on backend:", error);
    } finally {
      clearUserData();
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) {
      console.warn("Cannot update profile: No user logged in.");
      return;
    }
    try {
      const { data } = await axios.patch(
        `${API_BASE}/users/${user._id}`,
        updates
      );
      const updatedUser = { ...user, ...data } as User;
      setUser(updatedUser);
      saveUserData(updatedUser);
      await refreshUser();
    } catch (err) {
      console.error("Update profile failed", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        updatePhoto,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

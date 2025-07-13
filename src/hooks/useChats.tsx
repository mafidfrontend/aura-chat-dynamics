import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "https://chat-app-bb-tai4.onrender.com/api";

export interface Chat {
  createdAt: string;
  email: string;
  fullName: string;
  profilePic: string;
  updatedAt: string;
  _id: string;
}

export const useChats = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(`${API_BASE}/message/users`);

        if (!cancelled) {
          const now = new Date();

          setChats(
            data.data.map(
              (u: any): Chat => ({
                _id: u._id,
                fullName: u.fullName,
                profilePic: u.profilePic || undefined,
                createdAt: now.toLocaleTimeString(),
                email: u.email,
                updatedAt: u.updatedAt
              })
            )
          );
        }
      } catch (err: any) {
        if (!cancelled) {
          console.error("Failed to fetch chats:", err);
          setError(
            err?.response?.data?.message ||
              err?.message ||
              "Unknown error fetching chats"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { chats, loading, error };
};

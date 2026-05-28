// store/auth.store.ts
import { create } from "zustand";

type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string | null;
  phone: string | null;
  avatarUrl: string | null;
  role: string;
  isVerified: boolean;
};

type AuthStore = {
  user: AuthUser | null;
  accessToken: string;
  setUser: (user: AuthUser) => void;
  setAccessToken: (token: string) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: "",
  setUser: (user) => set({ user }),
  setAccessToken: (accessToken) => set({ accessToken }),
  clear: () => set({ user: null, accessToken: "" }),
}));

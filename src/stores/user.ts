import { create } from "zustand";

interface User {
  nickname: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
}

interface UserState {
  user: Partial<User>;
  removeUser: () => void;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {},
  removeUser: () => set({ user: {} }),
  setUser: (user) => set({ user }),
}));

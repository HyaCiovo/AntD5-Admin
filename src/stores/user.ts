import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface User {
  username: string;
  email: string;
  avatar: string;
  role: string;
  phone: string;
}

interface UserState {
  user: Partial<User>;
  removeUser: () => void;
  setUser: (user: Partial<User>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {},
      removeUser: () => set({ user: {} }),
      setUser: (user) => set({ user }),
    }),
    { name: "user-info", storage: createJSONStorage(() => sessionStorage) }
  )
);

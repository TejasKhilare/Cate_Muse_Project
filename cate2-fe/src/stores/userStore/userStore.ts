import { create } from 'zustand';
import type { User } from '@/types/users.types.ts';


interface UserStore {
  userData: User | null;
  setUserData: (user: User) => void;
  getUserData: () => User | null;
  getIsAdmin: () => boolean;
}

export const useUserStore = create<UserStore>()(
  (set, get) => ({
    userData: null,

    setUserData: (user?: User) => {
      set(() => ({
        userData: user || null,
        isAdmin: user?.roles.includes('admin') ?? false,
      }));
    },

    getUserData: () => get().userData,

    getIsAdmin: () => {
      const user = get().userData;
      return user?.roles.includes('admin') ?? false;
    },
  }),
);

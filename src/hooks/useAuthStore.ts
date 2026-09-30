import { create } from "zustand";
import { allMockUsers } from "@/data/users";
import type { User } from "@/types";

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,

  user: null,

  login: async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (password !== "123456") {
      throw new Error(
        "Senha de demonstração incorreta. Use 123456.",
      );
    }

    const user = allMockUsers.find(
      (item) => item.email.toLowerCase() === normalizedEmail,
    );

    if (!user) {
      throw new Error(
        "Conta não encontrada. Use uma das contas de teste do projeto.",
      );
    }

    set({
      isAuthenticated: true,
      user,
    });
  },

  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
    });
  },
}));
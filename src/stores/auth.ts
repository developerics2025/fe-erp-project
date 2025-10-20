import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  isAuthInitialized: boolean;
  setAccessToken: (token: string | null) => void;
  setAuthenticated: (value: boolean) => void;
  setIsAuthInitialized: (value: boolean) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isAuthenticated: false,
  isAuthInitialized: false,

  setAccessToken: (token) =>
    set({
      accessToken: token,
      isAuthenticated: !!token,
    }),

  setAuthenticated: (value) => set({ isAuthenticated: value }),

  setIsAuthInitialized: (value) => set({ isAuthInitialized: value }),

  resetAuth: () =>
    set({
      accessToken: null,
      isAuthenticated: false,
      isAuthInitialized: false,
    }),
}));

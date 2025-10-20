// store/toastStore.ts
import { create } from "zustand";

type ToastType = "default" | "success" | "error" | "warning" | "info";

interface ToastMessage {
  message: string;
  variant?: ToastType;
}

interface ToastStore {
  queue: ToastMessage[];
  addToast: (toast: ToastMessage) => void;
  clearQueue: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  queue: [],
  addToast: (toast) => set((state) => ({ queue: [...state.queue, toast] })),
  clearQueue: () => set({ queue: [] }),
}));

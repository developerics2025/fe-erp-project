import { useToastStore } from "@/stores/toast-store";

export const useToast = () => {
  const { addToast } = useToastStore();

  return {
    success: (msg: string) => addToast({ message: msg, variant: "success" }),
    error: (msg: string) => addToast({ message: msg, variant: "error" }),
    warning: (msg: string) => addToast({ message: msg, variant: "warning" }),
    info: (msg: string) => addToast({ message: msg, variant: "info" }),
    default: (msg: string) => addToast({ message: msg, variant: "default" }),
  };
};

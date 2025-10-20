import { useMutation } from "@tanstack/react-query";
import api from "@/libs/api";
import { useToast } from "@/hooks/use-toast";

export function useCreateTransaction() {
  const toast = useToast();

  return useMutation({
    mutationFn: async (payload: { plan_id: string; company_id: string }) => {
      const res = await api.post("/account/create/", payload);
      return res.data;
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.detail || "Failed to create transaction"
      );
    },
  });
}

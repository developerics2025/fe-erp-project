import { useMutation } from "@tanstack/react-query";
import api from "@/libs/api";
import { ResendActivationResponse } from "@/types/auth";

export function useResendActivation() {
  return useMutation({
    mutationFn: async (payload: {
      email: string;
    }): Promise<ResendActivationResponse> => {
      const response = await api.post("/account/resend-activation/", payload, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    },
  });
}

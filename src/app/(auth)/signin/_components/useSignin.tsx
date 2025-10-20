import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signInUser } from "../action";

export const useSignIn = () => {
  const router = useRouter();
  const toast = useToast();

  return useMutation({
    mutationFn: signInUser,

    onSuccess: (data) => {
      toast.success("Login successful!");

      const { user_status } = data;
      let redirectPath = "/dashboard";

      const {
        has_company,
        onboarding_completed,
        subscription_status,
        current_onboarding_step,
      } = user_status || {};

      if (
        !has_company ||
        (!onboarding_completed && subscription_status !== "trial")
      ) {
        redirectPath = `/onboarding?step=${current_onboarding_step || 1}`;
      } else if (
        subscription_status === "none" ||
        subscription_status === "inactive"
      ) {
        redirectPath = "/billing/plans";
      }

      router.replace(redirectPath);
    },

    onError: (error: any) => {
      const msg =
        error?.response?.data?.detail ||
        error.message ||
        "Login failed due to an unexpected error.";
      toast.error(msg);
    },
  });
};

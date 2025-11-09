"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { signupSchema, SignupFormValues } from "@/validations/auth-validation";
import { signupTrialAction } from "../../action";

export function useSignupTrial() {
  const toast = useToast();
  const router = useRouter();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const mutation = useMutation({
    mutationFn: signupTrialAction,

    onSuccess: (data, variables) => {
      toast.success("Account created successfully!");

      Cookies.set("signup_email", variables.email, { expires: 1 / 24 });
      Cookies.set("signup_trial", "true", { expires: 1 / 24 });

      localStorage.setItem("resend_attempts", "1");

      const retryAfter = data?.data?.retry_after ?? 90;
      const endTime = Date.now() + retryAfter * 1000;
      localStorage.setItem("resend_end_time", endTime.toString());

      router.push("/check-email");
    },
    onError: (error: any) => {
      const backendError = error?.response?.data?.error;
      let message = "Something went wrong.";

      if (typeof backendError === "string") {
        message = backendError;
      } else if (typeof backendError === "object" && backendError !== null) {
        const firstKey = Object.keys(backendError)[0];
        const firstMsg = backendError[firstKey];
        message = Array.isArray(firstMsg) ? firstMsg[0] : String(firstMsg);
      }

      toast.error(message);
    },
  });

  return {
    form,
    onSubmit: form.handleSubmit((data) => mutation.mutate(data)),
    isPending: mutation.isPending,
  };
}

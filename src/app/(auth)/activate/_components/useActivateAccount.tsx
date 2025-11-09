// app/activate-account/_hooks/useActivateAccount.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation"; // useSearchParams sudah dihapus
import { useAuthStore } from "@/stores/auth";
import { useToast } from "@/hooks/use-toast";
import { ActivationState } from "@/types/auth";
import Cookies from "js-cookie";
import { activateAccountApi } from "../../action";

export const useActivateAccount = (token: string) => {
  const router = useRouter();
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const toast = useToast();

  const isMounted = useRef(false);

  const [state, setState] = useState<ActivationState>({
    loading: true,
    message: null,
    isTrial: false,
    onboardingCompleted: false,
    onboardingStep: 0,
    countdown: 0,
  });

  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    const activate = async () => {
      try {
        const activationData = await activateAccountApi(token);

        if (activationData?.access) setAccessToken(activationData.access);
        toast.success("Account activated successfully!");
        Cookies.remove("signup_email");
        Cookies.remove("signup_trial");
        localStorage.removeItem("resend_attempts");
        localStorage.removeItem("resend_end_time");

        setState({
          loading: false,
          message:
            activationData.detail ||
            "Your account has been activated successfully.",
          isTrial: activationData.is_trial ?? false,
          onboardingCompleted: activationData.onboarding_completed ?? false,
          onboardingStep: activationData.onboarding_step ?? 0,
          countdown: 5,
        });
      } catch (err: any) {
        const errorData = err?.response?.data;
        let msg = "Activation failed. Please try again or contact support.";

        if (errorData?.error?.detail && Array.isArray(errorData.error.detail)) {
          msg = errorData.error.detail[0];
        } else if (errorData?.detail) {
          msg = errorData.detail;
        } else if (err?.message) {
          msg = err.message;
        }

        if (typeof msg !== "string") {
          msg = "An unexpected error occurred.";
        }

        setState({
          loading: false,
          message: msg,
          isTrial: false,
          onboardingCompleted: false,
          onboardingStep: 0,
          countdown: 0,
        });
      }
    };

    activate();
  }, [token, setAccessToken]);

  useEffect(() => {
    if (state.loading || state.countdown <= 0 || hasRedirected) return;

    const timer = setInterval(() => {
      setState((prev) => {
        const nextCount = (prev.countdown ?? 0) - 1;

        if (nextCount <= 0) {
          clearInterval(timer);
          setHasRedirected(true);

          setTimeout(() => {
            let redirectPath = "/signin";
            let toastMessage = "Please Signin With Your Account";

            toast.info(toastMessage);
            router.replace(redirectPath);
          }, 300);

          return { ...prev, countdown: 0 };
        }

        return { ...prev, countdown: nextCount };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.loading, state.countdown, router, toast, hasRedirected]);

  return { state };
};

"use client";

import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { useResendActivation } from "../action";
import { useToast } from "@/hooks/use-toast";
import { ResendResponse } from "@/types/auth";

const MAX_ATTEMPTS = 3;
const INITIAL_COOLDOWN = 120; // 2 menit
const LONG_COOLDOWN = 1800; // 30 menit

const formatTime = (seconds: number, showSeconds = true) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  return showSeconds ? `${m}:${s.toString().padStart(2, "0")}` : `${m}m`;
};

export function useCheckEmail() {
  const resendMutation = useResendActivation();
  const toast = useToast();
  const [countdown, setCountdown] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const savedEndTime = localStorage.getItem("resend_end_time");
    const savedAttempts = localStorage.getItem("resend_attempts");

    if (savedAttempts) setAttempts(Number(savedAttempts));

    if (savedEndTime) {
      const diff = Math.floor((Number(savedEndTime) - Date.now()) / 1000);
      if (diff > 0) startCountdown(diff);
      else clearCooldown();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const clearCooldown = () => {
    localStorage.removeItem("resend_end_time");
    setCountdown(0);
  };

  const startCountdown = (seconds: number) => {
    if (seconds <= 0) return clearCooldown();

    const endTime = Date.now() + seconds * 1000;
    localStorage.setItem("resend_end_time", endTime.toString());
    setCountdown(seconds);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setCountdown(remaining);

      if (remaining <= 0) {
        clearCooldown();
        if (intervalRef.current) clearInterval(intervalRef.current);

        if (attempts >= MAX_ATTEMPTS) {
          localStorage.removeItem("resend_attempts");
          setAttempts(0);
        }
      }
    }, 1000);
  };

  const handleResend = async () => {
    if (resendMutation.isPending || countdown > 0) return;

    const email = Cookies.get("signup_email");
    if (!email) {
      toast.error("Email not found");
      return;
    }

    try {
      const res: ResendResponse = await resendMutation.mutateAsync({ email });

      if (res.status === true) {
        const data = res.data;
        toast.success(data?.detail || "Activation email resent successfully.");

        const backendAttempts = data?.attempt_count ?? attempts + 1;
        setAttempts(backendAttempts);
        localStorage.setItem("resend_attempts", backendAttempts.toString());

        const retryAfter = data?.retry_after ?? INITIAL_COOLDOWN;

        if (backendAttempts >= MAX_ATTEMPTS) {
          startCountdown(LONG_COOLDOWN);
        } else {
          startCountdown(retryAfter);
        }
      } else if (res?.error) {
        const errMsg = res.error?.detail || "Something went wrong.";
        toast.error(errMsg);
        startCountdown(INITIAL_COOLDOWN);
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong.");
      startCountdown(INITIAL_COOLDOWN);
    }
  };

  return {
    countdown,
    attempts,
    MAX_ATTEMPTS,
    canResend: countdown === 0 && !resendMutation.isPending,
    resendMutation,
    handleResend,
    formatTime,
  };
}

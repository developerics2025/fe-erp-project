"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import api from "@/libs/api";
import { useAuthStore } from "@/stores/auth";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const setIsAuthInitialized = useAuthStore((s) => s.setIsAuthInitialized);
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const REFRESH_INTERVAL_MS = 13 * 60 * 1000;

  const refreshAccessToken = async () => {
    try {
      await api.post("/account/token/refresh/", {}, { withCredentials: true });
      setAuthenticated(true);
      return true;
    } catch (error) {
      setAuthenticated(false);
      return false;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const ok = await refreshAccessToken();
      setIsAuthInitialized(true);

      // jika gagal refresh token, dan sedang di halaman protected, redirect ke signin
      const protectedRoutes = ["/dashboard", "/profile"];
      if (!ok && protectedRoutes.some((r) => pathname.startsWith(r))) {
        router.replace("/signin");
      }
    };

    initAuth();
  }, [pathname, router, setIsAuthInitialized, setAuthenticated]);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshAccessToken();
    }, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return <>{children}</>;
}

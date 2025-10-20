"use client";

import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";
import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

function MuiThemeWrapper({ children }: { children: ReactNode }) {
  // 1) Hooks harus dipanggil dalam urutan yang konsisten setiap render
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 2) Panggil useMemo (hook) juga sebelum conditional return agar tidak mengubah urutan hooks

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: resolvedTheme === "dark" ? "dark" : "light",
          background: {
            default: resolvedTheme === "dark" ? "#0d0d0d" : "#ffffff", // layout utama
            paper: resolvedTheme === "dark" ? "#0d0d0d" : "#ffffff",
          },
          text: {
            primary: resolvedTheme === "dark" ? "#f5f5f5" : "#111111",
            secondary: resolvedTheme === "dark" ? "#c1c1c1" : "#333333",
          },
        },
      }),
    [resolvedTheme]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // 3) Sekarang aman untuk mengembalikan null sebelum mount tanpa mengubah urutan hooks
  if (!mounted) {
    return null;
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export function ThemeProvider({ children, ...props }: { children: ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <MuiThemeWrapper>{children}</MuiThemeWrapper>
    </NextThemeProvider>
  );
}

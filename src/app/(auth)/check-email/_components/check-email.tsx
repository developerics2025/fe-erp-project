"use client";

import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Container,
  Paper,
} from "@mui/material";
import { useCheckEmail } from "./useCheckEmail";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function CheckEmail() {
  const router = useRouter();
  const {
    countdown,
    attempts,
    MAX_ATTEMPTS,
    canResend,
    resendMutation,
    handleResend,
    formatTime,
  } = useCheckEmail();

  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      const emailCookie = Cookies.get("signup_email");
      if (!emailCookie) {
        router.replace("/signin");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <Container maxWidth={false}>
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, sm: 5 },
          maxWidth: 480,
          mx: "auto",
          textAlign: "center",
          borderRadius: 3,
          backgroundColor:
            resolvedTheme === "dark"
              ? "rgba(30,30,30,0.9)"
              : "rgba(255,255,255,0.9)",
          backdropFilter: "blur(6px)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Check Your Email
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          We’ve sent an activation link to your registered email address.
        </Typography>

        <Typography variant="body2" sx={{ mb: 3 }}>
          Please check your inbox and click the activation link to verify your
          account. If you don’t see it, check your spam folder.
        </Typography>

        <Box sx={{ mt: 4, p: 3, borderRadius: 2 }}>
          <Typography variant="body2" gutterBottom>
            Didn’t receive the email?
          </Typography>

          {countdown > 0 && attempts < MAX_ATTEMPTS && (
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ mb: 1 }}
            >
              You can request a new activation email in{" "}
              <strong>{formatTime(countdown)}</strong>
            </Typography>
          )}

          {attempts >= MAX_ATTEMPTS && countdown > 0 && (
            <Typography
              variant="caption"
              color="error"
              display="block"
              sx={{ mb: 1 }}
            >
              You have reached the maximum resend limit. Please wait{" "}
              <strong>{formatTime(countdown, false)}</strong> before trying
              again.
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            onClick={handleResend}
            disabled={!canResend}
            sx={{ mt: 1 }}
          >
            {resendMutation.isPending ? (
              <CircularProgress size={24} />
            ) : (
              "Resend Email"
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

"use client";

import React from "react";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import { ActivationState } from "@/types/auth";

interface Props {
  state: ActivationState;
  onNavigate: (path: string) => void;
}

export const ActivateAccountView: React.FC<Props> = ({ state, onNavigate }) => {
  const { loading, message, countdown } = state;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 400,
          width: "90%",
          p: 4,
          borderRadius: 3,
          textAlign: "center",
          backgroundColor: "white",
          mt: 4,
        }}
      >
        {loading ? (
          <>
            <CircularProgress size={48} />
            <Typography sx={{ mt: 2 }}>Processing activation...</Typography>
          </>
        ) : (
          <>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              {message}
            </Typography>

            {state.countdown && state.countdown > 0 ? (
              <Typography variant="body2" color="text.secondary">
                Redirecting in{" "}
                <Typography component="span" fontWeight="bold">
                  {countdown}
                </Typography>{" "}
                second{countdown > 1 ? "s" : ""}...
                <br />
              </Typography>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {message && message.includes("successfully")
                  ? "Redirecting..."
                  : "Please check the message above."}
              </Typography>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
};

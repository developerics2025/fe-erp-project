"use client";

import React, { useEffect } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useToastStore } from "@/stores/toast-store";

const InnerNotifier = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { queue, clearQueue } = useToastStore();

  useEffect(() => {
    if (queue.length > 0) {
      queue.forEach(({ message, variant }) => {
        enqueueSnackbar(message, { variant });
      });
      clearQueue();
    }
  }, [queue, enqueueSnackbar, clearQueue]);

  return null;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SnackbarProvider
      maxSnack={5}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={4000}
      preventDuplicate
      dense
    >
      <InnerNotifier />
      {children}
    </SnackbarProvider>
  );
};

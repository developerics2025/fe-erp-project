"use client";

import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";
import SpeedDialMenu from "./_components/speed-dial";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [openSidebar, setOpenSidebar] = React.useState(true);
  const { resolvedTheme } = useTheme();

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        height: "100vh",
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        transition: "all 0.3s ease",
      })}
    >
      <Sidebar open={openSidebar} setOpen={setOpenSidebar} />

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <Box sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>{children}</Box>
        <SpeedDialMenu />
      </Box>
    </Box>
  );
};

export default DashboardLayout;

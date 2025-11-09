"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { useTheme as useNextTheme } from "next-themes";
import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";
import SpeedDialMenu from "./_components/speed-dial";
const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { resolvedTheme } = useNextTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const [openSidebar, setOpenSidebar] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const showSidebar = isMobile ? mobileOpen : true;

  useEffect(() => {
    if (isMobile) setOpenSidebar(false);
  }, [isMobile]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        transition: "all 0.3s ease",
      }}
    >
      {showSidebar && (
        <Sidebar
          open={isMobile ? true : openSidebar}
          setOpen={isMobile ? setMobileOpen : setOpenSidebar}
        />
      )}

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Navbar
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          isMobile={isMobile}
        />
        <Box sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>{children}</Box>
        <SpeedDialMenu />
      </Box>
    </Box>
  );
};

export default DashboardLayout;

"use client";

import React from "react";
import { Box, List, Divider, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { SIDEBAR_MENU } from "@/constants/sidebar-menu";
import { SidebarItem } from "./sidebar-item";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userRole?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen, userRole = "admin" }) => {
  const theme = useTheme();
  const sidebarWidth = open ? 225 : 80;

  const mainMenu = SIDEBAR_MENU.filter((m) => m.label !== "Company Settings");
  const footerMenu = SIDEBAR_MENU.find((m) => m.label === "Company Settings");

  return (
    <motion.div
      animate={{ width: sidebarWidth }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        height: "100vh",
        overflow: "hidden",
      }}
      className="flex flex-col justify-between"
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 2, py: 3 }}>
        <img src="/logo192.png" alt="Logo" width={36} height={36} />
        {open && (
          <Typography variant="h6" fontWeight={600} noWrap>
            Integrata ERP
          </Typography>
        )}
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: "auto", overflowX: "hidden" }}>
        <List sx={{ px: 0 }}>
          {mainMenu.map((item) => (
            <SidebarItem key={item.label} item={item} open={open} userRole={userRole} />
          ))}
        </List>
      </Box>

      <Box sx={{mx: 1, position: "relative" }}>
        <Divider sx={{ mb: 1.5 }} />
          {footerMenu && (
            <SidebarItem
              item={footerMenu}
              open={open}
              userRole={userRole}
              isFooter={true} 
              sidebarWidth={sidebarWidth}
            />
          )}
      </Box>
    </motion.div>
  );
};

export default Sidebar;

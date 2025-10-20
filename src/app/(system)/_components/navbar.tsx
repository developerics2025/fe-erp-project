"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Badge,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import {
  NotificationsOutlined,
  AccountCircleOutlined,
  SettingsOutlined,
  FlipOutlined,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";

interface NavbarProps {
  openSidebar: boolean;
  setOpenSidebar: (open: boolean) => void;
}

const Navbar = ({ openSidebar, setOpenSidebar }: NavbarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const theme = useTheme();

  const handleProfileMenu = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleCloseProfile = () => setAnchorEl(null);
  const toggleNotif = () => setNotifOpen(!notifOpen);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        // borderBottom: `1px solid ${theme.palette.divider}`,
        // boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Sidebar Toggle (only shown when sidebar closed) */}
        {!openSidebar && (
          <IconButton onClick={() => setOpenSidebar(true)} color="inherit">
            <FlipOutlined />
          </IconButton>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: "auto" }}>
          <DarkModeToggle />

          <Tooltip title="Notifications">
            <IconButton color="inherit" onClick={toggleNotif}>
              <Badge badgeContent={2} color="error">
                <NotificationsOutlined />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Profile">
            <IconButton color="inherit" onClick={handleProfileMenu}>
              <Avatar alt="User Avatar" src="/avatar.png" />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseProfile}
          >
            <MenuItem onClick={handleCloseProfile}>
              <AccountCircleOutlined sx={{ mr: 1 }} /> Profile
            </MenuItem>
            <MenuItem onClick={handleCloseProfile}>
              <SettingsOutlined sx={{ mr: 1 }} /> Settings
            </MenuItem>
          </Menu>
        </Box>

        {/* Notifications Dropdown */}
        {notifOpen && (
          <motion.div
            className="absolute top-16 right-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Box
              sx={{
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                borderRadius: 2,
                p: 2,
                width: 300,
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} mb={2}>
                Notifications
              </Typography>
              <Box display="flex" flexDirection="column" gap={1.5}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 1,
                    bgcolor: theme.palette.action.hover,
                  }}
                >
                  <Typography fontSize={14} fontWeight={500}>
                    New user registered
                  </Typography>
                  <Typography fontSize={12} color="text.secondary">
                    2 minutes ago
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 1,
                    bgcolor: theme.palette.action.hover,
                  }}
                >
                  <Typography fontSize={14} fontWeight={500}>
                    Server rebooted successfully
                  </Typography>
                  <Typography fontSize={12} color="text.secondary">
                    15 minutes ago
                  </Typography>
                </Box>
              </Box>
            </Box>
          </motion.div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

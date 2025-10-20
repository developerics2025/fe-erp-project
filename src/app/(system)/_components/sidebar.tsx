"use client";
import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";
import {
  DashboardOutlined,
  FolderOutlined,
  FolderOpenOutlined,
  ExpandLess,
  ExpandMore,
  SettingsOutlined,
  FlipOutlined,
} from "@mui/icons-material";
import { motion } from "framer-motion";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const theme = useTheme();
  const toggleSubmenu = () => setSubmenuOpen(!submenuOpen);

  const sidebarWidth = open ? 240 : 80;

  return (
    <motion.div
      animate={{ width: sidebarWidth }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        height: "100vh",
      }}
      className="flex flex-col justify-between"
    >
      <div>
        {/* Logo & Toggle */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <img src="/logo192.png" alt="Logo" width={36} height={36} />
            {open && (
              <Typography
                variant="h6"
                fontWeight={600}
                color="text.primary"
                noWrap
              >
                Integrata ERP
              </Typography>
            )}
          </Box>
          {open && (
            <IconButton size="small" onClick={() => setOpen(false)}>
              <FlipOutlined />
            </IconButton>
          )}
        </Box>

        {/* Menu */}
        <List sx={{ px: open ? 2 : 1 }}>
          <ListItemButton
            sx={{
              borderRadius: 2,
              mb: 1.2,
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              bgcolor: theme.palette.action.hover,
            }}
          >
            <ListItemIcon>
              <DashboardOutlined />
            </ListItemIcon>
            {open && <ListItemText primary="Dashboard" />}
          </ListItemButton>

          <ListItemButton
            onClick={toggleSubmenu}
            sx={{
              borderRadius: 2,
              mb: 1.2,
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              bgcolor: theme.palette.action.hover,
            }}
          >
            <ListItemIcon>
              <FolderOutlined />
            </ListItemIcon>
            {open && <ListItemText primary="Projects" />}
            {open && (submenuOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>

          <Collapse in={submenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: open ? 4 : 2 }}>
              {["Project A", "Project B"].map((p) => (
                <ListItemButton
                  key={p}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    bgcolor: theme.palette.background.default,
                  }}
                >
                  <ListItemIcon>
                    <FolderOpenOutlined />
                  </ListItemIcon>
                  {open && <ListItemText primary={p} />}
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
      </div>

      {/* Bottom Settings */}
      <Box sx={{ p: 2 }}>
        <Divider sx={{ mb: 1.5 }} />
        <ListItemButton
          sx={{
            borderRadius: 2,
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            bgcolor: theme.palette.action.hover,
          }}
        >
          <ListItemIcon>
            <SettingsOutlined />
          </ListItemIcon>
          {open && <ListItemText primary="Company Settings" />}
        </ListItemButton>
      </Box>
    </motion.div>
  );
};

export default Sidebar;

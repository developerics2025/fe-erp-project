"use client";

import React, { useState } from "react";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { ExpandLess, ExpandMore, MoreVert } from "@mui/icons-material";
import Link from "next/link";
import { SidebarMenuItem } from "@/constants/sidebar-menu";

interface SidebarItemProps {
  item: SidebarMenuItem;
  open: boolean;
  userRole?: string;
  isFooter?: boolean;
  sidebarWidth?: number;
  companyName?: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  open,
  userRole = "admin",
  isFooter = false,
  sidebarWidth,
  companyName,
}) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();

  if (item.roles && !item.roles.includes(userRole)) return null;

  const hasChildren = !!item.children?.length;
  const Icon = item.icon;

  const toggleSubmenu = () => setSubmenuOpen(!submenuOpen);
  const handleClickFooter = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  return (
    <>
      {isFooter ? (
        <Box sx={{ position: "relative" }}>
          <ListItemButton
            onClick={handleClickFooter}
            sx={{
              borderRadius: 2,
              mb: 1,
              bgcolor: theme.palette.action.hover,
              px: open ? 2 : 0,
              justifyContent: open ? "space-between" : "center",
              alignItems: "center",
            }}
          >
            <ListItemIcon
              sx={{ minWidth: 0, justifyContent: "center", display: "flex" }}
            >
              <Icon />
            </ListItemIcon>

            {open && (
              <Box sx={{ flexGrow: 1, ml: 1 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight={500}
                  sx={{ lineHeight: 1.2 }}
                >
                  {item.label === "Company Settings" && companyName
                    ? companyName
                    : item.label}
                </Typography>

                {item.subLabel && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: "0.75rem" }}
                  >
                    {item.subLabel}
                  </Typography>
                )}
              </Box>
            )}

            {open && <MoreVert sx={{ ml: "auto" }} />}
          </ListItemButton>

          {/* menu popover */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            transformOrigin={{ vertical: "bottom", horizontal: "left" }}
            PaperProps={{
              sx: { width: sidebarWidth, mb: 1, borderRadius: 2, boxShadow: 3 },
            }}
          >
            {item.children?.map((child) => (
              <MenuItem
                key={child.label}
                component={Link}
                href={child.path || "#"}
              >
                {child.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      ) : (
        <>
          <ListItemButton
            onClick={hasChildren ? toggleSubmenu : undefined}
            component={item.path && !hasChildren ? Link : "div"}
            href={item.path && !hasChildren ? item.path : "#"}
            sx={{
              borderRadius: 2,
              mb: 1.2,
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              bgcolor: theme.palette.action.hover,
              px: open ? 1 : 0,
              mx: 1,
              justifyContent: open ? "flex-start" : "center",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 2 : 0,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Icon />
            </ListItemIcon>

            {open && (
              <ListItemText
                primary={
                  <Typography variant="body1" fontWeight={500}>
                    {item.label}
                  </Typography>
                }
              />
            )}

            {open &&
              hasChildren &&
              (submenuOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>

          {hasChildren && (
            <Collapse in={submenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: open ? 4 : 0 }}>
                {item.children!.map((child) => (
                  <SidebarItem
                    key={child.label}
                    item={child}
                    open={open}
                    userRole={userRole}
                  />
                ))}
              </List>
            </Collapse>
          )}
        </>
      )}
    </>
  );
};

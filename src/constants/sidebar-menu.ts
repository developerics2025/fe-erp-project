import {
  DashboardOutlined,
  FolderOutlined,
  FolderOpenOutlined,
  SettingsOutlined,
  AccountCircleOutlined,
} from "@mui/icons-material";

export interface SidebarMenuItem {
  label: string;
  icon: React.ElementType;
  path?: string;
  children?: SidebarMenuItem[];
  roles?: string[];
  subLabel?: string;
}

export const SIDEBAR_MENU: SidebarMenuItem[] = [
  {
    label: "Dashboard",
    icon: DashboardOutlined,
    path: "/dashboard",
    roles: ["admin", "user"],
  },
  {
    label: "Projects",
    icon: FolderOutlined,
    roles: ["admin", "manager"],
    children: [
      { label: "Project A", icon: FolderOpenOutlined, path: "/projects/a" },
      { label: "Project B", icon: FolderOpenOutlined, path: "/projects/b" },
    ],
  },
  {
    label: "Reports",
    icon: FolderOpenOutlined,
    path: "/reports",
    roles: ["admin", "user"],
  },
  {
    label: "Company Settings",
    subLabel: "Free",
    icon: SettingsOutlined,
    roles: ["admin"],
    children: [
      {
        label: "Profile",
        icon: AccountCircleOutlined,
        path: "/company/profile",
      },
      { label: "Settings", icon: SettingsOutlined, path: "/company/settings" },
      { label: "Users", icon: AccountCircleOutlined, path: "/company/users" },
    ],
  },
];

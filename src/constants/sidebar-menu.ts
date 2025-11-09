import {
  DashboardOutlined,
  FolderOpenOutlined,
  BadgeOutlined,
  GroupOutlined,
  MonetizationOnOutlined,
  GroupAddOutlined,
  CurrencyExchangeOutlined,
  AccountTreeOutlined,
  LocationCityOutlined,
  DisplaySettingsOutlined,
  TuneOutlined,
  RoomPreferencesOutlined,
  AssignmentOutlined,
  MoreTimeOutlined,
  ReceiptLongOutlined,
  PsychologyAltOutlined,
  WorkOutlineOutlined,
  MoneyOutlined,
  PriceChangeOutlined,
  TimelineOutlined,
  EventAvailableOutlined,
  Face6Outlined,
  PersonOutlined,
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
    label: "Human Resource",
    icon: GroupOutlined,
    roles: ["admin", "manager"],
    children: [
      {
        label: "Employment",
        icon: BadgeOutlined,
        children: [
          { label: "Employee", icon: PersonOutlined, path: "/projects/a" },
          {
            label: "Attendance",
            icon: Face6Outlined,
            path: "/projects/b",
          },
          {
            label: "Leave Request",
            icon: EventAvailableOutlined,
            path: "/projects/b",
          },
          {
            label: "Overtime",
            icon: MoreTimeOutlined,
            path: "/projects/b",
          },
          {
            label: "Reimburse",
            icon: ReceiptLongOutlined,
            path: "/projects/b",
          },
          {
            label: "Index KPI",
            icon: TimelineOutlined,
            path: "/projects/b",
          },
        ],
      },
      {
        label: "Payroll",
        icon: MonetizationOnOutlined,
        children: [
          { label: "Salary", icon: MoneyOutlined, path: "/projects/a" },
          {
            label: "Tax",
            icon: PriceChangeOutlined,
            path: "/projects/b",
          },
        ],
      },
      {
        label: "Recruitment",
        icon: GroupAddOutlined,
        children: [
          { label: "Jobs", icon: WorkOutlineOutlined, path: "/projects/a" },
          {
            label: "Psychotest",
            icon: PsychologyAltOutlined,
            path: "/projects/b",
          },
        ],
      },
    ],
  },
  {
    label: "Finance",
    icon: CurrencyExchangeOutlined,
    roles: ["admin", "user"],
    children: [
      { label: "Overtime", icon: MoreTimeOutlined, path: "/projects/a" },
      {
        label: "Reimburse",
        icon: ReceiptLongOutlined,
        path: "/projects/b",
      },
    ],
  },
  {
    label: "Project Management",
    icon: AccountTreeOutlined,
    roles: ["admin", "user"],
    children: [
      { label: "Project", icon: FolderOpenOutlined, path: "/projects/a" },
      {
        label: "Task",
        icon: AssignmentOutlined,
        path: "/projects/b",
      },
    ],
  },

  {
    label: "Company Settings",
    subLabel: "Free",
    icon: LocationCityOutlined,
    roles: ["admin"],
    children: [
      {
        label: "Application Settings",
        icon: DisplaySettingsOutlined,
        path: "/application-settings",
      },
      {
        label: "Company Settings",
        icon: TuneOutlined,
        path: "/company-settings",
      },
      {
        label: "Company Management",
        icon: RoomPreferencesOutlined,
        path: "/company-management",
      },
    ],
  },
];

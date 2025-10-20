import React from "react";
import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import {
  FileCopyOutlined,
  SaveOutlined,
  PrintOutlined,
  ShareOutlined,
} from "@mui/icons-material";

const actions = [
  { icon: <FileCopyOutlined />, name: "Copy" },
  { icon: <SaveOutlined />, name: "Save" },
  { icon: <PrintOutlined />, name: "Print" },
  { icon: <ShareOutlined />, name: "Share" },
];

const SpeedDialMenu = () => (
  <Box sx={{ position: "absolute", bottom: 16, right: 16 }}>
    <SpeedDial ariaLabel="SpeedDial actions" icon={<SpeedDialIcon />}>
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  </Box>
);

export default SpeedDialMenu;

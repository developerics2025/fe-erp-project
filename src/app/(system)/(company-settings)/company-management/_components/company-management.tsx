import { Box, Typography } from "@mui/material";
import { ReactFlow, Controls, Background } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CompanyStackedForm from "./form-company";

const initialNodes = [
  {
    id: "c1",
    data: { label: "Company 1" },
    position: { x: 0, y: 0 },
    type: "input",
  },
  {
    id: "c2",
    data: { label: "Company 2" },
    position: { x: 100, y: 100 },
  },
  {
    id: "c3",
    data: { label: "Company 3" },
    position: { x: -150, y: 100 },
  },
  {
    id: "c4",
    data: { label: "Company 4" },
    position: { x: -350, y: 100 },
  },
  {
    id: "c5",
    data: { label: "Company 5" },
    position: { x: 100, y: 200 },
  },
];
const initialEdges = [
  {
    id: "c1-c2",
    source: "c1",
    target: "c2",
    label: "Child Company",
    type: "step",
  },
  {
    id: "c1-c3",
    source: "c1",
    target: "c3",
    type: "step",
  },
  {
    id: "c1-c4",
    source: "c1",
    target: "c4",
    label: "Branch",
    type: "step",
  },
  {
    id: "c2-c5",
    source: "c2",
    target: "c5",
    label: "Branch",
    type: "step",
  },
];

export function CompanyManagement() {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Company Management
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "75%",
          border: "1px solid gray",
          borderRadius: "5px",
          mb: 2,
        }}
      >
        <ReactFlow nodes={initialNodes} edges={initialEdges} fitView>
          <Background />
          <Controls />
        </ReactFlow>
      </Box>
      <Box sx={{ width: "100%", height: "50%" }}>
        <CompanyStackedForm />
      </Box>
    </Box>
  );
}

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { motion } from "framer-motion";
import clsx from "clsx";

interface CompanyNode {
  id: string;
  name: string;
  type: "Main Company" | "Child" | "Branch";
  children?: CompanyNode[];
}

const initialData: CompanyNode = {
  id: "1",
  name: "PT. Suka Maju",
  type: "Main Company",
  children: [
    {
      id: "2",
      name: "PT. Suka Mundur",
      type: "Child",
      children: [
        {
          id: "3",
          name: "PT. Anak Suka Mundur",
          type: "Branch",
        },
      ],
    },
    {
      id: "4",
      name: "PT. Suka Kamu",
      type: "Branch",
    },
  ],
};

export default function CompanyStackedForm() {
  const [data, setData] = useState<CompanyNode>(initialData);
  const [open, setOpen] = useState(false);
  const [parentId, setParentId] = useState<string | null>(null);
  const [form, setForm] = useState({ type: "Child", name: "", email: "" });

  const handleAdd = (parentId: string) => {
    setParentId(parentId);
    setOpen(true);
  };

  const handleSubmit = () => {
    if (!parentId || !form.name.trim()) return;

    const addChild = (node: CompanyNode): CompanyNode => {
      if (node.id === parentId) {
        const newChild: CompanyNode = {
          id: Date.now().toString(),
          name: form.name,
          type: form.type as "Child" | "Branch",
        };
        return { ...node, children: [...(node.children || []), newChild] };
      }
      return { ...node, children: node.children?.map(addChild) };
    };

    setData(addChild(data));
    setForm({ type: "Child", name: "", email: "" });
    setOpen(false);
  };

  const renderNode = (node: CompanyNode, level = 0) => (
    <motion.div
      key={node.id}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
    >
      <Box
        sx={{
          ml: `${level * 2.5}rem`,
          display: "inline-block",
          mb: 1.2,
        }}
      >
        <Card
          variant="outlined"
          sx={{
            minWidth: 240,
            maxWidth: 320,
            borderLeft: `3px solid ${
              node.type === "Main Company"
                ? "#1976d2"
                : node.type === "Child"
                ? "#2e7d32"
                : "#6a1b9a"
            }`,
            // boxShadow: 0.5,
          }}
        >
          <CardContent sx={{ p: 0.5 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={0.5}
            >
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ textTransform: "uppercase", fontSize: "0.65rem" }}
                >
                  {node.type}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ fontSize: "0.8rem", color: "#333" }}
                >
                  {node.name}
                </Typography>
              </Box>

              <Stack direction="row" spacing={0}>
                <Tooltip title="Info">
                  <IconButton size="small" color="info" sx={{ p: 0.3 }}>
                    <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton size="small" color="primary" sx={{ p: 0.3 }}>
                    <EditOutlinedIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Tambah">
                  <IconButton
                    size="small"
                    color="success"
                    sx={{ p: 0.3 }}
                    onClick={() => handleAdd(node.id)}
                  >
                    <AddCircleOutlineIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Hapus">
                  <IconButton size="small" color="error" sx={{ p: 0.3 }}>
                    <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {node.children && (
          <Box sx={{ mt: 1 }}>
            {node.children.map((child) => renderNode(child, level + 1))}
          </Box>
        )}
      </Box>
    </motion.div>
  );

  return (
    <Box sx={{ p: 2.5, bgcolor: "#fafafa", borderRadius: 1.5 }}>
      <Typography
        variant="subtitle1"
        fontWeight={600}
        sx={{ mb: 2, fontSize: "0.9rem" }}
      >
        Company Hierarchy
      </Typography>

      {/* Tree structure */}
      {renderNode(data)}

      {/* Modal tambah */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontSize: "1rem" }}>Tambah Perusahaan</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            mt: 0.5,
          }}
        >
          <TextField
            select
            label="Tipe"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            size="small"
          >
            <MenuItem value="Child">Child</MenuItem>
            <MenuItem value="Branch">Branch</MenuItem>
          </TextField>
          <TextField
            label="Nama Perusahaan"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            size="small"
          />
          <TextField
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            size="small"
          />
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 1.5 }}>
          <Button onClick={() => setOpen(false)} size="small">
            Batal
          </Button>
          <Button onClick={handleSubmit} variant="contained" size="small">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

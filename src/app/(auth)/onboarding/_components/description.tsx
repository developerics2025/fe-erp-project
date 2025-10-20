"use client";
import { Box, Typography } from "@mui/material";

const messages = [
  {
    title: "Build your brand identity",
    desc: "Let’s start by setting up your company profile so we can tailor your workspace experience.",
  },
  {
    title: "Tell us more about your company",
    desc: "Provide a few more details to help us understand your business better.",
  },
  {
    // title: "Choose your subscription plan",
    desc: "", // kosongin desc biar tidak muncul
  },
];

export default function MarketingPanel({ step }: { step: number }) {
  const { title, desc } = messages[step] ?? messages[0];
  const showDesc = step !== 2; // 👈 step 2 = index ke-2 = step ke-3 onboarding

  return (
    <Box sx={{ mt: { xs: 2, md: 6 }, px: 3 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ textTransform: "capitalize" }}
      >
        {title}
      </Typography>

      {showDesc && (
        <Typography variant="body1" color="text.secondary">
          {desc}
        </Typography>
      )}
    </Box>
  );
}

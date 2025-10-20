"use client";
import { useEffect, useRef, useState } from "react";
import {
  Stack,
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useOnboardingStore, usePlans, usePostStep } from "./useOnboarding";
import { motion } from "framer-motion";
import gsap from "gsap";

import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ApartmentIcon from "@mui/icons-material/Apartment";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const iconMap: Record<string, JSX.Element> = {
  free: <StarBorderIcon color="action" sx={{ fontSize: 36 }} />,
  basic: <RocketLaunchIcon color="primary" sx={{ fontSize: 36 }} />,
  pro: <WorkspacePremiumIcon color="warning" sx={{ fontSize: 36 }} />,
  enterprise: <ApartmentIcon color="success" sx={{ fontSize: 36 }} />,
};

export default function StepCompanyPlan({ data, onBack, onComplete }: any) {
  const { data: plans, isLoading: plansLoading } = usePlans();
  const { mutateAsync, isPending: posting } = usePostStep(3);
  const toast = useToast();
  const setStore = useOnboardingStore((s) => s.setData);
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [dragWidth, setDragWidth] = useState(0);
  const [selected, setSelected] = useState<string | null>(data.plan_id ?? null);

  useEffect(() => {
    // Animate cards in
    if (innerRef.current) {
      gsap.fromTo(
        innerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, ease: "power3.out", duration: 0.5 }
      );
    }
  }, []);

  useEffect(() => {
    const updateDragWidth = () => {
      if (containerRef.current && innerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const innerWidth = innerRef.current.scrollWidth;
        const rightPadding = 24;
        setDragWidth(containerWidth - innerWidth - rightPadding);
      }
    };

    updateDragWidth();
    window.addEventListener("resize", updateDragWidth);
    return () => window.removeEventListener("resize", updateDragWidth);
  }, [plans]);

  const handleSubmit = async () => {
    if (!selected) {
      toast.error("Please choose a plan");
      return;
    }
    try {
      const res = await mutateAsync({ plan_id: selected });
      setStore({ plan_id: selected });
      toast.success(res.detail || "Subscription created");
      onComplete?.();
      router.replace("/dashboard");
    } catch (err: any) {
      toast.error(err?.detail || err?.message || "Failed to subscribe");
    }
  };

  return (
    <Stack spacing={4}>
      <Typography variant="h6" fontWeight={600} align="center">
        Choose a Subscription Plan
      </Typography>

      {plansLoading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          ref={containerRef}
          sx={{
            overflow: "hidden",
            width: "100%",
            pb: 2,
            px: 1.5,
          }}
        >
          <motion.div
            ref={innerRef}
            drag="x"
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 200, bounceDamping: 25 }}
            dragConstraints={{ left: dragWidth, right: 0 }}
            style={{
              display: "flex",
              gap: "1.5rem",
              cursor: "grab",
              alignItems: "stretch",
              padding: "0.75rem",
            }}
            whileTap={{ cursor: "grabbing" }}
          >
            {plans?.map((p: any) => {
              const isSelected = selected === p.uuid;
              return (
                <motion.div
                  key={p.uuid}
                  style={{ display: "flex" }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelected(p.uuid)}
                  animate={{
                    scale: isSelected ? 1.05 : 1,
                    borderColor: isSelected ? "#1976d2" : "rgba(0,0,0,0.12)",
                  }}
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                >
                  <Card
                    sx={{
                      width: 260,
                      height: "100%", // ✅ isi penuh tinggi parent
                      borderRadius: 3,
                      textAlign: "center",
                      cursor: "pointer",
                      border: "2px solid",
                      borderColor: isSelected ? "primary.main" : "divider",
                      backgroundColor: "background.paper",
                      userSelect: "none",
                      boxShadow: "none",
                      display: "flex",
                      flexDirection: "column", // ✅ biar konten fleksibel
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      {" "}
                      {/* ✅ isi menyesuaikan tinggi */}
                      <Stack spacing={2} alignItems="center">
                        {iconMap[p.title] || (
                          <StarBorderIcon
                            color="disabled"
                            sx={{ fontSize: 36 }}
                          />
                        )}
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          color={isSelected ? "primary.main" : "text.primary"}
                        >
                          {p.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          fontWeight="600"
                          color={isSelected ? "primary.main" : "text.secondary"}
                        >
                          {p.price === "0.00" ? "Free" : `$${p.price}/month`}
                        </Typography>

                        <Stack spacing={0.5} sx={{ mt: 1 }}>
                          {p.features
                            .slice(0, 5)
                            .map((f: string, idx: number) => (
                              <Typography
                                key={idx}
                                variant="body2"
                                color="text.secondary"
                                noWrap
                              >
                                • {f}
                              </Typography>
                            ))}
                        </Stack>

                        {p.title === "pro" && (
                          <Box
                            sx={{
                              mt: "auto",
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 10,
                              fontSize: 12,
                              fontWeight: 600,
                              color: "white",
                              bgcolor: "primary.main",
                              textTransform: "uppercase",
                            }}
                          >
                            Most Popular
                          </Box>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </Box>
      )}

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="outlined" onClick={onBack} disabled={posting}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={posting || !selected}
          sx={{ px: 4 }}
        >
          {posting ? "Completing..." : "Complete Setup"}
        </Button>
      </Stack>
    </Stack>
  );
}

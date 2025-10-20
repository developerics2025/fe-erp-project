"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import office from "@/assets/office.jpg";
import IntegrataWhite from "@/assets/integrata-white.svg";
import IntegrataBlack from "@/assets/integrata-black.svg";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";
import { useTheme } from "next-themes";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Container,
  Paper,
  useMediaQuery,
  useTheme as useMuiTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { resolvedTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isTabletOrMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    gsap.to("header", {
      scrollTrigger: {
        trigger: "body",
        start: "50px top",
        end: "bottom bottom",
        toggleActions: "play reverse play reverse",
        onEnter: () => setIsScrolled(true),
        onLeaveBack: () => setIsScrolled(false),
        onEnterBack: () => setIsScrolled(true),
        onLeave: () => setIsScrolled(false),
      },
    });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [mounted]);

  if (!mounted) return null;

  const getHeaderBackground = () => {
    if (isScrolled) {
      return resolvedTheme === "dark"
        ? "rgba(18, 18, 18, 1)"
        : "rgba(255, 255, 255, 1)";
    }
    return "transparent";
  };

  const getBackdropFilter = () => {
    return isTabletOrMobile && isScrolled ? "blur(10px)" : "blur(0px)";
  };

  const getBoxShadow = () => {
    if (isTabletOrMobile && isScrolled) {
      return resolvedTheme === "dark"
        ? "0 4px 20px rgba(0, 0, 0, 0.3)"
        : "0 4px 20px rgba(0, 0, 0, 0.5)";
    }
    return "none";
  };

  const getHeaderPadding = () => {
    if (!isTabletOrMobile) {
      return "16px 0";
    }
    return isScrolled ? "8px 0" : "16px 0";
  };

  const getLogoSize = () => {
    return isScrolled ? 35 : 40;
  };

  const getFontSize = () => {
    if (!isTabletOrMobile) {
      return "1.25rem";
    }
    return isScrolled ? "1.1rem" : "1.25rem";
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)",
            zIndex: 1,
          },
        }}
      >
        <Image
          src={office}
          alt="Background"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
      </Box>

      <motion.header
        initial={false}
        animate={{
          backgroundColor: getHeaderBackground(),
          backdropFilter: getBackdropFilter(),
          boxShadow: getBoxShadow(),
          padding: getHeaderPadding(),
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          width: "100%",
        }}
      >
        <Container maxWidth={false} sx={{ px: 3 }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              minHeight: { xs: "60px", sm: "70px" },
              transition: "min-height 0.3s ease",
            }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ display: "flex", alignItems: "center", gap: "12px" }}
            >
              <Image
                src={resolvedTheme === "dark" ? IntegrataWhite : IntegrataBlack}
                alt="Integrata ERP Logo"
                width={getLogoSize()}
                height={getLogoSize()}
                style={{
                  transition: "all 0.3s ease",
                }}
              />
              <Typography
                variant="h6"
                fontWeight="600"
                sx={{
                  color: resolvedTheme === "dark" ? "white" : "text.primary",
                  fontSize: getFontSize(),
                  transition: "all 0.3s ease",
                }}
              >
                Integrata ERP
              </Typography>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <DarkModeToggle />
            </motion.div>
          </Toolbar>
        </Container>
      </motion.header>

      <Box
        component="main"
        sx={{
          flex: 1,
          mt: { xs: 8, sm: 10 },
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          px: 2,
          py: { xs: 4, sm: 6 },
          zIndex: 2,
          position: "relative",
          overflowY: "auto",
        }}
      >
        <Container maxWidth={false}>{children}</Container>
      </Box>
    </Box>
  );
}

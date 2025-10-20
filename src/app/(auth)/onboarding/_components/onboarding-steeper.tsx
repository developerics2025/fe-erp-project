"use client";
import { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import StepCompanyIdentity from "./step-1";
import StepCompanyDetail from "./step-2";
import StepCompanyPlan from "./step-3";
import MarketingPanel from "./description";
import { useOnboardingStore } from "./useOnboarding";

const steps = ["Company Identity", "Company Details", "Subscription Plan"];

export default function OnboardingStepper() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeStep, setActiveStep] = useState(0);
  const { data: storeData, setData, reset } = useOnboardingStore();

  const handleNext = (partial?: Record<string, any>) => {
    if (partial) setData(partial);
    setActiveStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const handleBack = () => setActiveStep((s) => Math.max(0, s - 1));

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <StepCompanyIdentity data={storeData} onNext={handleNext} />;
      case 1:
        return (
          <StepCompanyDetail
            data={storeData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <StepCompanyPlan
            data={storeData}
            onBack={handleBack}
            onComplete={() => {
              reset();
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>
              <Typography fontWeight="bold" fontSize={{ xs: 13, sm: 15 }}>
                {label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 2 ? (
        // ✅ Step 3: full width (tanpa 2 kolom)
        <Box sx={{ width: "100%" }}>{renderStep()}</Box>
      ) : (
        // ✅ Step 1 & 2: tetap dua kolom
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "flex-start",
            gap: { xs: 3, md: 6 },
          }}
        >
          <Box sx={{ flexBasis: { xs: "100%", md: "40%" }, flexShrink: 0 }}>
            <MarketingPanel step={activeStep} />
          </Box>

          <Box sx={{ flex: 1, width: "100%", maxWidth: { md: "60%" } }}>
            {renderStep()}
          </Box>
        </Box>
      )}
    </Box>
  );
}

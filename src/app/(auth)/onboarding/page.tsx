import { Container, Paper } from "@mui/material";
import OnboardingStepper from "./_components/onboarding-steeper";

export default function OnboardingPage() {
  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Paper
        elevation={6}
        sx={{
          borderRadius: 3,
          p: { xs: 2, md: 4 },
        }}
      >
        <OnboardingStepper />
      </Paper>
    </Container>
  );
}

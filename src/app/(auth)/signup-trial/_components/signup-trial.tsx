"use client";

import {
  TextField,
  Button,
  Box,
  Divider,
  Typography,
  Link,
  useTheme,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import { useSignupTrial } from "./useSignupTrial";
import GoogleIcon from "@mui/icons-material/Google";

export default function SignupTrialForm() {
  const { form, onSubmit, isPending } = useSignupTrial();
  const theme = useTheme();

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 480, // atur lebar maksimal form
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          bgcolor:
            theme.palette.mode === "dark"
              ? "rgba(30,30,30,0.9)"
              : "rgba(255,255,255,0.9)",
          backdropFilter: "blur(6px)",
        }}
      >
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography
              variant="h5"
              fontWeight="bold"
              align="center"
              sx={{ py: 2 }}
            >
              Create Your Trial Account
            </Typography>

            <Box display="flex" gap={2}>
              <TextField
                label="First Name"
                {...form.register("first_name")}
                error={!!form.formState.errors.first_name}
                helperText={form.formState.errors.first_name?.message}
                fullWidth
              />
              <TextField
                label="Last Name"
                {...form.register("last_name")}
                error={!!form.formState.errors.last_name}
                helperText={form.formState.errors.last_name?.message}
                fullWidth
              />
            </Box>

            <TextField
              label="Email"
              type="email"
              {...form.register("email")}
              error={!!form.formState.errors.email}
              helperText={form.formState.errors.email?.message}
              fullWidth
            />

            <TextField
              label="Password"
              type="password"
              {...form.register("password")}
              error={!!form.formState.errors.password}
              helperText={form.formState.errors.password?.message}
              fullWidth
            />

            <TextField
              label="Confirm Password"
              type="password"
              {...form.register("confirm_password")}
              error={!!form.formState.errors.confirm_password}
              helperText={form.formState.errors.confirm_password?.message}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isPending}
              size="large"
              sx={{ mt: 1 }}
            >
              {isPending ? "Creating Account..." : "Start Free Trial"}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon sx={{ color: "#4285F4" }} />}
            onClick={handleGoogleLogin}
            sx={{
              mb: 3,
              py: 1.5,
              borderColor: "grey.400",
              color: theme.palette.mode === "dark" ? "#fff" : "#000",
              "&:hover": {
                borderColor: "grey.600",
                backgroundColor:
                  theme.palette.mode === "dark" ? "grey.800" : "grey.50",
                color: theme.palette.mode === "dark" ? "#fff" : "#000",
              },
            }}
          >
            Continue with Google
          </Button>

          <Box display="flex" flexDirection="column" gap={1} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Link href="/signin" underline="hover">
                Sign In
              </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Want to create a regular account?{" "}
              <Link href="/signup" underline="hover">
                Create Account
              </Link>
            </Typography>
          </Box>
        </motion.form>
      </Paper>
    </Box>
  );
}

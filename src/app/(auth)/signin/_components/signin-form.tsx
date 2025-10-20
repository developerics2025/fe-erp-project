"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import Link from "next/link";
import { signInSchema, SignInFormData } from "@/validations/auth-validation";
import { Google as GoogleIcon } from "@mui/icons-material"; // Placeholder for Google Icon
import { useSignIn } from "./useSignin";

export default function SignInForm() {
  const { mutateAsync, isPending } = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    await mutateAsync(data);
  };

  const handleGoogleSignIn = () => {};

  return (
    <Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
          <Link href="/forgot-password" style={{ textDecoration: "none" }}>
            <Typography
              variant="body2"
              color="primary"
              sx={{
                cursor: "pointer", // Menjamin kursor pointer
                "&:hover": { textDecoration: "underline" }, // Tambahkan underline saat hover
              }}
            >
              Forgot Password?
            </Typography>
          </Link>
        </Box>

        <Button
          type="submit"
          variant="contained"
          disabled={isPending}
          sx={{ py: 1.2, borderRadius: 2 }}
        >
          {isPending ? "Signing in..." : "Sign In"}
        </Button>

        <Divider sx={{ mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            OR
          </Typography>
        </Divider>
        <Stack spacing={2}>
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignIn}
            sx={{ py: 1.2, borderRadius: 2 }}
          >
            <Typography variant="caption" color="text.secondary">
              Signin with Google
            </Typography>
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

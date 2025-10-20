"use client";

import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import Link from "next/link";
import SignInForm from "./signin-form";

export default function SignInComponent() {
  return (
    <Card
      sx={{ maxWidth: 420, mx: "auto", mt: 4, borderRadius: 3, boxShadow: 6 }}
      variant="outlined"
    >
      <CardHeader
        title={
          <Typography variant="h5" align="center" fontWeight={600}>
            Sign In to Integrata ERP
          </Typography>
        }
      />
      <CardContent>
        <SignInForm />

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}

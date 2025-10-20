"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Stack } from "@mui/material";
import { useToast } from "@/hooks/use-toast";
import { useOnboardingStore, usePostStep } from "./useOnboarding";
import { Step1Form, step1Schema } from "@/validations/auth-validation";

export default function StepCompanyIdentity({
  data,
  onNext,
}: {
  data: any;
  onNext: (d?: any) => void;
}) {
  const setStore = useOnboardingStore((s) => s.setData);
  const { mutateAsync, isPending } = usePostStep(1);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Form>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      name: data.name ?? "",
      legal_name: data.legal_name ?? "",
      legal_no: data.legal_no ?? "",
      contact_no: data.contact_no ?? "",
      email: data.email ?? "",
    },
  });

  const onSubmit = async (values: Step1Form) => {
    try {
      const res = await mutateAsync(values);
      setStore(values);
      toast.success(res.detail || "Step 1 completed");
      onNext(values);
    } catch (err: any) {
      toast.error(err?.detail || err?.message || "Failed to save step 1");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          label="Company Name"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Legal Name"
          {...register("legal_name")}
          error={!!errors.legal_name}
          helperText={errors.legal_name?.message}
        />
        <TextField
          label="Legal Registration No."
          {...register("legal_no")}
          error={!!errors.legal_no}
          helperText={errors.legal_no?.message}
        />
        <TextField
          label="Contact Number"
          {...register("contact_no")}
          error={!!errors.contact_no}
          helperText={errors.contact_no?.message}
        />
        <TextField
          label="Company Email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          type="email"
        />
        <Button type="submit" variant="contained" disabled={isPending}>
          {isPending ? "Saving..." : "Next"}
        </Button>
      </Stack>
    </form>
  );
}

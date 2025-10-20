"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Stack } from "@mui/material";
import { Step2Form, step2Schema } from "@/validations/auth-validation";
import { useToast } from "@/hooks/use-toast";
import { useOnboarding } from "./useOnboarding";

export default function StepCompanyDetail({ data, onNext, onBack }: any) {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2Form>({
    resolver: zodResolver(step2Schema),
    defaultValues: data,
  });

  const { mutateAsync, setStore, isLoading } = useOnboarding(2);

  const onSubmit: SubmitHandler<Step2Form> = async (values) => {
    try {
      const res = await mutateAsync(values);
      setStore(values);
      toast.success(res.detail || "Step 2 completed");
      onNext(values);
    } catch (err: any) {
      toast.error(err?.detail || err?.message || "Failed to save step 2");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          label="Company Description"
          multiline
          rows={3}
          {...register("detail")}
          error={!!errors.detail}
          helperText={errors.detail?.message}
        />
        <TextField
          label="Company Type"
          {...register("type")}
          error={!!errors.type}
          helperText={errors.type?.message}
        />
        <TextField
          label="Business Field"
          {...register("field")}
          error={!!errors.field}
          helperText={errors.field?.message}
        />
        <TextField
          label="Address"
          {...register("address")}
          error={!!errors.address}
          helperText={errors.address?.message}
        />
        <TextField
          label="Website"
          {...register("website")}
          error={!!errors.website}
          helperText={errors.website?.message}
        />

        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? "Saving..." : "Next"}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}

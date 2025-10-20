import * as z from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character"
  );

export const signupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: passwordSchema,
    confirm_password: z.string().min(1, "Confirm password is required"),
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

export type SignupFormValues = z.infer<typeof signupSchema>;

export const resendActivationSchema = z.object({
  email: z.string().email("Invalid email address."),
});

export type ResendActivationSchema = z.infer<typeof resendActivationSchema>;

export const step1Schema = z.object({
  name: z.string().min(1, "Company name is required"),
  legal_name: z.string().min(1, "Legal name is required"),
  legal_no: z.string().min(1, "Legal registration number is required"),
  contact_no: z.string().min(1, "Contact number is required"),
  email: z.string().email("Invalid email"),
});

export type Step1Form = z.infer<typeof step1Schema>;

export const step2Schema = z.object({
  detail: z.string().min(1, "Company description is required"),
  type: z.string().min(1, "Company type is required"),
  field: z.string().min(1, "Business field is required"),
  address: z.string().min(1, "Address is required"),
  website: z.string().url("Must be a valid URL").optional(),
});

export type Step2Form = z.infer<typeof step2Schema>;

export const step3Schema = z.object({
  plan_id: z.string().uuid("Plan id must be a UUID"),
});

export type Step3Form = z.infer<typeof step3Schema>;

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignInFormData = z.infer<typeof signInSchema>;

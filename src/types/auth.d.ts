// types/auth.d.ts
export interface SignupTrialPayload {
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string; // Changed to required since we're passing empty string as default
}

export interface SignupResponse {
  detail?: string;
  error?: Record<string, string[]> | string;
}

export interface SignupTrialFormData {
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name?: string;
}

export interface ServerErrors {
  general?: string;
  [key: string]: string | undefined;
}

export interface FieldTouchedState {
  [key: string]: boolean;
}

export interface ShowErrorsState {
  [key: string]: boolean;
}

export interface ApiError {
  response?: {
    data?: {
      error?: Record<string, string[]> | string;
      detail?: string;
    };
  };
  message?: string;
}

export interface ResendActivationPayload {
  email: string;
}

type ResendActivationResponse = {
  status: boolean;
  data?: {
    detail: string;
    retry_after?: number;
    attempt_count?: number;
  };
  error?: any;
};

const res: ResendActivationResponse = await resendMutation.mutateAsync({
  email,
});

export interface CheckEmailState {
  email: string;
  countdown: number;
  canResend: boolean;
  message: string;
  trial: boolean;
}

export type ActivationStatus = "loading" | "success" | "error";

export interface ActivationState {
  loading: boolean;
  message: string | null;
  isTrial: boolean;
  onboardingCompleted: boolean;
  onboardingStep?: number;
  countdown: number;
}

type ResendResponse = {
  status: boolean;
  data?: {
    detail: string;
    retry_after?: number;
    attempt_count?: number;
  };
  error?: any;
};

export interface CompanyOnboardingResponse {
  detail: string;
  step: number;
  onboarding_completed: boolean;
  [k: string]: any;
}

export type SubscriptionStatus = "none" | "trial" | "active" | "inactive";

export interface UserStatus {
  has_company: boolean;
  onboarding_completed: boolean;
  subscription_status: SubscriptionStatus;
  current_onboarding_step: number;
}

export interface SignInSuccessData {
  access: string;
  user_status: UserStatus;
}

import api from "@/libs/api";
import { useMutation } from "@tanstack/react-query";
import { ResendActivationResponse } from "@/types/auth";
import { CompanyOnboardingResponse } from "@/types/auth";
import { SignInSuccessData } from "@/types/auth";
import { SignInFormData } from "@/validations/auth-validation";
import { SignupFormValues } from "@/validations/auth-validation";

export const activateAccountApi = async (token: string) => {
  const response = await api.post("/account/activate/", { token });
  return response.data.data ? response.data.data : response.data;
};

export function useResendActivation() {
  return useMutation({
    mutationFn: async (payload: {
      email: string;
    }): Promise<ResendActivationResponse> => {
      const response = await api.post("/account/resend-activation/", payload, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    },
  });
}

export async function postOnboardingStep(
  step: number,
  payload: any
): Promise<CompanyOnboardingResponse> {
  const response = await api.post(`/account/onboarding/step-${step}/`, payload);
  return response.data;
}

export async function getPlans(): Promise<
  Array<{ id: string; title: string; price: number }>
> {
  const res = await api.get("/account/plans/");
  const data = res.data;

  if (Array.isArray(data?.data?.results)) return data.data.results;
  return [];
}

export const signInUser = async (
  data: SignInFormData
): Promise<SignInSuccessData> => {
  const res = await api.post("/account/token/", data);

  return res.data.data as SignInSuccessData;
};

export async function signupAction(data: SignupFormValues) {
  const res = await api.post("/account/signup/", data);
  return res.data;
}

export async function signupTrialAction(data: SignupFormValues) {
  const res = await api.post("/account/signup/trial/", data);
  return res.data;
}

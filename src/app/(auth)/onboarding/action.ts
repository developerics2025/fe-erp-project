import api from "@/libs/api";
import { CompanyOnboardingResponse } from "@/types/auth";

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

  // Format dari backend: { status, version, data: { results: [...] } }
  if (Array.isArray(data?.data?.results)) return data.data.results;

  // fallback untuk format lain
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data)) return data;

  console.warn("⚠️ Unexpected plan response format:", data);
  return [];
}

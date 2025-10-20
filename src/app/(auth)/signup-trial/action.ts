import { SignupFormValues } from "@/validations/auth-validation";
import api from "@/libs/api";

export async function signupTrialAction(data: SignupFormValues) {
  const res = await api.post("/account/signup/trial/", data);
  return res.data;
}

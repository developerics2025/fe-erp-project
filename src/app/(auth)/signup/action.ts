import { SignupFormValues } from "@/validations/auth-validation";
import api from "@/libs/api";

export async function signupAction(data: SignupFormValues) {
  const res = await api.post("/account/signup/", data);
  return res.data;
}

import api from "@/libs/api";
import { SignInSuccessData } from "@/types/auth";
import { SignInFormData } from "@/validations/auth-validation";
export const signInUser = async (
  data: SignInFormData
): Promise<SignInSuccessData> => {
  const res = await api.post("/account/token/", data);

  return res.data.data as SignInSuccessData;
};

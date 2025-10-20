import api from "@/libs/api";

export const activateAccountApi = async (token: string) => {
  const response = await api.post("/account/activate/", { token });
  return response.data.data ? response.data.data : response.data;
};

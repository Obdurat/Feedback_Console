import { api } from "../lib/api";

export const initLogin = async (employeeCode: string) => {
  const response = await api.post("/auth/init", { employeeCode });
  console.log("initLogin response:", response.data);
  return response.data;
};

export const verifyTotp = async (memberId: string, code: string) => {
  const response = await api.post("/auth/verify", { memberId, code });
  return response.data;
};

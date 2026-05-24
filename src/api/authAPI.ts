import { api } from "../lib/api";

export interface LoginPayload {
  employeeCode: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

export const changePassword = async (payload: {
  newPassword: string;
  confirmPassword: string;
}) => {
  const response = await api.post("/auth/change-password", payload);
  return response.data;
};

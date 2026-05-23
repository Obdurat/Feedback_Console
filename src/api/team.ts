import { api } from "../lib/api";
import type { TeamMember } from "../types/team.types";

export interface GetTeamMembersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
  wave?: number;
}

export const getTeamMembers = async (
  params?: GetTeamMembersParams,
): Promise<TeamMember[]> => {
  const response = await api.get("/team-members", { params });
  return response.data;
};

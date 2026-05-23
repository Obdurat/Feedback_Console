import { api } from "../lib/api";

import type { TeamMember } from "../types/team.types";

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  const response = await api.get("/team-members");

  console.log("Fetched team members:", response.data);

  return response.data;
};

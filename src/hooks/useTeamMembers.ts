import { useQuery } from "@tanstack/react-query";
import { getTeamMembers, type GetTeamMembersParams } from "../api/team";

export const useTeamMembers = (params?: GetTeamMembersParams) => {
  return useQuery({
    queryKey: ["team-members", params],
    queryFn: () => getTeamMembers(params),
  });
};

import { useQuery } from "@tanstack/react-query";
import { getTeamMembers } from "../api/team";

export const useTeamMembers = () => {
  return useQuery({
    queryKey: ["team-members"],

    queryFn: getTeamMembers,
  });
};

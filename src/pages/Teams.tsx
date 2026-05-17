import { TeamTable } from "../components/team/teamTable";
import { getTeamMembers } from "../api/team";
import { useQuery } from "@tanstack/react-query";

export const Teams = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["team"],
    queryFn: getTeamMembers,
  });

  if (isLoading) return <progress className="progress w-56"></progress>;

  return <TeamTable members={data ?? []} />;
};

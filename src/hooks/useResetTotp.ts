import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetMemberTotp } from "../api/team";

export const useResetTotp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetMemberTotp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
    },
  });
};

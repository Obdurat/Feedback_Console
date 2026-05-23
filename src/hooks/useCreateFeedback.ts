import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createFeedback } from "../api/feedbackAPI";

export const useCreateFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFeedback,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["team-members"],
      });
    },
  });
};

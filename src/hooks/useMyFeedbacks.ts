import { useQuery } from "@tanstack/react-query";
import { getMyFeedbacks } from "../api/team";

export const useMyFeedbacks = () => {
  return useQuery({
    queryKey: ["my-feedbacks"],
    queryFn: getMyFeedbacks,
  });
};

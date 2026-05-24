import { api } from "../lib/api";

import type { FeedbackFormData } from "../components/team/FeedbackModal";

interface CreateFeedbackPayload extends FeedbackFormData {
  memberId: string;
}

export const createFeedback = async (payload: CreateFeedbackPayload) => {
  const response = await api.post("/feedbacks", payload);

  return response.data;
};

export const setFeedbackVisibility = async (
  feedbackId: string,
  viewed: boolean | undefined,
) => {
  if (viewed) return;
  const response = await api.patch(`/feedbacks/${feedbackId}/viewed`);

  return response.data;
};

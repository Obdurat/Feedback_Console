import type { FeedbackEntry } from "../types/team.types";

interface CreateFeedbackPayload {
  memberId: string;

  feedback: {
    type: "POSITIVE" | "IMPROVEMENT";
    category: string;
    comment: string;
  };
}

export const createFeedback = async ({
  feedback,
}: CreateFeedbackPayload): Promise<FeedbackEntry> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // simulate occasional failure
      const success = Math.random() > 0.2;

      if (!success) {
        reject(new Error("Failed to send feedback email"));
        return;
      }

      resolve({
        id: crypto.randomUUID(),

        date: new Date().toISOString(),

        ...feedback,
      });
    }, 2000);
  });
};

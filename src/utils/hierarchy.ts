const ROLE_RANK: Record<string, number> = {
  Director: 5,
  Manager: 4,
  "Team Manager": 3,
  "Team Lead": 2,
  "Customer Support Specialist": 1,
};

export const canGiveFeedbackTo = (
  submitterRole: string,
  targetRole: string,
): boolean => {
  const submitterRank = ROLE_RANK[submitterRole] ?? 0;
  const targetRank = ROLE_RANK[targetRole] ?? 0;

  return submitterRank > targetRank;
};

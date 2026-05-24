import type { SimpleTeamMember } from "./team.types";

export interface DashboardStats {
  totalActiveMembers: number;
  totalFeedbacksThisMonth: number;
  positiveRatio: number;
  improvementRatio: number;
  positiveFeedbacksThisMonth: number;
  improvementFeedbacksThisMonth: number;
  topSubmitter: (SimpleTeamMember & { count: number }) | null;
}

export interface FeedbackByCategory {
  category: string;
  POSITIVE: number;
  IMPROVEMENT: number;
}

export interface RecentFeedback {
  id: string;
  type: "POSITIVE" | "IMPROVEMENT";
  category: string;
  comment: string; // add this
  createdAt: string;
  member: SimpleTeamMember;
  submittedBy: SimpleTeamMember;
  viewed: boolean;
  viewedAt: string | null;
}

export interface TopMemberEntry {
  memberId: string;
  POSITIVE: number;
  IMPROVEMENT: number;
  total: number;
  member: SimpleTeamMember & { role: { name: string } };
}

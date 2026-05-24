export type FeedbackType = "POSITIVE" | "IMPROVEMENT";

export interface Role {
  id: string;

  name: string;
}

export interface SimpleTeamMember {
  id: string;

  name: string;

  role: Role;
}

export interface FeedbackEntry {
  id: string;

  memberId: string;

  createdAt: string;

  comment: string;

  type: FeedbackType;

  category: string;

  submittedBy: SimpleTeamMember;

  viewed: boolean;

  viewedAt: string | null;
}

export interface TeamMember {
  id: string;

  name: string;

  status: "Active" | "Inactive";

  hiringDate: string;

  wave: number;

  createdAt: string;

  role: Role;

  employeeCode: string;

  reportsTo: SimpleTeamMember | null;

  receivedFeedbacks: FeedbackEntry[];
}

export interface MyFeedbacksResponse {
  member: TeamMember;
  stats: {
    total: number;
    positive: number;
    improvement: number;
    positiveRatio: number;
  };
}

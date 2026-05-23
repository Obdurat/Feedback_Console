type FeedbackEntry = {
  id: string;
  date: string; // ISO format: 2026-05-16T14:30:00Z
  comment: string; // Markdown formatted comment
  type: "POSITIVE" | "IMPROVEMENT";
  category: string; // E.g., "Communication", "Technical Skills", etc.
};

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  status: "Active" | "Inactive";
  hiringDate: string; // ISO format: 2026-05-16
  wave: number; // For sorting by seniority
  teamLead: string; // Name of the team lead
  teamManager: string; // Name of the team manager
  manager: string; // Name of the manager
  director: string; // Name of the director
  feedbacks: FeedbackEntry[] | null; // Array of feedback entries
}

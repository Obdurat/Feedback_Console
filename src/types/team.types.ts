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
}

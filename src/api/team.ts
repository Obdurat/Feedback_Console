import type { TeamMember } from "../types/team.types";

const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Alice Johnson",
    position: "Senior Agent",
    status: "Active",
    hiringDate: "2020-01-15",
    wave: 1,
    teamLead: "Bob Smith",
    teamManager: "Carol Davis",
    manager: "David Wilson",
    director: "Eve Thompson",
    feedbacks: null,
  },
  {
    id: "2",
    name: "Michael Brown",
    position: "Junior Agent",
    status: "Active",
    hiringDate: "2021-06-10",
    wave: 2,
    teamLead: "Bob Smith",
    teamManager: "Carol Davis",
    manager: "David Wilson",
    director: "Eve Thompson",
    feedbacks: [
      {
        id: "feedback1",
        date: "2023-10-15T14:30:00Z",
        comment: "Great work on the recent project!",
        type: "POSITIVE",
        category: "Technical Skills",
      },
      {
        id: "feedback2",
        date: "2023-11-01T10:00:00Z",
        comment: "Needs improvement in communication.",
        type: "IMPROVEMENT",
        category: "Communication",
      },
    ],
  },
  {
    id: "3",
    name: "Emily Davis",
    position: "Senior Agent",
    status: "Inactive",
    hiringDate: "2019-03-20",
    wave: 1,
    teamLead: "Bob Smith",
    teamManager: "Carol Davis",
    manager: "David Wilson",
    director: "Eve Thompson",
    feedbacks: null,
  },
];

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTeamMembers);
    }, 2000);
  });
};

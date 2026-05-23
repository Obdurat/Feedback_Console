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
    id: "tm-001",

    name: "John Carter",

    position: "Customer Support Specialist",

    status: "Active",

    hiringDate: "2025-09-12",

    wave: 3,

    teamLead: "Anderson Rodrigues",

    teamManager: "Sarah Johnson",

    manager: "Michael Lee",

    director: "Emma Wilson",

    feedbacks: [
      {
        id: "fb-001",

        date: "2026-05-23T14:32:00Z",

        type: "IMPROVEMENT",

        category: "Communication",

        comment: `
# Communication Improvement Feedback

There are opportunities to improve incident communication and shift handoffs.

## Main Points
- Delayed escalation updates
- Missing ownership confirmations
- Incomplete ticket notes

Please focus on proactive communication during high priority incidents.
      `,
      },

      {
        id: "fb-002",

        date: "2026-05-15T09:10:00Z",

        type: "POSITIVE",

        category: "Performance",

        comment: `# Excellent Sprint Performance
You handled the backlog exceptionally well during the last sprint.

## Highlights

- Closed 34 tickets
- Assisted new agents
- Maintained SLA compliance above 98%

Great job.
`,
      },
    ],
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

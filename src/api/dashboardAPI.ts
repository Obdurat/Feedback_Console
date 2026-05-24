import { api } from "../lib/api";

export const getDashboardStats = () =>
  api.get("/dashboard/stats").then((r) => r.data);
export const getFeedbacksByCategory = () =>
  api.get("/dashboard/feedbacks-by-category").then((r) => r.data);
export const getRecentFeedbacks = () =>
  api.get("/dashboard/recent-feedbacks").then((r) => r.data);
export const getTopMembers = () =>
  api.get("/dashboard/top-members").then((r) => r.data);

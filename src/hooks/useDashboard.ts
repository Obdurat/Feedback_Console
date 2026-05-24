import { useQuery } from "@tanstack/react-query";
import {
  getDashboardStats,
  getFeedbacksByCategory,
  getRecentFeedbacks,
  getTopMembers,
} from "../api/dashboardAPI";

export const useDashboardStats = () =>
  useQuery({ queryKey: ["dashboard-stats"], queryFn: getDashboardStats });

export const useFeedbacksByCategory = () =>
  useQuery({
    queryKey: ["feedbacks-by-category"],
    queryFn: getFeedbacksByCategory,
  });

export const useRecentFeedbacks = () =>
  useQuery({ queryKey: ["recent-feedbacks"], queryFn: getRecentFeedbacks });

export const useTopMembers = () =>
  useQuery({ queryKey: ["top-members"], queryFn: getTopMembers });

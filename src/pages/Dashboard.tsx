import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  useDashboardStats,
  useFeedbacksByCategory,
  useRecentFeedbacks,
  useTopMembers,
} from "../hooks/useDashboard";

import { useState } from "react";
import { FeedbackPreviewModal } from "../components/team/FeedbackPreviewModal";
import type { FeedbackEntry } from "../types/team.types";

import type { RecentFeedback, TopMemberEntry } from "../types/dashboard.types";

export const Dashboard = () => {
  const [selectedFeedback, setSelectedFeedback] =
    useState<FeedbackEntry | null>(null);

  const { data: stats } = useDashboardStats();
  const { data: byCategory } = useFeedbacksByCategory();
  const { data: recentFeedbacks } = useRecentFeedbacks();
  const { data: topMembers } = useTopMembers();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-base-300 rounded-box p-5 flex flex-col gap-1">
          <span className="text-xs opacity-50">Active Members</span>
          <span className="text-3xl font-bold">
            {stats?.totalActiveMembers ?? "—"}
          </span>
        </div>

        <div className="bg-base-300 rounded-box p-5 flex flex-col gap-1">
          <span className="text-xs opacity-50">Feedbacks This Month</span>
          <span className="text-3xl font-bold">
            {stats?.totalFeedbacksThisMonth ?? "—"}
          </span>
        </div>

        <div className="bg-base-300 rounded-box p-5 flex flex-col gap-1">
          <span className="text-xs opacity-50">Positive Rate</span>
          <span className="text-3xl font-bold text-success">
            {stats ? `${stats.positiveRatio}%` : "—"}
          </span>
        </div>

        <div className="bg-base-300 rounded-box p-5 flex flex-col gap-1">
          <span className="text-xs opacity-50">Top Submitter</span>
          <span className="text-lg font-bold truncate">
            {stats?.topSubmitter?.name ?? "—"}
          </span>
          {stats?.topSubmitter && (
            <span className="text-xs opacity-50">
              {stats.topSubmitter.count} feedbacks
            </span>
          )}
        </div>
      </div>

      {/* Chart + Recent Feedbacks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bar Chart */}
        <div className="bg-base-300 rounded-box p-5 flex flex-col gap-4">
          <h2 className="font-bold">Feedbacks by Category</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={byCategory ?? []} barCategoryGap="30%">
              <XAxis
                dataKey="category"
                tick={{ fontSize: 11, fill: "rgba(255,255,255,0.5)" }}
                axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 11, fill: "rgba(255,255,255,0.5)" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1d232a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
              />
              <Legend
                wrapperStyle={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}
              />
              <Bar dataKey="POSITIVE" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="IMPROVEMENT" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Feedbacks */}
        <div className="bg-base-300 rounded-box p-5 flex flex-col gap-3">
          <h2 className="font-bold">Recent Feedbacks</h2>
          <div className="flex flex-col gap-2 overflow-y-auto max-h-72">
            {recentFeedbacks?.map((fb: RecentFeedback) => (
              <button
                key={fb.id}
                onClick={() =>
                  setSelectedFeedback({ ...fb, memberId: fb.member.id })
                }
                className="bg-base-200 rounded-lg px-4 py-3 flex items-center justify-between gap-3 text-left hover:bg-base-100 transition"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">{fb.member.name}</span>
                  <span className="text-xs opacity-50">
                    {fb.category} · by {fb.submittedBy.name}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`badge badge-sm ${fb.type === "POSITIVE" ? "badge-success" : "badge-error"}`}
                  >
                    {fb.type}
                  </span>
                  <span className="text-xs opacity-40">
                    {new Date(fb.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top Members */}
      <div className="bg-base-300 rounded-box p-5 flex flex-col gap-4">
        <h2 className="font-bold">Top Members by Feedback</h2>
        <div className="flex flex-col gap-2">
          {topMembers?.map((entry: TopMemberEntry, index: number) => (
            <div
              key={entry.memberId}
              className="flex items-center gap-4 bg-base-200 rounded-lg px-4 py-3"
            >
              <span className="text-lg font-bold opacity-30 w-5">
                #{index + 1}
              </span>
              <div className="avatar">
                <div className="mask mask-squircle h-9 w-9">
                  <img
                    src={`https://ui-avatars.com/api/?name=${entry.member.name}`}
                    alt={entry.member.name}
                  />
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-sm font-medium">{entry.member.name}</span>
                <span className="text-xs opacity-50">
                  {entry.member.role.name}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="badge badge-success badge-sm">
                  {entry.POSITIVE} positive
                </span>
                <span className="badge badge-error badge-sm">
                  {entry.IMPROVEMENT} improvement
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FeedbackPreviewModal
        feedback={selectedFeedback}
        isOpen={!!selectedFeedback}
        onClose={() => setSelectedFeedback(null)}
      />
    </div>
  );
};

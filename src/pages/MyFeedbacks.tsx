import { useState } from "react";
import { useMyFeedbacks } from "../hooks/useMyFeedbacks";
import { FeedbackPreviewModal } from "../components/team/FeedbackPreviewModal";
import type { FeedbackEntry } from "../types/team.types";

export const MyFeedbacks = () => {
  const { data, isLoading } = useMyFeedbacks();
  const [selectedFeedback, setSelectedFeedback] =
    useState<FeedbackEntry | null>(null);

  if (isLoading) return <progress className="progress w-56" />;
  if (!data) return null;

  const { member, stats } = data;

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      {/* Profile Header */}
      <div className="bg-base-300 rounded-box p-6 flex items-center gap-6">
        <div className="avatar">
          <div className="mask mask-squircle h-20 w-20">
            <img
              src={`https://ui-avatars.com/api/?name=${member.name}&size=80`}
              alt={member.name}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">{member.name}</h1>
          <div className="flex items-center gap-2">
            <span className="badge badge-ghost">{member.role.name}</span>
            <span
              className={`badge ${member.status === "Active" ? "badge-success" : "badge-error"}`}
            >
              {member.status}
            </span>
          </div>
          <span className="text-xs opacity-50">
            {member.employeeCode} · Wave {member.wave} · Since{" "}
            {new Date(member.hiringDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-base-300 rounded-box p-4 flex flex-col gap-1">
          <span className="text-xs opacity-50">Total Feedbacks</span>
          <span className="text-3xl font-bold">{stats.total}</span>
        </div>
        <div className="bg-base-300 rounded-box p-4 flex flex-col gap-1">
          <span className="text-xs opacity-50">Positive</span>
          <span className="text-3xl font-bold text-success">
            {stats.positive}
          </span>
        </div>
        <div className="bg-base-300 rounded-box p-4 flex flex-col gap-1">
          <span className="text-xs opacity-50">Improvement</span>
          <span className="text-3xl font-bold text-error">
            {stats.improvement}
          </span>
        </div>
        <div className="bg-base-300 rounded-box p-4 flex flex-col gap-1">
          <span className="text-xs opacity-50">Positive Rate</span>
          <span className="text-3xl font-bold">{stats.positiveRatio}%</span>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-base-300 rounded-box p-6 flex flex-col gap-3">
        <h2 className="font-bold text-lg">My Feedbacks</h2>

        {member.receivedFeedbacks.length === 0 ? (
          <p className="text-sm opacity-50 text-center py-6">
            No feedbacks yet.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {member.receivedFeedbacks.map((fb) => (
              <button
                key={fb.id}
                onClick={() =>
                  setSelectedFeedback({ ...fb, memberId: member.id })
                }
                className="bg-base-200 rounded-lg px-4 py-3 flex items-center justify-between gap-3 text-left hover:bg-base-100 transition"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">{fb.category}</span>
                  <span className="text-xs opacity-50">
                    by {fb.submittedBy.name}
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
        )}
      </div>

      <FeedbackPreviewModal
        feedback={selectedFeedback}
        isOpen={!!selectedFeedback}
        onClose={() => setSelectedFeedback(null)}
      />
    </div>
  );
};

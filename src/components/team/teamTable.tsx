import { useState } from "react";
import type { FeedbackEntry, TeamMember } from "../../types/team.types";
import { FeedbackModal, type FeedbackFormData } from "./FeedbackModal";
import { FeedbackPreviewModal } from "./FeedbackPreviewModal";
import { useCreateFeedback } from "../../hooks/useCreateFeedback";

interface Props {
  members: TeamMember[];
}

export const TeamTable = ({ members }: Props) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [selectedFeedback, setSelectedFeedback] =
    useState<FeedbackEntry | null>(null);

  const createFeedbackMutation = useCreateFeedback();

  const handleSubmitFeedback = async (data: FeedbackFormData) => {
    if (!selectedMember) return;

    try {
      await createFeedbackMutation.mutateAsync({
        memberId: selectedMember.id,

        feedback: {
          type: data.type,

          category: data.category,

          comment: data.comment,
        },
      });

      setToast({
        message: "Feedback submitted successfully!",
        type: "success",
      });
    } catch (error) {
      console.error(error);

      setToast({
        message: "Failed to submit feedback, Try again later.",
        type: "error",
      });
    }

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Wave</th>
              <th>Position</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td>
                  <div className="dropdown dropdown-right dropdown-center">
                    <div tabIndex={0} role="button">
                      <button className="btn btn-ghost btn-sm">
                        Feedbacks
                        <div
                          className={`badge ${
                            member.feedbacks?.length
                              ? "badge-primary"
                              : "badge-ghost"
                          }`}
                        >
                          {member.feedbacks?.length ?? 0}
                        </div>
                      </button>
                    </div>
                    <ul
                      tabIndex={-1}
                      className="dropdown-content menu bg-base-300 rounded-box z-1 w-fill p-2 shadow-sm"
                    >
                      {member.feedbacks && member.feedbacks.length > 0 ? (
                        member.feedbacks.map((fb) => (
                          <li key={fb.id}>
                            <a
                              onClick={() => setSelectedFeedback(fb)}
                              className="flex flex-col items-start"
                            >
                              <span
                                className={
                                  fb.type === "POSITIVE"
                                    ? "text-success"
                                    : "text-error"
                                }
                              >
                                {fb.type}
                              </span>
                              <div className="text-sm opacity-70">
                                {new Date(fb.date).toLocaleDateString()}
                              </div>
                              <div className="mt-1 text-sm">{fb.category}</div>
                            </a>
                          </li>
                        ))
                      ) : (
                        <li>
                          <a>No feedbacks yet</a>
                        </li>
                      )}
                    </ul>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={
                            "https://ui-avatars.com/api/?name=" + member.name
                          }
                          alt={member.name}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{member.name}</div>
                      <div className="text-sm opacity-50 bg-base-300">
                        {member.status}
                      </div>
                    </div>
                  </div>
                </td>

                <td>{member.wave}</td>

                <td>
                  CS Agent
                  <br />
                  <span className="badge badge-ghost badge-sm bg-base-300">
                    {member.position}
                  </span>
                </td>

                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setSelectedMember(member)}
                  >
                    New Feedback
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FeedbackModal
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        onSubmit={handleSubmitFeedback}
        isSubmitting={createFeedbackMutation.isPending}
      />

      <FeedbackPreviewModal
        feedback={selectedFeedback}
        isOpen={!!selectedFeedback}
        onClose={() => setSelectedFeedback(null)}
      />

      {toast && (
        <div className="toast toast-end">
          <div
            className={`alert shadow-lg ${
              toast.type === "success" ? "alert-success" : "alert-error"
            }`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </>
  );
};

import { useEffect, useState } from "react";
import type { FeedbackEntry, TeamMember } from "../../types/team.types";
import { FeedbackModal, type FeedbackFormData } from "./FeedbackModal";
import { FeedbackPreviewModal } from "./FeedbackPreviewModal";
import { useCreateFeedback } from "../../hooks/useCreateFeedback";

interface Props {
  members: TeamMember[];
}

export const TeamTable = ({ members }: Props) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

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

        type: data.type,

        category: data.category,

        comment: data.comment,

        submittedById: data.submittedById, // Replace with actual current user ID
      });

      setToast({
        message: "Feedback submitted successfully!",
        type: "success",
      });

      setSelectedMember(null);

      setTimeout(() => {
        setToast(null);
      }, 3000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setToast({
        message: "Failed to submit feedback. Please try again.",
        type: "error",
      });

      setTimeout(() => {
        setToast(null);
      }, 3000);
    }
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdownId(null);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("click", handleClickOutside);

      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <div className="">
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
                  <div
                    className={`dropdown dropdown-right relative ${
                      openDropdownId === member.id ? "dropdown-open" : ""
                    }`}
                  >
                    <button
                      role="button"
                      className="btn btn-ghost btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdownId((prev) =>
                          prev === member.id ? null : member.id,
                        );
                      }}
                    >
                      Feedbacks
                      <div
                        className={`badge ${
                          member.receivedFeedbacks?.length
                            ? "badge-primary"
                            : "badge-ghost"
                        }`}
                      >
                        {member.receivedFeedbacks?.length ?? 0}
                      </div>
                    </button>

                    <ul
                      onClick={(e) => e.stopPropagation()}
                      className={`
                      dropdown-content
                      z-[1]
                      mt-2
                      w-80
                      max-h-96
                      overflow-y-auto
                      rounded-box
                      border
                      border-base-100
                      bg-base-300
                      p-2
                      shadow-xl
                      flex
                      flex-col
                      gap-2
                      ${openDropdownId === member.id ? "block" : "hidden"}
                    `}
                    >
                      {member.receivedFeedbacks &&
                      member.receivedFeedbacks.length > 0 ? (
                        member.receivedFeedbacks.map((fb) => (
                          <li key={fb.id}>
                            <button
                              onClick={() => {
                                setSelectedFeedback(fb);

                                setOpenDropdownId(null);
                              }}
                              className="
                                w-full
                                rounded-lg
                                bg-base-200
                                px-3
                                py-2
                                text-left
                                transition
                                hover:bg-base-100
                              "
                            >
                              <div className="flex items-center justify-between">
                                <span
                                  className={`badge ${
                                    fb.type === "POSITIVE"
                                      ? "badge-success"
                                      : "badge-error"
                                  }`}
                                >
                                  {fb.type}
                                </span>

                                <span className="text-xs opacity-60">
                                  {new Date(fb.createdAt).toLocaleDateString()}
                                </span>
                              </div>

                              <div className="mt-2 text-sm font-medium">
                                {fb.category}
                                <span className="text-xs opacity-60">
                                  {" "}
                                  - {fb.submittedBy.name}
                                </span>
                              </div>
                            </button>
                          </li>
                        ))
                      ) : (
                        <li className="p-4 text-center text-sm opacity-60">
                          No feedbacks yet
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
                  Bolt OPS
                  <br />
                  <span className="badge badge-ghost badge-sm bg-base-300">
                    {member.role.name}
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

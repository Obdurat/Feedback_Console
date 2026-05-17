import { useState } from "react";
import type { TeamMember } from "../../types/team.types";
import { FeedbackModal, type FeedbackFormData } from "./FeedbackModal";
import { markdownToSafeEmailHtml } from "../../utils/sanitizeHtml";

interface Props {
  members: TeamMember[];
}

export const TeamTable = ({ members }: Props) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmitFeedback = async (data: FeedbackFormData) => {
    const cleanedComment = await markdownToSafeEmailHtml(data.comment);

    console.log("Feedback submitted ", cleanedComment);
    console.log("For member ", selectedMember);
    setToastMessage("Feedback submitted successfully!");

    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
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
                      <div className="text-sm opacity-50">{member.status}</div>
                    </div>
                  </div>
                </td>

                <td>{member.wave}</td>

                <td>
                  <span className="badge badge-ghost badge-sm">
                    {member.position}
                  </span>
                </td>

                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setSelectedMember(member)}
                  >
                    Give Feedback
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
      />

      {toastMessage && (
        <div className="toast toast-end">
          <div className="alert alert-success shadow-lg">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
};

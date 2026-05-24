import ReactMarkdown from "react-markdown";
import type { FeedbackEntry } from "../../types/team.types";

interface Props {
  feedback: FeedbackEntry | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackPreviewModal = ({ feedback, isOpen, onClose }: Props) => {
  if (!isOpen || !feedback) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold">Feedback Details</h3>

            <div className="mt-2 flex items-center gap-2">
              <div
                className={`badge ${
                  feedback.type === "POSITIVE" ? "badge-success" : "badge-error"
                }`}
              >
                {feedback.type}
              </div>

              <div className="badge badge-outline">{feedback.category}</div>
              <div className="badge badge-ghost">
                {feedback.viewed ? "Viewed" : "New"}
              </div>
              <div className="badge badge-ghost">
                {feedback.viewedAt
                  ? `Viewed on ${new Date(feedback.viewedAt).toLocaleDateString()}`
                  : "Not viewed yet"}
              </div>
            </div>

            <div className="mt-2 text-sm opacity-70">
              {new Date(feedback.createdAt).toLocaleString()}
              {" - "}
              Submitted by: {feedback.submittedBy.name}
            </div>
          </div>

          <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="divider" />

        {/* Markdown Content */}
        <div className="prose prose-sm max-w-none prose-invert max-h-[500px] overflow-y-auto">
          <div
            className={`border-l-4 pl-4 ${
              feedback.type === "POSITIVE" ? "border-success" : "border-error"
            }`}
          >
            <ReactMarkdown>{feedback.comment}</ReactMarkdown>
          </div>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
};

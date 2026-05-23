import type { TeamMember } from "../../types/team.types";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

interface Props {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FeedbackFormData) => Promise<void>;
  isSubmitting: boolean;
}

export interface FeedbackFormData {
  type: "POSITIVE" | "IMPROVEMENT";
  category: string;
  comment: string;
  submittedById: string;
}

export const FeedbackModal = ({
  member,
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}: Props) => {
  const [type, setType] = useState<"POSITIVE" | "IMPROVEMENT">("POSITIVE");
  const [category, setCategory] = useState("");
  const [comment, setComment] = useState("");

  if (!isOpen || !member) return null;

  const handleSubmit = async () => {
    try {
      await onSubmit({
        type,
        category,
        comment,
        submittedById: "719658b6-6f7c-4710-9fed-41d98451abd6", // Replace with actual current user ID
      });

      onClose();

      setCategory("");
      setComment("");
      setType("POSITIVE");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box w-full max-w-lg">
        <div className="flex flex-col gap-6">
          <h3 className="font-bold text-lg">Give Feedback to: {member.name}</h3>

          {/* Feedback Type */}
          <div className="form-control">
            <label className="label pb-5">
              <span className="label-text">Feedback Type</span>
            </label>

            <div className="flex gap-4">
              <label className="label cursor-pointer gap-2">
                <input
                  type="radio"
                  className="radio radio-success"
                  checked={type === "POSITIVE"}
                  onChange={() => setType("POSITIVE")}
                />
                <span className="label-text">Positive</span>
              </label>

              <label className="label cursor-pointer gap-2">
                <input
                  type="radio"
                  className="radio radio-error"
                  checked={type === "IMPROVEMENT"}
                  onChange={() => setType("IMPROVEMENT")}
                />
                <span className="label-text">Improvement</span>
              </label>
            </div>
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="label pr-5">
              <span className="label-text">Category </span>
            </label>
            <select
              className="select select-bordered"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option>Teamwork</option>
              <option>Performance</option>
              <option>Communication</option>
              <option>Attendance</option>
            </select>
          </div>

          {/* Comment */}
          <div className="form-control">
            <label className="label pr-2">
              <span className="label-text">Comments</span>
            </label>
            <div data-color-mode="dark">
              <MDEditor
                value={comment}
                onChange={(val) => setComment(val || "")}
                height={200}
              />
            </div>
          </div>
        </div>
        {/* Actions */}
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`btn ${
              type === "POSITIVE" ? "btn-success" : "btn-error"
            }`}
            onClick={handleSubmit}
            disabled={!category || !comment || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Sending...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>

      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
};

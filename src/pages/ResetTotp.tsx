import { useState } from "react";
import { useTeamMembers } from "../hooks/useTeamMembers";
import { useResetTotp } from "../hooks/useResetTotp";
import type { TeamMember } from "../types/team.types";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";

export const ResetTotp = () => {
  const { data: members, isLoading } = useTeamMembers({ limit: 100 });
  const resetMutation = useResetTotp();

  const [confirmMember, setConfirmMember] = useState<TeamMember | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleReset = async () => {
    if (!confirmMember) return;

    try {
      await resetMutation.mutateAsync(confirmMember.id);
      setToast({
        message: `${confirmMember.name}'s authenticator has been reset.`,
        type: "success",
      });
    } catch {
      setToast({
        message: "Failed to reset. Please try again.",
        type: "error",
      });
    } finally {
      setConfirmMember(null);
      setTimeout(() => setToast(null), 3000);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Reset Authenticator</h1>
        <p className="text-sm opacity-50">
          Reset a member's TOTP authenticator. They will be prompted to set up a
          new one on their next login.
        </p>
      </div>

      <div className="bg-base-300 rounded-box overflow-hidden">
        <table className="table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Role</th>
              <th>Wave</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {members?.map((member) => (
              <tr key={member.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-10 w-10">
                        <img
                          src={`https://ui-avatars.com/api/?name=${member.name}`}
                          alt={member.name}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-xs opacity-50">
                        {member.employeeCode}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-ghost badge-sm">
                    {member.role.name}
                  </span>
                </td>
                <td>Wave {member.wave}</td>
                <td>
                  <span
                    className={`badge badge-sm ${member.status === "Active" ? "badge-success" : "badge-error"}`}
                  >
                    {member.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => setConfirmMember(member)}
                    disabled={resetMutation.isPending}
                  >
                    Reset Authenticator
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {confirmMember && (
        <div className="modal modal-open">
          <div className="modal-box flex flex-col gap-4">
            <h3 className="font-bold text-lg">Confirm Reset</h3>
            <p className="text-sm opacity-70">
              Are you sure you want to reset{" "}
              <span className="font-semibold text-white">
                {confirmMember.name}
              </span>
              's authenticator? They will need to scan a new QR code on their
              next login.
            </p>
            <div className="modal-action">
              <button
                className="btn btn-sm"
                onClick={() => setConfirmMember(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-warning btn-sm"
                onClick={handleReset}
                disabled={resetMutation.isPending}
              >
                {resetMutation.isPending ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  "Yes, Reset"
                )}
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setConfirmMember(null)}
          />
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="toast toast-end">
          <div
            className={`alert shadow-lg ${toast.type === "success" ? "alert-success" : "alert-error"}`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

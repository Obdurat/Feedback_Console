import type { TeamMember } from "../../types/team.types";

interface Props {
  members: TeamMember[];
}

export const TeamTable = ({ members }: Props) => {
  return (
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
                <input type="checkbox" className="checkbox" />
              </td>

              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={"https://ui-avatars.com/api/?name=" + member.name}
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
                <button className="btn btn-primary btn-sm">
                  Give Feedback
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

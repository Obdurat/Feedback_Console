import { useState } from "react";
import { TeamTable } from "../components/team/teamTable";
import { useTeamMembers } from "../hooks/useTeamMembers";

const LIMIT = 10;

const ROLES = [
  "Customer Support Specialist",
  "Team Lead",
  "Team Manager",
  "Manager",
  "Director",
];
const STATUSES = ["Active", "Inactive"];
const WAVES = [1, 2, 3, 4, 5];

export const Teams = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [wave, setWave] = useState<number | undefined>();
  const [appliedSearch, setAppliedSearch] = useState("");

  const applySearch = () => {
    if (search !== appliedSearch) {
      setAppliedSearch(search);
      setPage(1);
    }
  };

  const { data, isLoading, isFetching } = useTeamMembers({
    page,
    limit: LIMIT,
    search: appliedSearch || undefined,
    role: role || undefined,
    status: status || undefined,
    wave,
  });

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setPage(1);
  };

  const handleWaveChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWave(e.target.value ? Number(e.target.value) : undefined);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setAppliedSearch("");
    setRole("");
    setStatus("");
    setWave(undefined);
    setPage(1);
  };

  const hasActiveFilters = search || role || status || wave;

  if (isLoading) return <progress className="progress w-56" />;

  return (
    <div className="flex flex-col gap-4">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-end gap-3 rounded-box bg-base-300 p-4">
        {/* Search */}
        <div className="form-control flex-1 min-w-48">
          <div className="flex flex-col flex-1 min-w-48 gap-1">
            <span className="text-xs opacity-70">Search</span>
            <input
              type="text"
              placeholder="Search by name..."
              className="input input-bordered input-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onBlur={applySearch}
              onKeyDown={(e) => e.key === "Enter" && applySearch()}
            />
          </div>
        </div>

        {/* Role */}
        <div className="form-control min-w-48">
          <label className="label">
            <span className="label-text text-xs">Role</span>
          </label>
          <select
            className="select select-bordered select-sm"
            value={role}
            onChange={handleRoleChange}
          >
            <option value="">All roles</option>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="form-control min-w-36">
          <label className="label">
            <span className="label-text text-xs">Status</span>
          </label>
          <select
            className="select select-bordered select-sm"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Wave */}
        <div className="form-control min-w-28">
          <label className="label">
            <span className="label-text text-xs">Wave</span>
          </label>
          <select
            className="select select-bordered select-sm"
            value={wave ?? ""}
            onChange={handleWaveChange}
          >
            <option value="">All waves</option>
            {WAVES.map((w) => (
              <option key={w} value={w}>
                Wave {w}
              </option>
            ))}
          </select>
        </div>

        {/* Clear */}
        {hasActiveFilters && (
          <button className="btn btn-ghost btn-sm" onClick={handleClearFilters}>
            Clear filters
          </button>
        )}
      </div>

      {/* Table */}
      <TeamTable members={data ?? []} />

      {/* Pagination */}
      <div className="flex items-center justify-end gap-2">
        <button
          className="btn btn-sm"
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1 || isFetching}
        >
          « Prev
        </button>

        <span className="text-sm opacity-60">Page {page}</span>

        <button
          className="btn btn-sm"
          onClick={() => setPage((p) => p + 1)}
          disabled={(data?.length ?? 0) < LIMIT || isFetching}
        >
          Next »
        </button>
      </div>
    </div>
  );
};

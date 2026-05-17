import { useMemo, useState } from "react";
import dayjs from "dayjs";
import type { ShiftDay } from "../../types/shift.types";

type Props = {
  shifts?: ShiftDay[] | null;
};

const ShiftCalendar = ({ shifts }: Props) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");

  const daysInMonth = endOfMonth.date();
  const startDay = startOfMonth.day(); // 0 (Sun) - 6 (Sat)

  const shiftMap = useMemo(() => {
    const map = new Map<string, ShiftDay["status"]>();
    shifts?.forEach((s) =>
      map.set(dayjs(s.date).format("YYYY-MM-DD"), s.status),
    );
    return map;
  }, [shifts]);

  const days = [];

  // Empty slots before first day
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} />);
  }

  // Actual days
  for (let i = 1; i <= daysInMonth; i++) {
    const date = startOfMonth.date(i);
    const formatted = date.format("YYYY-MM-DD");
    const status = shiftMap.get(formatted);

    days.push(
      <div
        key={formatted}
        className={`
          p-3 
          border 
          rounded-lg 
          flex 
          items-center 
          justify-center 
          font-semibold 
          transition
          ${
            status === "ON"
              ? "bg-success/20 text-success hover:bg-success/30"
              : status === "OFF"
                ? "bg-error/20 text-error hover:bg-error/30"
                : "hover:bg-base-300"
          }
        `}
      >
        {i}
      </div>,
    );
  }

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="btn btn-sm"
          onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
        >
          {/* Change Month Icon Left Arrow */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <circle cx="24" cy="24" r="20" />
            <polyline points="28 16 20 24 28 32" />
          </svg>
        </button>

        <h2 className="text-lg font-bold">
          {currentMonth.format("MMMM YYYY")}
        </h2>

        <button
          className="btn btn-sm"
          onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
        >
          {/* Change Month Icon Right Arrow */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <circle cx="24" cy="24" r="20" />
            <polyline points="20 16 28 24 20 32" />
          </svg>
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 text-center font-medium mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2">{days}</div>
    </div>
  );
};

export default ShiftCalendar;

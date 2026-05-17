export type ShiftStatus = "ON" | "OFF";

export interface Shift {
  date: string;
  status: ShiftStatus;
}

const mockShifts: Shift[] = [
  { date: "2026-05-01", status: "ON" },
  { date: "2026-05-02", status: "OFF" },
  { date: "2026-05-03", status: "ON" },
  { date: "2026-05-10", status: "OFF" },
  { date: "2026-05-15", status: "ON" },
  { date: "2026-05-20", status: "OFF" },
  { date: "2026-05-25", status: "ON" },
];

export const getShifts = async (): Promise<Shift[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockShifts);
    }, 5000);
  });
};

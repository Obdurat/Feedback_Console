export type ShiftStatus = "ON" | "OFF";

export interface ShiftDay {
  date: string; // ISO format: 2026-05-16
  status: string;
}

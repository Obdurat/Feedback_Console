export type UserRole = "TL" | "AGENT";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

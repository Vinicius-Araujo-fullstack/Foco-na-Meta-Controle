import { ReactNode } from "react";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  username: string;
  created_at: string;
}

export interface AdminContextType {
  admin: AdminUser | null;
  setAdmin: (admin: AdminUser | null) => void;
  refreshAdmin: () => Promise<void>;
  loading: boolean;
}

export interface AdminProviderProps {
  children: ReactNode;
}

export interface TokenPayload {
  adminId: string;
  // outros campos se necessário (como username, exp, etc.)
}

export interface IAdmin {
  children: ReactNode;
}

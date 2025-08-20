import { createContext } from "react";
import { AdminContextType } from "../../interfaces/IAdmin";

const defaultAdminContext: AdminContextType = {
  admin: null,
  setAdmin: () => {},
  refreshAdmin: async () => {},
  loading: false,
};

export const AdminContext =
  createContext<AdminContextType>(defaultAdminContext);

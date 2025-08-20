import React, { useEffect, useState } from "react";
import {
  AdminProviderProps,
  AdminUser,
  TokenPayload,
} from "../../interfaces/IAdmin.ts";
import api from "../../utils/api.ts";
import { AdminContext } from "./context.ts";
import { jwtDecode } from "jwt-decode";

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshAdmin = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token não encontrado");
      }

      const { adminId } = jwtDecode<TokenPayload>(token);

      const response = await api.get(`/admin/${adminId}`);
      console.log(response.data.response[0])
      setAdmin(response.data.response[0]);
    } catch (error) {
      console.error("Erro ao obter dados do admin:", error);
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  // Quando o provider for montado, o refreshAdmin é chamado para carregar os dados.
  useEffect(() => {
    refreshAdmin();
  }, []);

  return (
    <AdminContext.Provider value={{ admin, setAdmin, refreshAdmin, loading }}>
      {children}
    </AdminContext.Provider>
  );
};

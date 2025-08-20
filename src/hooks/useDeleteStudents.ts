import { useState } from "react";
import api from "../utils/api.ts";

export function useDeleteStudents() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteStudent = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.delete(`/students/turma/${id}`)
      if (data.message !== "Turma deletada com sucesso") {
        throw new Error("Erro ao deletar turma");
      }

      return true;
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteStudent, loading, error };
}

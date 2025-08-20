import { useEffect, useState } from "react";
import api from "../utils/api";
import Cookies from 'js-cookie';
// import { jwtDecode } from 'jwt-decode';

// type DecodedToken = {
//   userId?: number;
//   profileId?: number;
//   schoolId?: number;
//   [key: string]: any;
// };

export const useSimulatedByCode = (code: string | null | undefined) => {
  const [simulated, setSimulated] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (!code) return;

    const fetchSimulated = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("usrses");
        if (token) {
          // const decoded = jwtDecode<DecodedToken>(token);
        }

        const res = await api.get(`/all-simulateds/${code}`);
        setSimulated(res.data.response);
      } catch (err: any) {
        console.error("Erro completo:", err);
        if (err.response) {
          console.error("Status:", err.response.status);
          console.error("Dados do erro:", err.response.data);
        } else if (err.request) {
          console.error("Erro sem resposta da API:", err.request);
        } else {
          console.error("Erro genérico:", err.message);
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSimulated();
  }, [code]);

  return { simulated, setSimulated, loading, error };
};

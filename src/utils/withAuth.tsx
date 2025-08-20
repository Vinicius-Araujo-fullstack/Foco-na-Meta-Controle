/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

// Se o módulo tiver uma propriedade default, use-a; senão, use o módulo direto

interface TokenPayload {
  adminId: string;
  username: string;
  exp: number; // tempo de expiração em segundos (Unix timestamp)
}

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useNavigate();
    const [verifying, setVerifying] = useState(true);

    useEffect(() => {
      // Recupera o token do localStorage
      const token = localStorage.getItem("token");

      // Se não existir token, redireciona para a página de login
      if (!token) {
        router("/");
        return;
      }

      try {
        // Decodifica o token para verificar o tempo de expiração usando a função ajustada
        const decoded = jwtDecode<TokenPayload>(token);

        // Se o token estiver expirado, remove-o e redireciona para o login
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          router("/");
        }
      } catch (error: any) {
        console.error("Erro ao decodificar o token:", error);
        // Se ocorrer um erro ao decodificar o token, redireciona para o login
        router("/");
      } finally {
        setVerifying(false);
      }
    }, [router]);

    if (verifying) return null;

    // Enquanto a verificação não ocorre, você pode renderizar um loading ou nada
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;

import { useContext, useEffect } from "react";
import { ContainerMain } from "./style.ts";
import SideMenu from "./SideMenu/index.tsx";
import PageSelect from "./PageSelect/index.tsx";
import DIalogLogOut from "../../components/Dialogs/DIalogLogOut/index.tsx";
import withAuth from "../../utils/withAuth.tsx";
import { AdminContext } from "../../context/AdminContext/context.ts";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const { admin, loading } = useContext(AdminContext);

  useEffect(() => {
    if (!loading && !admin) {
      // Aguarda um pouco para garantir que carregou os dados
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [loading, admin]);

  if (loading) return <div>Carregando dados do admin...</div>;

  if (!admin)
    return <div>Erro ao carregar dados do admin. Faça login novamente.</div>;

  return (
    <ContainerMain>
      <SideMenu userInfo={admin} />
      <PageSelect />
      <DIalogLogOut />
      <ToastContainer />
    </ContainerMain>
  );
};
export default withAuth(Dashboard);

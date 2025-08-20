/* eslint-disable @typescript-eslint/no-explicit-any */

import DialogSetings from "../Dialogs/DialogSetings/index.tsx";
import { ITable, IDialogController, IChangePage } from "../../interfaces/index.ts";
import { Table, TableContainer, TdCustom, TextNotify } from "./style.ts";
import { useGetId } from "../../context/GetIdContext.tsx";
import { useState } from "react";
import useAllSimulated from "../../hooks/useAllSimulated.ts";
import { deleteNotify } from "../../services/notifyService.ts";
import useNotify from "../../hooks/useNotify.ts";
import { showSuccess } from "../../utils/toast.ts";

type TableNotifyProps = ITable & IDialogController & IChangePage;

function TableNotify({
  headers,
  buttonPublish,
  buttonEdit,
  buttonDelete,
  buttonRemovePost,
  notifyInfo,
  setInternalPageControl,
}: TableNotifyProps) {
  const { setGetIdCode } = useGetId();
  const [openDelet, setOpenDelet] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutateSimulateds } = useAllSimulated();
  const { mutateNotify } = useNotify({});

  const handleConfirmDelete = async (id: string) => {
    try {
      setIsLoading(true);
      if (id) {
        const res = await deleteNotify(id);
        await mutateSimulateds();
        if (res.message === "Notificação excluída com sucesso.") {
          // setIsLoading(false)
          mutateNotify();
          // setOpenDelet(false);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        // setOpenDelet(true);
        setIsLoading(false);
        showSuccess("Notificação excluida com sucesso!");
      }, 500);
    }
  };

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>

        {notifyInfo && (
          <tbody>
            {notifyInfo.length > 0 ? (
              notifyInfo.map((item: any, index) => (
                <tr key={index}>
                  <td style={{ whiteSpace: "normal", wordBreak: "break-word" }}>{item?.message}</td>
                  <td>{`Serjão`}</td>
                  <td>{`${item?.school}`}</td>
                  <td>
                    <TdCustom justify="space-between">
                    {'testando ainda'}
                      <DialogSetings
                        buttonPublish={buttonPublish}
                        buttonRemovePost={buttonRemovePost}
                        buttonEdit={buttonEdit}
                        buttonDelete={buttonDelete}
                        refInfo={item.id}
                        textModal={"Simulado"}
                        setInternalPageControl={setInternalPageControl}
                        setFunction={setGetIdCode}
                        funcConfirmDelete={() => handleConfirmDelete(item.id)}
                        setOpenDelet={setOpenDelet}
                        openDelet={openDelet}
                        isLoading={isLoading}
                      />
                    </TdCustom>
                  </td>
                </tr>
              ))
            ) : (
              <TextNotify>Contém nenhuma notificação</TextNotify>
            )}
          </tbody>
        )}
      </Table>
    </TableContainer>
  );
}

export default TableNotify;

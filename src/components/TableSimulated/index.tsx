/* eslint-disable @typescript-eslint/no-explicit-any */

import DialogSetings from "../Dialogs/DialogSetings/index.tsx";
import {
  ITable,
  IDialogController,
  IChangePage,
} from "../../interfaces/index.ts";
import { Table, TableContainer, TdCustom } from "./style.ts";
import { useGetId } from "../../context/GetIdContext.tsx";
import { useDeleteSimulado } from "../../hooks/useDeleteSimulado.ts";
import { useState } from "react";
import useAllSimulated from "../../hooks/useAllSimulated.ts";

type TableSimulatedProps = ITable & IDialogController & IChangePage;

function TableSimulated({
  headers,
  buttonEdit,
  buttonDelete,
  buttonPublish,
  simulatedInfo,
  buttonRemovePost,
  setInternalPageControl,
}: TableSimulatedProps) {
  const { setGetIdCode } = useGetId();
  const [openDelet, setOpenDelet] = useState(false);
  const { deleteSimulado } = useDeleteSimulado();
  const { mutateSimulateds } = useAllSimulated();

  const handleConfirmDelete = async (id: string) => {
    if (id) {
      const success = await deleteSimulado(id);
      await mutateSimulateds();
      if (success) {
        alert("Simulado deletado com sucesso!");
        setOpenDelet(true);
      }
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

        {simulatedInfo && (
          <tbody>
            {simulatedInfo?.length > 0 &&
              simulatedInfo.map((item: any, index) => (
                <tr key={index}>
                  <td>{item?.school}</td>
                  <td>{`${item?.turma}`}</td>
                  <td>{`${item?.name}`}</td>
                  <td>{`${item?.prof_name}`}</td>
                  <td>
                    <TdCustom justify="flex-end">
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
                      />
                    </TdCustom>
                  </td>
                </tr>
              ))}
          </tbody>
        )}
      </Table>
    </TableContainer>
  );
}

export default TableSimulated;

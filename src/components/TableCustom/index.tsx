/* eslint-disable @typescript-eslint/no-explicit-any */

// ------------- REVISADO -------------

import DialogViewClass from "../Dialogs/DialogViewClass/index.tsx";
import DialogSetings from "../Dialogs/DialogSetings/index.tsx";
import { ITable, IDialogController } from "../../interfaces/index.ts";
import { Table, TableContainer, TdCustom } from "./style.ts";
import { useState } from "react";
import { useGetId } from "../../context/GetIdContext.tsx";
import { useDeleteStudents } from "../../hooks/useDeleteStudents.ts";
import useAllTurmas from "../../hooks/useAllTurmas.ts";

type TableProps = ITable & IDialogController;

function TableCustom({
  headers,
  // fourthColumn,
  // fristColumn,
  // secondColumn,
  // thirdColumn,
  buttonPublish,
  buttonEdit,
  buttonDelete,
  buttonRemovePost,
  turmasInfo,
  setInternalPageControl,
}: TableProps) {
  const [openDelet, setOpenDelet] = useState(false);
  const { deleteStudent } = useDeleteStudents();
  const { mutateTurmas } = useAllTurmas();
  const { setGetIdCode } = useGetId();

  const handleConfirmDelete = async (id: string) => {
    if (id) {
      const success = await deleteStudent(id);
      await mutateTurmas();
      if (success) {
        setOpenDelet(false);
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

        {turmasInfo && (
          <tbody>
            {turmasInfo?.length > 0 &&
              turmasInfo.map((item: any, index) => (
                <tr key={index}>
                  <td>{item?.net_escola?.Nome}</td>
                  <td>{`${item?.net_series?.Serie} ${item?.net_tiposturma?.Tipo} - ${item?.net_turnos?.Turno}`}</td>
                  <td>
                    <TdCustom>
                      {/* <VisibilityIcon sx={{ width: 20, height: 20 }} /> */}
                      <DialogViewClass
                        turma={`${item?.net_series?.Serie} ${item?.net_tiposturma?.Tipo} - ${item?.net_turnos?.Turno}`}
                        schoolName={item?.net_escola?.Nome}
                        students={item?.students}
                      />
                      {`${item?.students?.length} ${item?.students?.length === 1 ? "Aluno" : "Alunos"}`}
                    </TdCustom>
                  </td>
                  <td>
                    <TdCustom justify="space-between">
                      {new Date(item?.students[0]?.created_at).toLocaleString(
                        "pt-BR",
                        {
                          timeZone: "America/Sao_Paulo",
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          // hour: "2-digit",
                          // minute: "2-digit",
                        }
                      )}
                      <DialogSetings
                        buttonPublish={buttonPublish}
                        buttonRemovePost={buttonRemovePost}
                        buttonEdit={buttonEdit}
                        buttonDelete={buttonDelete}
                        refInfo={item.code ? item.code : item.ID}
                        setInternalPageControl={setInternalPageControl}
                        setFunction={setGetIdCode}
                        textModal="Turma"
                        funcConfirmDelete={() =>
                          item.id !== undefined
                            ? handleConfirmDelete(item.id)
                            : handleConfirmDelete(item.ID)
                        }
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

export default TableCustom;

// ------------- REVISADO -------------

/* eslint-disable @typescript-eslint/no-explicit-any */
import DialogSetings from "../Dialogs/DialogSetings/index.tsx";
import { Table, TableContainer, TdCustom } from "./style.ts";
import { IChangePage } from "../../interfaces/IPage.ts";
import { useGetId } from "../../context/GetIdContext.tsx";
import { useState } from "react";
import { useDeleteEvaluate } from "../../hooks/useDeleteEvaluate.ts";
import useAllEvaluate, { EvaluateFilters } from "../../hooks/useAllEvaluate.ts";

interface TableEvaluateProps extends IChangePage {
  headers: string[];
  evaluateInfo: EvaluateFilters[];
  buttonPublish?: boolean;
  buttonRemovePost?: boolean;
  buttonEdit?: boolean;
  buttonDelete?: boolean;
  filters?: EvaluateFilters; // <- novo
}

function TableEvaluate({
  headers,
  evaluateInfo,
  buttonPublish,
  buttonEdit,
  buttonDelete,
  buttonRemovePost,
  setInternalPageControl,
  filters,
}: TableEvaluateProps) {
  const getSegmentBySchoolYear = (year: number) => {
    if (year >= 1 && year <= 5) return "Fundamental 1";
    if (year >= 6 && year <= 9) return "Fundamental 2";
    return "Segmento desconhecido";
  };
  const { setGetIdCode } = useGetId();

  const [openDelet, setOpenDelet] = useState(false);
  const { deleteEvaluate } = useDeleteEvaluate();

  const { mutateEvaluate } = useAllEvaluate(filters);

  const handleConfirmDelete = async (id: string) => {
    if (id) {
      const success = await deleteEvaluate(id);
      await mutateEvaluate();
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

        <tbody>
          {evaluateInfo?.length > 0 &&
            evaluateInfo.map((item: any, index: number) => (
              <tr key={index}>
                <td>{item.discipline.name || "—"}</td>
                <td>{getSegmentBySchoolYear(item.school_year)}</td>
                <td>{item.school_year + "° ano" || "—"}</td>
                <td>{item.code || "—"}</td>
                <td>
                  <TdCustom justify="flex-end">
                    <DialogSetings
                      buttonPublish={buttonPublish}
                      buttonRemovePost={buttonRemovePost}
                      buttonEdit={buttonEdit}
                      buttonDelete={buttonDelete}
                      refInfo={item.code}
                      setInternalPageControl={setInternalPageControl}
                      setFunction={setGetIdCode}
                      textModal={"Avaliação"}
                      funcConfirmDelete={() => handleConfirmDelete(item.id)}
                      setOpenDelet={setOpenDelet}
                      openDelet={openDelet}
                    />
                  </TdCustom>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}

export default TableEvaluate;

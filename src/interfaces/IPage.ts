
export interface ISelectPageActive {
    colorBorder?: string;
    colorFillSvg?: string;
    colorBackground?: string;
    colorText?: string;
    isActive?: boolean;
}





export interface IChangePage{
  InternalPageControl?: "lista" | "cadastrar" | "editar";
  setInternalPageControl?: React.Dispatch<React.SetStateAction<"lista" | "cadastrar" | "editar">>;
  turmasList?: idTurmas[];
};
interface idTurmas {
  id: number;
}





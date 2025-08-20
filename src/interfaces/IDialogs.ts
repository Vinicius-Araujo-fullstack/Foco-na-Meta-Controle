import { IChangePage } from "./IPage";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IDialogController extends IChangePage {
  open?: boolean;
  setOpen?: (value: boolean) => void;
  title?: string;
  textButton?: string;
  icon?: string;
  returnPage?: string;
  buttonPublish?: boolean;
  buttonRemovePost?: boolean;
  buttonEdit?: boolean;
  buttonDelete?: boolean;
  refInfo?: any;
  turma?: string;
  schoolName?: string;
  students?: any[];
  setFunction?: (value: any) => void;
  textModal?: string;
  funcConfirmDelete?: any;
  openDelet?: any,
  setOpenDelet?: any
  isLoading?: boolean;
}

export interface ILogOutController {
  openLogOut?: boolean;
  setOpenLogOut?: (value: boolean) => void;
}

export interface IDialogViewClass {
  openViewClass?: boolean;
  setOpenViewClass?: (value: boolean) => void;
}

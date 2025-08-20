export interface IState {
  ID: number;
  Sigla: string;
  Estado: string;
  Ativo: boolean;
  disabled?: boolean;
}

interface ISelectOption {
  label?: string;
  options?: IState[];
  placeholder?: string;
}

export interface IDrawerController {
  open: boolean;
  setOpen: (value: boolean) => void;
  selectOptions?: ISelectOption[];
}

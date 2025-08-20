/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IDiscipline {
    ID: string;
    created_at: string;
    name: string;
    sig: string;    
    disabled?: boolean;
}
export interface IEvaluate {
  id: string;
  created_at: string;
  code: string;
  school_year: number;
  simulate_num: number;
  evaluate_version: number;
  discipline_id: string;
  simulate_type_id: string;
  discipline: {
    name: string;
    sig: string;
  };
}

export interface ISegment {
    ID: string;
    name: string;
    disabled?: boolean;
}

export type ISimulated = ISegment;

export type ISerie = ISegment;

interface IState {
  ID: number;
  Sigla: string;
  Estado: string;
  Ativo: boolean;
  disabled?: boolean;
}

interface ICity {
  ID: number;
  IDEstado: number;
  Cidade: string;
  Ativo: boolean;
  disabled?: boolean;
}

interface ISchool {
  ID: number;
  Nome: number;
  Ativo: boolean;
  disabled?: boolean;
}

export interface ITurmaSchool {
  ID: number;
  net_series: { Serie: string };
  net_turnos: { Turno: string };
  net_tiposturma: { Tipo: string };
  disabled?: boolean;
}

export interface ISudents {
  ID: number;
  IDPerfil: number;
  Nome: string;
  Email: string;
  Ativo: boolean;
  DataCadastro: string;
  disabled?: boolean;
}

export interface IDropDownCustomProps {
  label?: string;
  gapLabel?: string;
  placeholder?: string;
  width?: string;
  options?: IState[] | ICity[] | ISchool[] | ITurmaSchool[] | ISudents[] | IDiscipline[] | ISerie[] |ISegment[] | ISimulated[] | undefined;
  margin?: string;
  onClick?: () => void;
  reset?: boolean;
  selectType? : number;
  defaultValue?: any;
  hasErrors?: boolean;
  onlyId?: boolean
}

export interface IMultiSelectDropdownProps {
  options: string[];
  width?: string;
  margin?: string;
  placeholder?: string;
}

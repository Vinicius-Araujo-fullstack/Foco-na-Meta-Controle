import { IState } from "./IDrawer";
import { ITurmaInfo } from "./IStudent";

export interface ICity {
    ID: number;
    IDEstado: number;
    Cidade: string;
    Ativo: boolean;
}

export interface ISchool {
    ID: number;
    Ativo: boolean;
    Nome: string;
    CEP: string;
    Endereco: string;
}

export type ITurma = ITurmaInfo;

export type IEstado = IState;
export interface Estado {
    ID: number;
    Estado: string;
    Sigla: string;
  }
  
  export interface Cidade {
    net_estados: Estado;
  }
  
  export interface Escola {
    IDCidade: number;
    net_cidades: Cidade;
  }
  
  export interface Sala {
    ID: number;
    IDEscola: number;
    PavilhaoAndar: string;
    Sala: string;
    Ativo: boolean;
  }
  
  export interface Serie {
    ID: number;
    Serie: string;
    Ativo: boolean;
  }
  
  export interface Turno {
    ID: number;
    Turno: string;
    Ativo: boolean;
  }
  
  export interface TipoEnsino {
    ID: number;
    Tipo: string;
    Ativo: boolean;
  }
  
  export interface ITurmaInfo {
    ID: number;
    Ano: number;
    net_salas: Sala;
    net_series: Serie;
    net_turnos: Turno;
    net_tipoensino: TipoEnsino;
    net_escola: Escola;
  }
  
export interface ISimulated {
  id?: string;
  created_at?: string;
  name?: string;
  school_id?: number;
  turmas_id?: number[];
  city_id?: number;
  school?: string;
  turma?: string;
  city?: string;
  prof_resp?: number;
  aplication_date?: string; 
  gabarito_date?: string;   
  analise_date?: string;    
  devolutiva_date?: string; 
  type_id?: string;
  prof_name?: string;
}
export interface ISimulatedData {
  id?: string;
  created_at?: string;
  name?: string | string[] | null;
  evaluates?: string[],
  SimulatedEvaluates?: string;
  school_id?: number;
  turmas_id?: number[] | number;
  city_id?: number;
  school?: string;
  turma?: string;
  city?: string;
  prof_resp?: number;
  aplication_date?: string;
  gabarito_date?: string;
  analise_date?: string;
  devolutiva_date?: string;
  type_id?: string;
  idState?: string;
  teacher?: { ID?: number | null, Nome?: string };
  segmento?: { ID: number, name: string }
}

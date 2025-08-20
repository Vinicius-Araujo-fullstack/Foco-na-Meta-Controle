export interface IEvaluateRequest {
  school_year: number | null;
  simulate_num: number | null;
  evaluate_version: number | null;
  discipline_id?: string | null;
  discipline_name?: string | null;
  segmento_num?: any
}

export interface IAnswers {
  block_number: number;
  [key: `q${number}`]: string;
}

export interface IEvaluateData extends IEvaluateRequest { }
